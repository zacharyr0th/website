'use client';

import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div role="alert" className="p-4">
      <div className="max-w-lg mx-auto bg-surface p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Something went wrong</h2>
        <p className="text-text-secondary mb-4">
          We&apos;ve logged this error and will look into it.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <pre className="bg-background/50 p-4 rounded mb-4 overflow-auto max-h-48 text-sm">
            {error.message}
          </pre>
        )}
        <div className="flex justify-end">
          <button
            onClick={resetErrorBoundary}
            className="px-4 py-2 bg-accent text-white rounded hover:bg-accent/90 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ClientErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
      onError={(error) => {
        console.error('Error caught by boundary:', error);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
