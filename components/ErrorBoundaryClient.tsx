'use client';

import React, { memo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = memo(
  ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
    <div role="alert" className="error-boundary">
      <h2>Something&apos;s gone wrong!</h2>
      <p>We apologize for the inconvenience. Here&apos;s what happened:</p>
      <pre className="error-message">{error.message}</pre>
      {process.env.NODE_ENV === 'development' && (
        <details>
          <summary>Error Details</summary>
          <pre className="error-stack">{error.stack}</pre>
        </details>
      )}
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
);

ErrorFallback.displayName = 'ErrorFallback';

export default function ErrorBoundaryClient({ children }: { children: React.ReactNode }) {
  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
      {children}
    </ErrorBoundary>
  );
}
