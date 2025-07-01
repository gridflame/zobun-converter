/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <div className="relative w-24 h-24">
              <Image
                src="/zobun.png"
                alt="zobun logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            zobun
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            the fastest, most reliable youtube to mp3/mp4 converter
          </p>
          
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            download our desktop app for unlimited conversions, faster downloads, and no rate limits
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/download"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              download for free
            </Link>

            <Link
              href="https://buy.stripe.com/eVq6oHa1Q5JBcBZ8hJcwg02"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <span className="mr-2">💝</span> support zobun
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-white mb-3">lightning fast</h3>
            <p className="text-gray-300 text-sm">direct downloads without server delays or queuing</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-white mb-3">100% reliable</h3>
            <p className="text-gray-300 text-sm">avoid bot detection, rate limits, and server issues</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="text-4xl mb-4">🎵</div>
            <h3 className="text-xl font-semibold text-white mb-3">high quality</h3>
            <p className="text-gray-300 text-sm">superb audio and 4k video downloads</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="text-4xl mb-4">💻</div>
            <h3 className="text-xl font-semibold text-white mb-3">cross-platform</h3>
            <p className="text-gray-300 text-sm">works on windows, macos, and linux</p>
          </div>
        </div>

        {/* Why Desktop App Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            why choose zobun?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">no usage limits</h3>
                  <p className="text-gray-300 text-sm">download as many videos as you want, whenever you want</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">always works</h3>
                  <p className="text-gray-300 text-sm">no server downtime or maintenance interruptions</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">privacy focused</h3>
                  <p className="text-gray-300 text-sm">your downloads stay on your device, no data collection</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">better performance</h3>
                  <p className="text-gray-300 text-sm">direct connection to youtube for maximum speed</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">offline capable</h3>
                  <p className="text-gray-300 text-sm">process and convert files even without internet</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">regular updates</h3>
                  <p className="text-gray-300 text-sm">automatic updates keep the app working with youtube changes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-12 border border-gray-600">
          <h2 className="text-3xl font-bold text-white mb-4">ready to get started?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            join the many users who trust zobun for their youtube downloading needs
          </p>
          
          <Link 
            href="/download"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            download zobun now
          </Link>
          
          <p className="text-sm text-gray-400 mt-4">
            free forever • no registration required • available for windows
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-8 mb-6 text-sm">
            <Link href="/download" className="text-gray-400 hover:text-white transition-colors">download</Link>
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
