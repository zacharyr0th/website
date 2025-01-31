import { useState, useCallback } from 'react';

interface ErrorState {
  message: string;
  code?: string;
  details?: unknown;
}

export function useErrorHandler() {
  const [error, setError] = useState<ErrorState | null>(null);

  const handleError = useCallback((err: unknown) => {
    console.error('Error caught by useErrorHandler:', err);

    if (err instanceof Error) {
      setError({
        message: err.message,
        code: (err as any).code,
        details: err,
      });
    } else if (typeof err === 'string') {
      setError({
        message: err,
      });
    } else {
      setError({
        message: 'An unexpected error occurred',
        details: err,
      });
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError,
    isError: error !== null,
  };
}

export type ErrorHandler = ReturnType<typeof useErrorHandler>; 