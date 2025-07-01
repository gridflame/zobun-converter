import Link from 'next/link';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-900">

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-gray max-w-none">
          <h1 className="text-4xl font-bold text-white mb-8">privacy policy</h1>
          
          <p className="text-gray-300 mb-8">last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">information we collect</h2>
            <p className="text-gray-300 mb-4">
              when you use the zobun desktop application, the following information is handled locally on your device:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>youtube urls that you enter for conversion (processed entirely on your device)</li>
              <li>optional, anonymous crash reports you choose to send</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">how we use your information</h2>
            <p className="text-gray-300 mb-4">
              we use the collected information to:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>process your video conversion requests</li>
              <li>improve our service and user experience</li>
              <li>prevent abuse and ensure service security</li>
              <li>analyze usage patterns anonymously</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">data storage and security</h2>
            <p className="text-gray-300 mb-4">
              we take data security seriously:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>all conversions are performed locally on your device</li>
              <li>we do not upload your videos or files to any remote server</li>
              <li>you control where converted files are saved and can delete them at any time</li>
              <li>we do not sell or share any personal information with third parties</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">cookies and tracking</h2>
            <p className="text-gray-300 mb-4">
              this desktop application does not use cookies or similar tracking technologies.
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>no cookies are stored or read</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">third-party services</h2>
            <p className="text-gray-300 mb-4">
              our service interacts with:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>youtube (to fetch video data and streams)</li>
              <li>open-source libraries such as ffmpeg for media processing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">your rights</h2>
            <p className="text-gray-300 mb-4">
              you have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>request information about data we collect</li>
              <li>request deletion of your data</li>
              <li>opt out of analytics tracking</li>
              <li>contact us with privacy concerns</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">contact us</h2>
            <p className="text-gray-300">
              if you have any questions about this privacy policy, please contact us through our support channels.
            </p>
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