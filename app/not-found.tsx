import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-slate-950 text-white">
      <div className="text-center max-w-lg">
        <p className="badge mb-6">404 Error</p>
        <h1 className="text-6xl font-black mb-4">Page not found</h1>
        <p className="text-slate-300 mb-8">
          The page you are looking for may have moved or no longer exists.
        </p>
        <Link href="/" className="primary-btn">
          Back to home
        </Link>
      </div>
    </main>
  );
}
