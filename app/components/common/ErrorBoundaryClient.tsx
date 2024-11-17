'use client';

import React, { memo, useCallback } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

const ErrorFallback = memo(({ error, resetErrorBoundary }: FallbackProps) => (
  <div
    role="alert"
    style={{
      padding: 'var(--spacing-lg)',
      borderRadius: 'var(--border-radius-md)',
      backgroundColor: 'var(--color-surface)',
      boxShadow: 'var(--box-shadow)',
      maxWidth: 'min(calc(var(--max-content-width) * 0.7), 42rem)',
      margin: `${`var(--spacing-xl)`} auto`,
      border: '1px solid var(--color-error)',
      animation: 'slideIn 0.3s ease-out',
    }}
  >
    <h2
      style={{
        fontSize: 'calc(var(--font-size-base) * 1.5)',
        fontFamily: 'var(--font-family-base)',
        color: 'var(--color-error)',
        marginBottom: 'var(--spacing-md)',
        animation: 'fadeIn 0.4s ease-out',
      }}
    >
      <span style={{ marginRight: 'var(--spacing-sm)' }}>⚠️</span>
      Oops! Something went wrong
    </h2>

    <p
      style={{
        color: 'var(--color-text-secondary)',
        marginBottom: 'var(--spacing-md)',
      }}
    >
      Don&apos;t worry, we&apos;ve been notified and are working on it. You can:
    </p>

    <ul
      style={{
        listStyle: 'disc inside',
        marginBottom: 'var(--spacing-md)',
        color: 'var(--color-text-secondary)',
      }}
    >
      <li>Try again using the button below</li>
      <li>Refresh the page</li>
      <li>Contact support if the problem persists</li>
    </ul>

    {process.env.NODE_ENV === 'development' && (
      <details
        style={{
          marginBottom: 'var(--spacing-md)',
          animation: 'fadeIn 0.5s ease-out',
        }}
      >
        <summary
          style={{
            cursor: 'pointer',
            color: 'var(--color-info)',
            transition: 'all var(--transition-speed)',
            padding: 'var(--spacing-sm)',
            borderRadius: 'var(--border-radius-sm)',
          }}
        >
          Technical Details
        </summary>
        <div
          style={{
            marginTop: 'var(--spacing-sm)',
            padding: 'var(--spacing-md)',
            backgroundColor: 'var(--color-background)',
            borderRadius: 'var(--border-radius-sm)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'calc(var(--font-size-base) * 0.9)',
              marginBottom: 'var(--spacing-sm)',
            }}
          >
            {error.message}
          </p>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              fontFamily: 'var(--font-family-base)',
              fontSize: 'calc(var(--font-size-base) * 0.9)',
              color: 'var(--color-text-secondary)',
            }}
          >
            {error.stack}
          </pre>
        </div>
      </details>
    )}

    <button
      onClick={resetErrorBoundary}
      style={{
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-white)',
        padding: `var(--spacing-sm) var(--spacing-md)`,
        borderRadius: 'var(--border-radius-sm)',
        fontFamily: 'var(--font-family-base)',
        transition: `background-color var(--transition-speed)`,
        cursor: 'pointer',
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-secondary)')}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-primary)')}
    >
      Try Again
    </button>
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
