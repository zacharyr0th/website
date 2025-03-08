import Link from 'next/link';
import { cn } from '@/lib';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist or has been moved.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-surface/30">
      <main className="container mx-auto px-6 sm:px-8 pt-16 sm:pt-36 pb-24">
        <div
          className={cn(
            'max-w-2xl mx-auto text-center space-y-8 p-8 rounded-xl',
            'bg-surface/5 backdrop-blur-sm border border-surface/10'
          )}
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary">
            404 - Page Not Found
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="pt-4">
            <Link
              href="/"
              aria-label="Return to the homepage"
              className={cn(
                'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium',
                'bg-accent/10 hover:bg-accent/20 text-accent transition-colors duration-200',
                'focus:outline-none focus:ring-2 focus:ring-accent/50',
                'motion-safe:hover:scale-105 motion-safe:active:scale-95'
              )}
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
