'use client';

import React, { memo, useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = memo(({ error, resetErrorBoundary }) => (
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

interface ErrorBoundaryClientProps {
  children: React.ReactNode;
}

const ErrorBoundaryClient: React.FC<ErrorBoundaryClientProps> = ({ children }) => {
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
