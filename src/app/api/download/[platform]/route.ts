import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Route segment config for static exports
export const dynamic = 'error';
export const dynamicParams = false;

// Generate static params for the route - only Windows now
export async function generateStaticParams() {
  return [
    { platform: 'windows' },
  ];
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ platform: string }> }
) {
  const { platform } = await params;
  
  try {
    const distPath = path.join(process.cwd(), 'dist');
    let filePath: string;
    let filename: string;
    let contentType: string;

    if (platform === 'windows') {
      // Look for .exe file in dist directory
      const winFiles = fs.readdirSync(distPath).filter(file => file.endsWith('.exe'));
      if (winFiles.length === 0) {
        return NextResponse.json({ error: 'Windows installer not found' }, { status: 404 });
      }
      filePath = path.join(distPath, winFiles[0]);
      filename = winFiles[0];
      contentType = 'application/octet-stream';
    } else {
      return NextResponse.json({ error: 'Only Windows platform is supported' }, { status: 400 });
    }

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Installer file not found' }, { status: 404 });
    }

    // Read the file
    const fileBuffer = fs.readFileSync(filePath);
    
    // Return the file with appropriate headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': fileBuffer.length.toString(),
      },
    });
    
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 