import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-surface p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Page Not Found</h2>
        <p className="text-text-secondary mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-accent text-white rounded hover:bg-accent/90 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
