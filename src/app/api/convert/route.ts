/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import ytdl from '@distube/ytdl-core';
import ffmpegPath from 'ffmpeg-static';
import { spawn } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';

// Configure this route for larger files and longer execution time
export const maxDuration = 300; // 5 minutes
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { url, format, quality, audioBitrate, videoFormat } = await request.json();

    if (!url || !ytdl.validateURL(url)) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    // Clean the URL
    const cleanUrl = url.split('&list=')[0].split('&start_radio=')[0];

    // Get video info
    let info;
    try {
      info = await ytdl.getInfo(cleanUrl, {
        requestOptions: {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          }
        }
      });
    } catch (err: any) {
      console.error('Failed to get video info:', err);
      return NextResponse.json({ error: 'Could not fetch video information' }, { status: 500 });
    }

    const safeTitle = info.videoDetails.title.replace(/[^\w\s]/gi, '').substring(0, 50);

    if (format === 'audio') {
      return await convertAudio({ info, cleanUrl, safeTitle, requestedContainer: quality, requestedBitrate: parseInt(audioBitrate || '320') });
    }

    // video
    return await convertVideo({ info, cleanUrl, safeTitle, requestedContainer: videoFormat, requestedQuality: quality });
  } catch (error: any) {
    console.error('Conversion error:', error);
    return NextResponse.json({ error: error.message || 'Conversion failed' }, { status: 500 });
  }
}

// ---- helper functions ----

interface AudioParams {
  info: any;
  cleanUrl: string;
  safeTitle: string;
  requestedContainer: string; // mp3, wav, ...
  requestedBitrate: number;
}

function getFfmpegPath(): string | null {
  const candidates: string[] = [];
  if (typeof ffmpegPath === 'string') {
    candidates.push(ffmpegPath as string);
  }
  const nodeModulesBinWin = path.join(process.cwd(), 'node_modules', 'ffmpeg-static', 'ffmpeg.exe');
  const nodeModulesBinPosix = path.join(process.cwd(), 'node_modules', 'ffmpeg-static', 'ffmpeg');
  candidates.push(nodeModulesBinWin, nodeModulesBinPosix);
  for (const p of candidates) {
    if (p && existsSync(p)) return p;
  }
  return null; // not found
}

async function convertAudio({ info, cleanUrl, safeTitle, requestedContainer, requestedBitrate }: AudioParams): Promise<NextResponse> {
  const ffPath = getFfmpegPath();
  if (!ffPath) {
    return NextResponse.json({ error: 'ffmpeg binary not found on the server. Please install ffmpeg or include ffmpeg-static.' }, { status: 500 });
  }

  const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
  if (!audioFormats.length) {
    return NextResponse.json({ error: 'No audio streams found for this video' }, { status: 400 });
  }

  // pick highest bitrate available (opus 160k max) – we will re-encode later
  const selected = audioFormats.reduce((prev: any, curr: any) => {
    const prevBit = prev?.audioBitrate || 0;
    const currBit = curr?.audioBitrate || 0;
    return currBit > prevBit ? curr : prev;
  }, audioFormats[0]);

  const youtubeAudioStream = ytdl(cleanUrl, {
    format: selected,
    highWaterMark: 1024 * 1024 * 32,
  });

  const { args: ffArgs, mime } = buildAudioFfmpegArgs(requestedContainer, requestedBitrate);

  const ff = spawn(ffPath, ['-i', 'pipe:0', ...ffArgs, 'pipe:1'], { stdio: ['pipe', 'pipe', 'pipe'] });
  youtubeAudioStream.pipe(ff.stdin);

  const chunks: Buffer[] = [];
  return new Promise((resolve) => {
    ff.stdout!.on('data', (c: Buffer) => chunks.push(c));
    ff.on('close', (code) => {
      const buffer = Buffer.concat(chunks);
      if (code !== 0 || buffer.length === 0) {
        console.error(`ffmpeg exited with code ${code}. Buffer length: ${buffer.length}`);
        resolve(NextResponse.json({ error: 'Failed to process audio stream' }, { status: 500 }));
        return;
      }
      const filename = `${safeTitle}_${requestedBitrate}kbps.${requestedContainer}`;
      resolve(new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type': mime,
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Content-Length': buffer.length.toString(),
        },
      }));
    });
    ff.stderr!.on('data', (d: Buffer) => console.error('ffmpeg err:', d.toString()));
  });
}

interface VideoParams {
  info: any;
  cleanUrl: string;
  safeTitle: string;
  requestedContainer: string; // mp4, webm, ...
  requestedQuality: string; // e.g. 1080p
}

