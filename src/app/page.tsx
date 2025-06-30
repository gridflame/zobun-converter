/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';

export default function Home() {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("audio");
  const [quality, setQuality] = useState("mp3");
  const [audioBitrate, setAudioBitrate] = useState("320");
  const [videoQuality, setVideoQuality] = useState("1080p");
  const [videoFormat, setVideoFormat] = useState("mp4");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInfo, setIsLoadingInfo] = useState(false);
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [downloadProgress, setDownloadProgress] = useState(0);

  const audioFormats = ["mp3", "m4a", "wav", "ogg", "flac"];
  const audioBitrates = ["128", "192", "256", "320"];
  const videoQualities = ["2160p", "1440p", "1080p", "720p", "480p", "360p", "240p", "144p"];
  const videoFormats = ["mp4", "webm", "mkv", "avi", "mov"];

  const fetchVideoInfo = async (videoUrl: string) => {
    if (!videoUrl) return;
    
    setIsLoadingInfo(true);
    setError("");
    setSuccess("");
    setVideoInfo(null);
    
    try {
      const response = await fetch("/api/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: videoUrl }),
      });

      if (response.ok) {
        const info = await response.json();
        setVideoInfo(info);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to fetch video info");
      }
    } catch (error) {
      setError("Failed to fetch video info");
    } finally {
      setIsLoadingInfo(false);
    }
  };

  // Auto-fetch video info when URL changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (url && (url.includes("youtube.com/watch") || url.includes("youtu.be/"))) {
        fetchVideoInfo(url);
      } else {
        setVideoInfo(null);
        setError("");
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [url]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleDownload = async () => {
    if (!url) return;
    setDownloadProgress(0);
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          format,
          quality: format === "audio" ? quality : videoQuality,
          audioBitrate: format === "audio" ? audioBitrate : undefined,
          videoFormat: format === "video" ? videoFormat : undefined,
        }),
      });

      if (response.ok) {
        const contentLengthStr = response.headers.get("Content-Length");
        const totalBytes = contentLengthStr ? parseInt(contentLengthStr, 10) : null;
        if (response.body && totalBytes) {
          const reader = response.body.getReader();
          const chunks: Uint8Array[] = [];
          let received = 0;
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            if (value) {
              chunks.push(value);
              received += value.length;
              setDownloadProgress(Math.round((received / totalBytes) * 100));
            }
          }
          const blob = new Blob(chunks);
          const downloadUrl = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = downloadUrl;
          a.download = `${videoInfo?.title || 'download'}.${format === "audio" ? quality : videoFormat}`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(downloadUrl);
          document.body.removeChild(a);
          setDownloadProgress(100);
          setSuccess("Download completed successfully!");
          setTimeout(() => setSuccess(""), 3000);
        } else {
          // fallback to blob method
          const blob = await response.blob();
          const downloadUrl = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = downloadUrl;
          a.download = `${videoInfo?.title || 'download'}.${format === "audio" ? quality : videoFormat}`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(downloadUrl);
          document.body.removeChild(a);
          setDownloadProgress(100);
          setSuccess("Download completed successfully!");
          setTimeout(() => setSuccess(""), 3000);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Conversion failed");
      }
    } catch (error) {
      setError("Download failed. Please try again.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setDownloadProgress(0), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">


      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Logo and Title Section */}
        <div className="text-center mb-16">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/zobun.png" 
              alt="zobun" 
              className="mx-auto w-48 h-48 object-contain"
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            zobun
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            convert youtube videos to mp3, mp4, and other formats. 
            simple, fast, and free.
          </p>
          
          {/* Donation Button */}
          <div className="mt-8">
            <button 
              onClick={() => window.open('https://buy.stripe.com/eVq6oHa1Q5JBcBZ8hJcwg02', '_blank')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <span>💝</span>
              <span>support zobun</span>
            </button>
          </div>
        </div>

        {/* Converter Interface */}
        <div className="max-w-2xl mx-auto">
          {/* URL Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-white mb-3">
              youtube url
            </label>
            <input
              type="text"
              value={url}
              onChange={handleUrlChange}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-400 transition-all bg-gray-800"
            />
            {isLoadingInfo && (
              <div className="flex items-center gap-2 mt-3 text-gray-400 text-sm">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>fetching video info...</span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {isLoading && (
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2.5 rounded-full transition-all" style={{ width: `${downloadProgress}%` }}></div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Success Display */}
          {success && (
            <div className="mb-6 p-4 bg-green-900/20 border border-green-800 rounded-lg text-green-300 text-sm">
              {success}
            </div>
          )}

          {/* Video Preview */}
          {videoInfo && (
            <div className="mb-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex gap-4">
                {videoInfo.thumbnail && (
                  <img 
                    src={videoInfo.thumbnail} 
                    alt="Video thumbnail" 
                    className="w-24 h-18 object-cover rounded-md flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white mb-1 truncate">{videoInfo.title}</h3>
                  <p className="text-sm text-gray-300 mb-1">by {videoInfo.author}</p>
                  <p className="text-sm text-gray-400">
                    {Math.floor(videoInfo.duration / 60)}:{(videoInfo.duration % 60).toString().padStart(2, '0')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Format Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-white mb-3">
              format
            </label>
            
            {/* Format Type Toggle */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setFormat("audio")}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all text-sm ${
                  format === "audio"
                    ? "bg-white text-black"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                🎵 audio
              </button>
              <button
                onClick={() => setFormat("video")}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all text-sm ${
                  format === "video"
                    ? "bg-white text-black"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                🎬 video
              </button>
            </div>

            {/* Format Options */}
            {format === "audio" ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    audio format
                  </label>
                  <select
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white bg-gray-800"
                  >
                    {audioFormats.map((fmt) => (
                      <option key={fmt} value={fmt}>
                        {fmt.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    quality (kbps)
                  </label>
                  <select
                    value={audioBitrate}
                    onChange={(e) => setAudioBitrate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white bg-gray-800"
                  >
                    {audioBitrates.map((bitrate) => (
                      <option key={bitrate} value={bitrate}>
                        {bitrate} kbps
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    video format
                  </label>
                  <select
                    value={videoFormat}
                    onChange={(e) => setVideoFormat(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white bg-gray-800"
                  >
                    {videoFormats.map((fmt) => (
                      <option key={fmt} value={fmt}>
                        {fmt.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    quality
                  </label>
                  <select
                    value={videoQuality}
                    onChange={(e) => setVideoQuality(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white bg-gray-800"
                  >
                    {videoQualities.map((qual) => (
                      <option key={qual} value={qual}>
                        {qual}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={!url || isLoading || !!error || isLoadingInfo}
            className="w-full py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                converting...
              </div>
            ) : (
              `download ${format === "audio" ? `${quality} ${audioBitrate}kbps` : `${videoQuality} ${videoFormat}`}`
            )}
          </button>
        </div>
      </main>

      {/* Features Section */}
      <section className="border-t border-gray-700 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-3">features</h2>
            <p className="text-gray-300">simple and reliable youtube conversion</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">multiple formats</h3>
              <p className="text-sm text-gray-300">mp3, wav, mp4, webm, and more</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">high quality</h3>
              <p className="text-sm text-gray-300">up to 4k video and lossless audio</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">fast & secure</h3>
              <p className="text-sm text-gray-300">no registration required</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-6 mb-4 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">privacy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">terms</Link>
            <Link href="/ethics" className="text-gray-400 hover:text-white transition-colors">ethics</Link>
          </div>
          <p className="text-sm text-gray-400 mb-2">
            &copy; 2025 zobun. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            for personal use only. please respect copyright laws.
          </p>
        </div>
      </footer>
    </div>
  );
}
