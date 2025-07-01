const ytdl = require('@distube/ytdl-core');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { app, dialog } = require('electron');

// Try to require ffmpeg-static. If not present (production build), we'll fall back to the copy in extraResources.
let ffmpegPathDev = null;
try {
  // eslint-disable-next-line global-require
  ffmpegPathDev = require('ffmpeg-static');
} catch (_) {
  // Module not present in packaged build – this is expected.
}

// Function to get the correct ffmpeg path
function getFfmpegPath() {
  if (app.isPackaged) {
    // In production, ffmpeg is in extraResources
    const resourcesPath = path.join(process.resourcesPath, 'ffmpeg-static');
    const platform = process.platform;
    let ffmpegName;
    
    if (platform === 'win32') {
      ffmpegName = 'ffmpeg.exe';
    } else if (platform === 'darwin') {
      ffmpegName = 'ffmpeg';
    } else {
      ffmpegName = 'ffmpeg';
    }
    
    return path.join(resourcesPath, ffmpegName);
  } else {
    // In development, use ffmpeg-static package
    return ffmpegPathDev;
  }
}

async function handleDownload(mainWindow, options) {
  const { url, format, quality, audioBitrate, videoFormat, title } = options;
  
  try {
    // Clean the URL
    const cleanUrl = url.split('&list=')[0].split('&start_radio=')[0];
    
    // Get video info
    const info = await ytdl.getInfo(cleanUrl, {
      requestOptions: {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      }
    });
    
    const safeTitle = title.replace(/[^\w\s]/gi, '').substring(0, 50);
    
    // Show save dialog
    const extension = format === 'audio' ? quality : videoFormat;
    const filename = `${safeTitle}.${extension}`;
    
    const { filePath } = await dialog.showSaveDialog(mainWindow, {
      defaultPath: path.join(app.getPath('downloads'), filename),
      filters: [
        { name: 'All Files', extensions: ['*'] }
      ]
    });
    
    if (!filePath) {
      mainWindow.webContents.send('download-complete', false, 'Download cancelled');
      return { success: false, error: 'Download cancelled' };
    }
    
    if (format === 'audio') {
      await convertAudio(mainWindow, { info, cleanUrl, filePath, requestedContainer: quality, requestedBitrate: parseInt(audioBitrate || '320') });
    } else {
      await convertVideo(mainWindow, { info, cleanUrl, filePath, requestedContainer: videoFormat, requestedQuality: quality });
    }
    
    return { success: true };
    
  } catch (error) {
    console.error('Download error:', error);
    mainWindow.webContents.send('download-complete', false, error.message);
    return { success: false, error: error.message };
  }
}

async function convertAudio(mainWindow, { info, cleanUrl, filePath, requestedContainer, requestedBitrate }) {
  const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
  if (!audioFormats.length) {
    mainWindow.webContents.send('download-complete', false);
    return;
  }
  
  const selected = audioFormats.reduce((prev, curr) => {
    const prevBit = prev?.audioBitrate || 0;
    const currBit = curr?.audioBitrate || 0;
    return currBit > prevBit ? curr : prev;
  }, audioFormats[0]);
  
  const youtubeAudioStream = ytdl(cleanUrl, {
    format: selected,
    highWaterMark: 1024 * 1024 * 32,
  });
  
  const ffArgs = buildAudioFfmpegArgs(requestedContainer, requestedBitrate);
  const currentFfmpegPath = getFfmpegPath();
  const ff = spawn(currentFfmpegPath, ['-i', 'pipe:0', ...ffArgs, filePath], { stdio: ['pipe', 'pipe', 'pipe'] });
  
  youtubeAudioStream.pipe(ff.stdin);
  
  ff.on('close', (code) => {
    if (code === 0 && fs.existsSync(filePath)) {
      mainWindow.webContents.send('download-complete', true, 'Audio download completed successfully!');
    } else {
      mainWindow.webContents.send('download-complete', false, 'Audio conversion failed');
    }
  });
  
  ff.stderr.on('data', (d) => console.error('ffmpeg err:', d.toString()));
}

