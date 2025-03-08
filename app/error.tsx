'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-surface/30 flex items-center justify-center px-6 sm:px-8">
      <main className="max-w-2xl text-center">
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-text-primary mb-4">Something went wrong</h1>
          <p className="text-lg text-text-secondary mb-6" aria-live="polite">
            {error.message || 'An unexpected error occurred'}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors"
            >
              Try again
            </button>
            <button
              onClick={() => (window.location.href = '/')}
              className="px-6 py-3 bg-surface hover:bg-surface/80 text-text-primary rounded-lg transition-colors"
            >
              Go home
            </button>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
