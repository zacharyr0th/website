'use client';

import { useCallback, useState } from 'react';
import { errorHandler } from './handler';
import { AppError, ErrorCategory, ErrorSeverity } from './types';
import type { ErrorContext } from './types';

interface ErrorState {
  error: Error | null;
  isError: boolean;
}

interface UseErrorHandlingOptions {
  source?: string;
  category?: ErrorCategory;
  severity?: ErrorSeverity;
  onError?: (error: Error) => void;
}

/**
 * Hook for handling errors in async operations
 */
export function useErrorHandling(options: UseErrorHandlingOptions = {}) {
  const [errorState, setErrorState] = useState<ErrorState>({
    error: null,
    isError: false,
  });

  const handleError = useCallback(
    (error: Error | AppError, context?: Partial<ErrorContext>) => {
      // Update local error state
      setErrorState({
        error,
        isError: true,
      });

      // Report to error handler
      errorHandler.handle(error, {
        source: options.source || 'unknown',
        category: options.category || ErrorCategory.UNKNOWN,
        severity: options.severity || ErrorSeverity.ERROR,
        ...context,
      });

      // Call custom error handler if provided
      options.onError?.(error);
    },
    [options]
  );

  const clearError = useCallback(() => {
    setErrorState({
      error: null,
      isError: false,
    });
  }, []);

  return {
    ...errorState,
    handleError,
    clearError,
  };
}

/**
 * Hook for wrapping async functions with error handling
 */
export function useAsyncErrorHandler<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  options: UseErrorHandlingOptions = {}
) {
  const { handleError } = useErrorHandling(options);

  const wrappedFn = useCallback(
    async (...args: Parameters<T>) => {
      try {
        return await fn(...args);
      } catch (error) {
        handleError(error instanceof Error ? error : new Error(String(error)));
        throw error;
      }
    },
    [fn, handleError]
  );

  return wrappedFn;
}

/**
 * Hook for handling API errors
 */
export function useApiErrorHandler(options: UseErrorHandlingOptions = {}) {
  return useErrorHandling({
    ...options,
    category: ErrorCategory.API,
    source: options.source || 'api',
  });
}

/**
 * Hook for handling form validation errors
 */
export function useValidationErrorHandler(options: UseErrorHandlingOptions = {}) {
  return useErrorHandling({
    ...options,
    category: ErrorCategory.VALIDATION,
    severity: ErrorSeverity.WARNING,
    source: options.source || 'form-validation',
  });
}
