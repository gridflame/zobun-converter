/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-900">

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-gray max-w-none">
          <h1 className="text-4xl font-bold text-white mb-8">terms of service</h1>
          
          <p className="text-gray-300 mb-8">last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">acceptance of terms</h2>
            <p className="text-gray-300 mb-4">
              by accessing and using zobun, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">service description</h2>
            <p className="text-gray-300 mb-4">
              zobun is a free desktop application that allows you to convert youtube videos to various audio and video formats locally on your device.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">acceptable use</h2>
            <p className="text-gray-300 mb-4">
              you agree to use our service only for lawful purposes and in accordance with these terms. you agree not to:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>download copyrighted content without permission</li>
              <li>use the service for commercial purposes without authorization</li>
              <li>attempt to abuse the application or external video platforms with excessive automated requests</li>
              <li>use automated tools to exploit or harm the application</li>
              <li>attempt to reverse engineer, decompile, or tamper with the application</li>
              <li>share or distribute downloaded content that violates copyright laws</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">copyright and intellectual property</h2>
            <p className="text-gray-300 mb-4">
              you are responsible for ensuring that you have the right to download and use any content you convert through our service. 
              we respect intellectual property rights and expect our users to do the same.
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>only download content you own or have permission to download</li>
              <li>respect youtube's terms of service</li>
              <li>do not use our service to infringe on others' intellectual property rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">service availability</h2>
            <p className="text-gray-300 mb-4">
              while we strive to maintain continuous service availability:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>we do not guarantee 100% uptime</li>
              <li>service may be temporarily unavailable for maintenance</li>
              <li>we may modify or discontinue features with or without notice</li>
              <li>download speeds and quality may vary</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">disclaimers</h2>
            <p className="text-gray-300 mb-4">
              our service is provided "as is" without any warranties:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>we make no guarantees about the accuracy or quality of converted files</li>
              <li>we are not responsible for any data loss or corruption</li>
              <li>use our service at your own risk</li>
              <li>we are not liable for any damages resulting from service use</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">privacy</h2>
            <p className="text-gray-300 mb-4">
              your privacy is important to us. please review our privacy policy to understand how we collect, use, and protect your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">termination</h2>
            <p className="text-gray-300 mb-4">
              we reserve the right to terminate or suspend access to our service immediately, without prior notice, 
              for conduct that we believe violates these terms or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">changes to terms</h2>
            <p className="text-gray-300 mb-4">
              we reserve the right to modify these terms at any time. changes will be effective immediately upon posting. 
              your continued use of the service constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">contact information</h2>
            <p className="text-gray-300">
              if you have any questions about these terms of service, please contact us through our support channels.
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