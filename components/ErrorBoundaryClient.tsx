'use client';

import React, { memo, useCallback } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

const ErrorFallback = memo(({ error, resetErrorBoundary }: FallbackProps) => (
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
));

ErrorFallback.displayName = 'ErrorFallback';

const ErrorBoundaryClient: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const handleReset = useCallback(() => {
    localStorage.clear();
    window.location.reload();
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryClient;
