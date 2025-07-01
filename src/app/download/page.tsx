/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Download() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (platform: string) => {
    setDownloading(platform);

    // Navigate to the API route – the browser will follow the 302
    // and handle the cross-origin file download automatically.
    window.location.href = `/api/download/${platform}`;

    // Reset state after a short delay so the button returns to normal UI.
    setTimeout(() => setDownloading(null), 3_000);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            download zobun
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            get our app for better reliability, faster downloads, and higher rate limits compared to browser converters
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-white mb-2">faster downloads</h3>
            <p className="text-gray-300 text-sm">direct connection to youtube without server delays</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-white mb-2">more reliable</h3>
            <p className="text-gray-300 text-sm">avoid bot detection and rate limiting issues</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700">
            <div className="text-3xl mb-4">💻</div>
            <h3 className="text-xl font-semibold text-white mb-2">offline capable</h3>
            <p className="text-gray-300 text-sm">works without internet connection for processing</p>
          </div>
        </div>

        {/* Download Link - Windows Only */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">download for windows</h2>
          
          <div className="space-y-4">
            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">🪟</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">windows installer</h3>
                    <p className="text-sm text-gray-400">windows 10, 11 (64-bit)</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDownload('windows')}
                  disabled={downloading === 'windows'}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {downloading === 'windows' ? 'downloading...' : 'download .exe'}
                </button>
              </div>
            </div>
          </div>

          {/* Installation Instructions */}
          <div className="mt-12 p-6 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">installation</h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <p>1. run the downloaded installer (.exe file)</p>
              <p>2. follow the setup wizard to complete installation</p>
              <p>3. if windows defender shows a warning, click "more info" and "run anyway"</p>
              <p>4. zobun will be available in your start menu after installation</p>
            </div>
          </div>

          {/* System Requirements */}
          <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">system requirements</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>• windows 10 or windows 11 (64-bit)</p>
              <p>• 2gb ram minimum</p>
              <p>• 2gb free disk space</p>
              <p>• internet connection for youtube access</p>
              <p>• ffmpeg included (no separate installation needed)</p>
            </div>
          </div>

          {/* Version Info */}
          <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">latest version: v1.0.0</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>• initial release with full youtube download support</p>
              <p>• supports all popular audio and video formats</p>
              <p>• includes ffmpeg for reliable conversion</p>
              <p>• automatic updates enabled</p>
            </div>
          </div>

          {/* Note about other platforms */}
          <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700 border-yellow-600/50">
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">other platforms</h3>
            <p className="text-gray-300 text-sm">
              currently, zobun is only available for windows. mac and linux versions may be available in future releases.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-6 mb-4 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">home</Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">privacy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">terms</Link>
            <Link href="/ethics" className="text-gray-400 hover:text-white transition-colors">ethics</Link>
          </div>
          <p className="text-sm text-gray-400">
            &copy; 2025 zobun. all rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 