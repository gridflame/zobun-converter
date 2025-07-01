import Link from 'next/link';

export default function Support() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-6">
      <h1 className="text-4xl font-bold text-white mb-6">support zobun</h1>
      <p className="text-gray-300 mb-8 max-w-xl text-center">
        thank you for considering supporting zobun! your contributions help us continue to develop and improve the application.
      </p>
      <Link
        href="/download"
        className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
      >
        back to download
      </Link>
    </div>
  );
} 