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
  _req: NextRequest,
  { params }: { params: { platform: string } }
) {
  if (params.platform !== 'windows') {
    return NextResponse.json({ error: 'Unsupported' }, { status: 400 });
  }

  // 302 redirect to the latest Windows installer on GitHub
  return NextResponse.redirect(
    'https://github.com/gridflame/zobun-converter/releases/download/v1.0.0/zobun.converter.Setup.1.0.0.exe',
    302
  );
} 