/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import ytdl from '@distube/ytdl-core';

export const maxDuration = 60; // allow up to 1 minute for YouTube fetch on Vercel
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || !ytdl.validateURL(url)) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    // Clean the URL to remove playlist and other parameters that might cause issues
    const cleanUrl = url.split('&list=')[0].split('&start_radio=')[0];

    // Get video info with retry logic
    let info;
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        info = await ytdl.getInfo(cleanUrl, {
          requestOptions: {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
          }
        });
        break;
      } catch (err: any) {
        retryCount++;
        console.log(`Attempt ${retryCount} failed:`, err.message);
        
        if (retryCount === maxRetries) {
          throw err;
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
      }
    }

    if (!info) {
      return NextResponse.json({ error: 'Could not fetch video information after multiple attempts' }, { status: 500 });
    }

    const videoDetails = info.videoDetails;
    
    // Get available formats
    const formats = info.formats;
    const audioFormats = formats.filter(f => f.hasAudio && !f.hasVideo);
    // Only show qualities available as combined video+audio formats
    const combinedFormats = formats.filter(f => f.hasVideo && f.hasAudio);

    // Get available qualities from combined formats only (to ensure audio is included)
    const availableQualities = [...new Set(combinedFormats
      .map(f => f.qualityLabel)
      .filter(q => q)
      .sort((a, b) => {
        const getHeight = (quality: string) => parseInt(quality.replace('p', ''));
        return getHeight(b) - getHeight(a);
      })
    )];

    return NextResponse.json({
      title: videoDetails.title,
      duration: videoDetails.lengthSeconds,
      thumbnail: videoDetails.thumbnails[0]?.url,
      author: videoDetails.author.name,
      availableQualities,
      hasAudio: audioFormats.length > 0,
      hasVideo: combinedFormats.length > 0,
      hasCombinedFormats: combinedFormats.length > 0,
    });

  } catch (error: any) {
    console.error('Info fetch error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to fetch video info';
    
    if (error.message.includes('Video unavailable')) {
      errorMessage = 'This video is not available or private';
    } else if (error.message.includes('age-restricted')) {
      errorMessage = 'This video is age-restricted and cannot be processed';
    } else if (error.message.includes('private')) {
      errorMessage = 'This video is private and cannot be accessed';
    } else if (error.message.includes('region')) {
      errorMessage = 'This video is not available in your region';
    } else if (error.message.includes('extract')) {
      errorMessage = 'YouTube has updated their systems. Please try again in a few minutes.';
    }
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 