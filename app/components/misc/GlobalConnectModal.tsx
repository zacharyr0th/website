'use client';

import React, { useEffect, useState, useCallback, memo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import ConnectModal for better code splitting
const ConnectModal = dynamic(() => import('./ConnectModal'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-text/30 backdrop-blur-sm" />
      <div className="relative w-[200px] h-[48px] rounded-full bg-surface/80 animate-pulse" />
    </div>
  ),
});

interface GlobalConnectModalProps {
  defaultOpen?: boolean;
}

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => (
  <div
    className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg max-w-[90vw]"
    role="alert"
  >
    <p className="font-medium">Error loading connect modal</p>
    <p className="text-sm mt-1 opacity-90">{error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className="mt-2 px-3 py-1 bg-white/10 hover:bg-white/20 text-sm rounded-full transition-colors"
    >
      Retry
    </button>
  </div>
);

const GlobalConnectModal = memo(({ defaultOpen = false }: GlobalConnectModalProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle if not in an input/textarea
      if (
        e.target instanceof HTMLElement &&
        (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')
      ) {
        return;
      }

      if (e.metaKey && e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        handleToggle();
      }
    };

    const handleOpenEvent = (e: Event) => {
      e.stopPropagation();
      setIsOpen(true);
    };

    window.addEventListener('openConnectModal', handleOpenEvent);
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('openConnectModal', handleOpenEvent);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleToggle]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleClose}>
      <Suspense fallback={null}>
        <ConnectModal isOpen={isOpen} onClose={handleClose} />
      </Suspense>
    </ErrorBoundary>
  );
});

GlobalConnectModal.displayName = 'GlobalConnectModal';

export default GlobalConnectModal;
