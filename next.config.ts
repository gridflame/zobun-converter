import type { NextConfig } from "next";

const isElectronBuild = process.env.ELECTRON_BUILD === 'true';

const nextConfig: NextConfig = {
  // External packages for server components (moved from experimental in Next.js 15+)
  serverExternalPackages: ['@distube/ytdl-core'],
  
  // Only enable static export for Electron builds
  ...(isElectronBuild && {
    output: 'export',
    trailingSlash: true,
    images: {
      unoptimized: true
    },
    distDir: '.next-electron',
  }),
  
  experimental: {
    // Enable experimental features if needed
  },
};

export default nextConfig;
