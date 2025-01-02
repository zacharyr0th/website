'use client';

import React, { memo, useCallback } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { motion, AnimatePresence } from 'framer-motion';

interface ErrorFallbackProps extends FallbackProps {
  error: Error;
}

const ErrorFallback = memo(({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const logError = useCallback(() => {
    console.error('Error caught by boundary:', error);
  }, [error]);

  React.useEffect(() => {
    logError();
  }, [logError]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        role="alert"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        className="card p-lg mx-auto my-xl border border-error max-w-[42rem]"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-error font-mono text-2xl flex-start mt-0"
        >
          <span className="mr-sm">⚠️</span>
          Oops! Something went wrong
        </motion.h2>

        <p className="text-text-secondary mb-md prose">
          Don&apos;t worry, we&apos;ve been notified and are working on it. You can:
        </p>

        <ul className="text-text-secondary mb-md prose">
          <li>Try again using the button below</li>
          <li>Refresh the page</li>
        </ul>

        {process.env.NODE_ENV === 'development' && (
          <motion.details
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-md group"
          >
            <summary className="cursor-pointer text-info transition-base p-sm rounded-sm hover:bg-surface/50">
              Technical Details
            </summary>
            <div className="mt-sm p-md bg-background rounded-sm prose">
              <p className="font-mono mb-sm">{error.message}</p>
              <pre className="whitespace-pre-wrap font-mono text-text-secondary">{error.stack}</pre>
            </div>
          </motion.details>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={resetErrorBoundary}
          className="btn btn-primary hover-lift"
          aria-label="Try again"
        >
          Try Again
        </motion.button>
      </motion.div>
    </AnimatePresence>
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
