/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';

export default function Ethics() {
  return (
    <div className="min-h-screen bg-gray-900">

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-gray max-w-none">
          <h1 className="text-4xl font-bold text-white mb-8">ethics & responsible use</h1>
          
          <p className="text-gray-300 mb-8">our commitment to ethical practices and responsible content handling</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">our mission</h2>
            <p className="text-gray-300 mb-4">
              zobun exists to provide a simple, free tool for personal content conversion while respecting 
              creators' rights and promoting responsible digital practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">ethical principles</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">🎯 respect for creators</h3>
              <p className="text-gray-300 mb-2">
                we believe content creators deserve recognition and compensation for their work:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-1">
                <li>always respect copyright and intellectual property rights</li>
                <li>support creators through official channels when possible</li>
                <li>use downloads for personal, educational, or fair use purposes only</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">🔒 privacy & security</h3>
              <p className="text-gray-300 mb-2">
                your privacy and security are fundamental:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-1">
                <li>we don't store your converted files permanently</li>
                <li>we use minimal data collection practices</li>
                <li>we don't track or profile individual users</li>
                <li>we employ secure connections and data handling</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">🌱 sustainability</h3>
              <p className="text-gray-300 mb-2">
                we strive for environmental responsibility:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-1">
                <li>efficient server usage to minimize energy consumption</li>
                <li>automatic file cleanup to reduce storage waste</li>
                <li>optimized conversion processes</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">responsible use guidelines</h2>
            
            <div className="bg-green-900/20 border border-green-700 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-green-300 mb-3">✅ encouraged uses</h3>
              <ul className="list-disc pl-6 text-green-200 space-y-1">
                <li>personal enjoyment and offline viewing</li>
                <li>educational research and study materials</li>
                <li>accessibility needs (e.g., audio-only for visual impairments)</li>
                <li>creating backups of your own content</li>
                <li>fair use commentary, criticism, or analysis</li>
              </ul>
            </div>

            <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-red-300 mb-3">❌ discouraged uses</h3>
              <ul className="list-disc pl-6 text-red-200 space-y-1">
                <li>commercial redistribution without permission</li>
                <li>downloading copyrighted music to avoid purchasing</li>
                <li>mass downloading for content libraries</li>
                <li>removing creator attribution or watermarks</li>
                <li>using content in ways that harm creators' income</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">supporting content creators</h2>
            <p className="text-gray-300 mb-4">
              we encourage users to support creators through official channels:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li><strong>subscribe</strong> to channels you enjoy</li>
              <li><strong>like and share</strong> videos to increase their reach</li>
              <li><strong>purchase official content</strong> when available</li>
              <li><strong>support through</strong> patreon, channel memberships, or merchandise</li>
              <li><strong>watch ads</strong> on the original platform when possible</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">copyright education</h2>
            <p className="text-gray-300 mb-4">
              understanding copyright helps protect creators and users:
            </p>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white mb-2">what is fair use?</h3>
              <p className="text-gray-300 mb-2">
                fair use allows limited use of copyrighted material for purposes such as:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-1">
                <li>criticism and commentary</li>
                <li>educational purposes</li>
                <li>news reporting</li>
                <li>research and scholarship</li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white mb-2">when in doubt</h3>
              <p className="text-gray-300">
                if you're unsure about whether your use is appropriate, consider contacting the creator 
                directly or seeking legal advice. when possible, choose official download options provided by creators.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">reporting concerns</h2>
            <p className="text-gray-300 mb-4">
              if you notice misuse of our service or have ethical concerns, we encourage you to reach out. 
              we take all reports seriously and work to maintain a responsible platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">our commitment</h2>
            <p className="text-gray-300 mb-4">
              we continuously evaluate and improve our ethical practices. this includes:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>regular review of our policies and practices</li>
              <li>listening to feedback from users and creators</li>
              <li>staying informed about copyright and digital rights developments</li>
              <li>collaborating with the creator community when possible</li>
            </ul>
          </section>
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