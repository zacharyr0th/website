'use client';

import { type ReactNode } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { motion } from 'framer-motion';

interface ErrorBoundaryLayoutProps {
  children: ReactNode;
}

const RootErrorFallback = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen flex items-center justify-center p-4 bg-background text-text-primary"
  >
    <div className="max-w-md w-full space-y-4 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-text-secondary">
        We&apos;re having trouble loading the application. Please try refreshing the page.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors inline-flex items-center justify-center"
      >
        Refresh page
      </button>
    </div>
  </motion.div>
);

export function ErrorBoundaryLayout({ children }: ErrorBoundaryLayoutProps) {
  return (
    <ErrorBoundary fallback={<RootErrorFallback />} source="root-layout">
      {children}
    </ErrorBoundary>
  );
}

interface ContentErrorBoundaryProps {
  children: ReactNode;
  source?: string;
}

const ContentErrorFallback = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="w-full p-8 rounded-lg bg-surface border border-border"
  >
    <div className="max-w-lg mx-auto text-center">
      <h2 className="text-xl font-semibold mb-3 text-text-primary">Content failed to load</h2>
      <p className="text-text-secondary mb-4">
        We encountered an error while loading this content. Please try refreshing the page.
      </p>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors text-sm"
        >
          Refresh page
        </button>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-surface-accent hover:bg-surface-accent/80 text-text-secondary rounded-lg transition-colors text-sm"
        >
          Go back
        </button>
      </div>
    </div>
  </motion.div>
);

export function ContentErrorBoundary({ children, source }: ContentErrorBoundaryProps) {
  return (
    <ErrorBoundary fallback={<ContentErrorFallback />} source={source || 'content'}>
      {children}
    </ErrorBoundary>
  );
}
