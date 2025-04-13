'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { errorHandler } from './handler';
import { ErrorCategory, ErrorSeverity } from './types';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  source?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

const defaultFallback = (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
  >
    <h2 className="text-2xl font-bold mb-4 text-text-primary">Something went wrong</h2>
    <p className="text-text-secondary mb-6">
      We encountered an unexpected error. Please try again.
    </p>
    <button
      onClick={() => window.location.reload()}
      className="px-6 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors"
    >
      Reload page
    </button>
  </motion.div>
);

/**
 * Enhanced error boundary component that integrates with our error handling system
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Report error to our error handling system
    errorHandler.handle(error, {
      source: this.props.source || 'react-error-boundary',
      category: ErrorCategory.BOUNDARY,
      severity: ErrorSeverity.ERROR,
      metadata: {
        componentStack: errorInfo.componentStack,
      },
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return this.props.fallback || defaultFallback;
    }

    return this.props.children;
  }
}

/**
 * HOC to wrap components with error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<ErrorBoundaryProps, 'children'> = {}
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...options}>
      <Component {...props} />
    </ErrorBoundary>
  );

  // Set display name for debugging
  const displayName = Component.displayName || Component.name || 'Component';
  WrappedComponent.displayName = `withErrorBoundary(${displayName})`;

  return WrappedComponent;
}

/**
 * Hook to create error boundary wrapper
 */
export function useErrorBoundary(options: Omit<ErrorBoundaryProps, 'children'> = {}) {
  return {
    ErrorBoundary: React.useMemo(
      () => (props: { children: React.ReactNode }) => (
        <ErrorBoundary {...options}>{props.children}</ErrorBoundary>
      ),
      [options]
    ),
  };
}
