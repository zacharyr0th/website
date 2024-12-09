'use client';

import React, { memo, useCallback } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import styles from './ErrorBoundaryClient.module.css';

interface ErrorFallbackProps extends FallbackProps {
  error: Error;
}

const ErrorFallback = memo(({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const logError = useCallback(() => {
    // You can implement your error logging logic here
    console.error('Error caught by boundary:', error);
  }, [error]);

  React.useEffect(() => {
    logError();
  }, [logError]);

  return (
    <div role="alert" className={styles.errorContainer}>
      <h2 className={styles.errorTitle}>
        <span className={styles.errorIcon}>⚠️</span>
        Oops! Something went wrong
      </h2>

      <p className={styles.description}>
        Don&apos;t worry, we&apos;ve been notified and are working on it. You can:
      </p>

      <ul className={styles.bulletList}>
        <li>Try again using the button below</li>
        <li>Refresh the page</li>
        <li>Contact support if the problem persists</li>
      </ul>

      {process.env.NODE_ENV === 'development' && (
        <details className={styles.details}>
          <summary className={styles.summary}>Technical Details</summary>
          <div className={styles.detailsContent}>
            <p className={styles.errorMessage}>{error.message}</p>
            <pre className={styles.errorStack}>{error.stack}</pre>
          </div>
        </details>
      )}

      <button onClick={resetErrorBoundary} className={styles.retryButton} aria-label="Try again">
        Try Again
      </button>
    </div>
  );
});

ErrorFallback.displayName = 'ErrorFallback';

interface ErrorBoundaryClientProps {
  children: React.ReactNode;
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

const ErrorBoundaryClient: React.FC<ErrorBoundaryClientProps> = ({ children, onError }) => {
  const handleReset = useCallback(() => {
    localStorage.clear();
    window.location.reload();
  }, []);

  const handleError = useCallback(
    (error: Error, info: React.ErrorInfo) => {
      // You can implement your error logging logic here
      console.error('Error caught by boundary:', error);
      console.error('Component stack:', info.componentStack);
      onError?.(error, info);
    },
    [onError]
  );

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset} onError={handleError}>
      {children}
    </ErrorBoundary>
  );
};

export default memo(ErrorBoundaryClient);