async function convertVideo({ info, cleanUrl, safeTitle, requestedContainer, requestedQuality }: VideoParams): Promise<NextResponse> {
  const reqHeight = parseInt(requestedQuality.replace('p', ''));

  const videoOnlyFormats = ytdl.filterFormats(info.formats, 'videoonly');
  const audioOnlyFormats = ytdl.filterFormats(info.formats, 'audioonly');

  if (!videoOnlyFormats.length || !audioOnlyFormats.length) {
    return NextResponse.json({ error: 'No suitable streams found for this video' }, { status: 400 });
  }

  // pick video format closest to requested height with same container if possible
  let selectedVideo: any = videoOnlyFormats.find((f: any) => f.height === reqHeight && f.container === requestedContainer);

  if (!selectedVideo) {
    // try closest height with container match
    const sameContainer = videoOnlyFormats.filter((f: any) => f.container === requestedContainer);
    if (sameContainer.length) {
      selectedVideo = sameContainer.reduce((prev: any, curr: any) => {
        const prevDiff = Math.abs((prev.height || 0) - reqHeight);
        const currDiff = Math.abs((curr.height || 0) - reqHeight);
        return currDiff < prevDiff ? curr : prev;
      });
    }
  }

  if (!selectedVideo) {
    // pick closest overall
    selectedVideo = videoOnlyFormats.reduce((prev: any, curr: any) => {
      const prevDiff = Math.abs((prev.height || 0) - reqHeight);
      const currDiff = Math.abs((curr.height || 0) - reqHeight);
      return currDiff < prevDiff ? curr : prev;
    });
  }

  // pick best audio bitrate
  const selectedAudio = audioOnlyFormats.reduce((prev: any, curr: any) => {
    const prevBit = prev?.audioBitrate || 0;
    const currBit = curr?.audioBitrate || 0;
    return currBit > prevBit ? curr : prev;
  }, audioOnlyFormats[0]);

  const videoStream = ytdl(cleanUrl, { format: selectedVideo, highWaterMark: 1024 * 1024 * 64 });
  const audioStream = ytdl(cleanUrl, { format: selectedAudio, highWaterMark: 1024 * 1024 * 32 });

  // ffmpeg merge – construct args (different per container to avoid incompatible codec issues)
  const ffArgs: string[] = [
    '-i', 'pipe:3', // video from fd 3
    '-i', 'pipe:4', // audio from fd 4
    '-map', '0:v:0',
    '-map', '1:a:0',
  ];

  if (requestedContainer === 'mp4') {
    // MP4 does not support Opus. Re-encode audio to AAC and use fragmented MP4 so we can stream to a pipe.
    ffArgs.push(
      '-c:v', 'copy', // copy the original video stream (usually H264) to avoid heavy re-encoding
      '-c:a', 'aac',
      '-b:a', '192k',
      '-movflags', 'frag_keyframe+empty_moov'
    );
  } else {
    // For webm/mkv we can usually just copy.
    ffArgs.push('-c:v', 'copy', '-c:a', 'copy');
  }

  ffArgs.push('-f', requestedContainer, 'pipe:1');

  const ffPath = getFfmpegPath();
  if (!ffPath) {
    return NextResponse.json({ error: 'ffmpeg binary not found on the server. Please install ffmpeg or include ffmpeg-static.' }, { status: 500 });
  }

  const ff = spawn(ffPath, ffArgs, { stdio: ['ignore', 'pipe', 'pipe', 'pipe', 'pipe'] });

  videoStream.pipe(ff.stdio[3] as any);
  audioStream.pipe(ff.stdio[4] as any);

  const chunks: Buffer[] = [];
  return new Promise((resolve) => {
    ff.stdout!.on('data', (c: Buffer) => chunks.push(c));
    ff.on('close', (code) => {
      const buffer = Buffer.concat(chunks);
      if (code !== 0 || buffer.length === 0) {
        console.error(`ffmpeg exited with code ${code}. Buffer length: ${buffer.length}`);
        resolve(NextResponse.json({ error: 'Failed to process video stream' }, { status: 500 }));
        return;
      }
      const filename = `${safeTitle}_${selectedVideo.height}p.${requestedContainer}`;
      resolve(new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type': getVideoMimeType(requestedContainer),
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Content-Length': buffer.length.toString(),
        },
      }));
    });
    ff.stderr!.on('data', (d: Buffer) => console.error('ffmpeg err:', d.toString()));
  });
}

function getAudioMimeType(format: string): string {
  switch (format) {
    case 'mp3': return 'audio/mpeg';
    case 'wav': return 'audio/wav';
    case 'ogg': return 'audio/ogg';
    case 'm4a': return 'audio/mp4';
    case 'flac': return 'audio/flac';
    default: return 'audio/mpeg';
  }
}

function getVideoMimeType(format: string): string {
  switch (format) {
    case 'mp4': return 'video/mp4';
    case 'webm': return 'video/webm';
    case 'mkv': return 'video/x-matroska';
    case 'avi': return 'video/x-msvideo';
    case 'mov': return 'video/quicktime';
    default: return 'video/mp4';
  }
}

function buildAudioFfmpegArgs(format: string, bitrate: number): { args: string[]; mime: string } {
  switch (format) {
    case 'mp3':
      return { args: ['-vn', '-codec:a', 'libmp3lame', '-b:a', `${bitrate}k`, '-f', 'mp3'], mime: 'audio/mpeg' };
    case 'wav':
      return { args: ['-vn', '-codec:a', 'pcm_s16le', '-f', 'wav'], mime: 'audio/wav' };
    case 'ogg':
      return { args: ['-vn', '-codec:a', 'libvorbis', '-b:a', `${bitrate}k`, '-f', 'ogg'], mime: 'audio/ogg' };
    case 'm4a':
      return { args: ['-vn', '-codec:a', 'aac', '-b:a', `${bitrate}k`, '-f', 'ipod'], mime: 'audio/mp4' };
    case 'flac':
      return { args: ['-vn', '-codec:a', 'flac', '-f', 'flac'], mime: 'audio/flac' };
    default:
      return { args: ['-vn', '-codec:a', 'libmp3lame', '-b:a', `${bitrate}k`, '-f', 'mp3'], mime: 'audio/mpeg' };
  }
} 