import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // External packages for server components (moved from experimental in Next.js 15+)
  serverExternalPackages: ['@distube/ytdl-core'],
  
  experimental: {
    // Enable experimental features if needed
  },
};

export default nextConfig;
