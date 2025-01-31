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
    // Log the error to an error reporting service
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-surface/30">
      <main className="container mx-auto px-6 sm:px-8 pt-16 sm:pt-36 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold mb-6 text-text-primary">Something went wrong</h1>
          <p className="text-lg text-text-secondary mb-8">
            {error.message || 'An unexpected error occurred'}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors"
            >
              Try again
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-surface hover:bg-surface/80 text-text-primary rounded-lg transition-colors"
            >
              Go home
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
} 