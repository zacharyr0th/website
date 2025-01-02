'use client';

import React from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log the error to your error reporting service
    console.error('Page level error:', error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-surface p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Something went wrong</h2>
        <p className="text-text-secondary mb-4">
          We&apos;ve logged this error and will look into it.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <pre className="bg-background/50 p-4 rounded mb-4 overflow-auto max-h-48 text-sm">
            {error.message}
            {error.digest && (
              <div className="mt-2 text-xs opacity-75">Error ID: {error.digest}</div>
            )}
          </pre>
        )}
        <div className="flex justify-end">
          <button
            onClick={reset}
            className="px-4 py-2 bg-accent text-white rounded hover:bg-accent/90 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