async function convertVideo(mainWindow, { info, cleanUrl, filePath, requestedContainer, requestedQuality }) {
  const reqHeight = parseInt(requestedQuality.replace('p', ''));
  
  const videoOnlyFormats = ytdl.filterFormats(info.formats, 'videoonly');
  const audioOnlyFormats = ytdl.filterFormats(info.formats, 'audioonly');
  
  if (!videoOnlyFormats.length || !audioOnlyFormats.length) {
    mainWindow.webContents.send('download-complete', false);
    return;
  }
  
  // Find best matching video format
  let selectedVideo = videoOnlyFormats.find(f => f.height === reqHeight && f.container === requestedContainer);
  
  if (!selectedVideo) {
    const sameContainer = videoOnlyFormats.filter(f => f.container === requestedContainer);
    if (sameContainer.length) {
      selectedVideo = sameContainer.reduce((prev, curr) => {
        const prevDiff = Math.abs((prev.height || 0) - reqHeight);
        const currDiff = Math.abs((curr.height || 0) - reqHeight);
        return currDiff < prevDiff ? curr : prev;
      });
    }
  }
  
  if (!selectedVideo) {
    selectedVideo = videoOnlyFormats.reduce((prev, curr) => {
      const prevDiff = Math.abs((prev.height || 0) - reqHeight);
      const currDiff = Math.abs((curr.height || 0) - reqHeight);
      return currDiff < prevDiff ? curr : prev;
    });
  }
  
  const selectedAudio = audioOnlyFormats.reduce((prev, curr) => {
    const prevBit = prev?.audioBitrate || 0;
    const currBit = curr?.audioBitrate || 0;
    return currBit > prevBit ? curr : prev;
  }, audioOnlyFormats[0]);
  
  const videoStream = ytdl(cleanUrl, { format: selectedVideo, highWaterMark: 1024 * 1024 * 64 });
  const audioStream = ytdl(cleanUrl, { format: selectedAudio, highWaterMark: 1024 * 1024 * 32 });
  
  const ffArgs = [
    '-i', 'pipe:3', // video
    '-i', 'pipe:4', // audio
    '-map', '0:v:0',
    '-map', '1:a:0',
  ];
  
  const selectedContainer = selectedVideo.container;
  const containerMismatch = selectedContainer !== requestedContainer;
  const codecString = selectedVideo.codecs || selectedVideo.codec || selectedVideo.mimeType || '';
  const codecIncompatible = requestedContainer === 'mp4' && !/avc1|h264/i.test(codecString);
  
  if (requestedContainer === 'mp4') {
    if (containerMismatch || codecIncompatible) {
      // re-encode video to H.264 for MP4 compatibility
      ffArgs.push('-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23', '-c:a', 'aac', '-b:a', '192k');
    } else {
      ffArgs.push('-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', 'frag_keyframe+empty_moov');
    }
  } else if (requestedContainer === 'avi') {
    // Re-encode to MPEG-4 Part 2 (Xvid-style) + MP3 for wide AVI support
    ffArgs.push('-c:v', 'mpeg4', '-qscale:v', '3', '-c:a', 'mp3', '-b:a', '192k');
  } else {
    // Other containers: try stream copy
    ffArgs.push('-c:v', 'copy', '-c:a', 'copy');
  }
  
  ffArgs.push('-f', requestedContainer, filePath);
  
  const currentFfmpegPath = getFfmpegPath();
  const ff = spawn(currentFfmpegPath, ffArgs, { stdio: ['ignore', 'pipe', 'pipe', 'pipe', 'pipe'] });
  
  videoStream.pipe(ff.stdio[3]);
  audioStream.pipe(ff.stdio[4]);
  
  ff.on('close', (code) => {
    if (code === 0 && fs.existsSync(filePath)) {
      mainWindow.webContents.send('download-complete', true, 'Video download completed successfully!');
    } else {
      mainWindow.webContents.send('download-complete', false, 'Video conversion failed');
    }
  });
  
  ff.stderr.on('data', (d) => console.error('ffmpeg err:', d.toString()));
}

function buildAudioFfmpegArgs(format, bitrate) {
  switch (format) {
    case 'mp3':
      return ['-vn', '-codec:a', 'libmp3lame', '-b:a', `${bitrate}k`, '-f', 'mp3'];
    case 'wav':
      return ['-vn', '-codec:a', 'pcm_s16le', '-f', 'wav'];
    case 'ogg':
      return ['-vn', '-codec:a', 'libvorbis', '-b:a', `${bitrate}k`, '-f', 'ogg'];
    case 'm4a':
      return ['-vn', '-codec:a', 'aac', '-b:a', `${bitrate}k`, '-f', 'ipod'];
    case 'flac':
      return ['-vn', '-codec:a', 'flac', '-f', 'flac'];
    default:
      return ['-vn', '-codec:a', 'libmp3lame', '-b:a', `${bitrate}k`, '-f', 'mp3'];
  }
}

module.exports = { handleDownload }; 