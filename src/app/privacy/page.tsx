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
              when you use zobun, we may collect the following information:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>youtube urls that you submit for conversion</li>
              <li>ip address and browser information for security and analytics</li>
              <li>usage patterns to improve our service</li>
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
              <li>we do not store converted files permanently on our servers</li>
              <li>files are automatically deleted after processing</li>
              <li>we use secure connections (https) for all communications</li>
              <li>we do not sell or share your personal information with third parties</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">cookies and tracking</h2>
            <p className="text-gray-300 mb-4">
              we use minimal cookies and tracking:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>essential cookies for site functionality</li>
              <li>anonymous analytics to understand usage patterns</li>
              <li>no third-party advertising cookies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">third-party services</h2>
            <p className="text-gray-300 mb-4">
              our service interacts with:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>youtube (for fetching video information)</li>
              <li>content delivery networks for improved performance</li>
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