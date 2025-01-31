'use client';

import React, { useEffect, useState, useCallback, memo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import ConnectModal for better code splitting
const ConnectModal = dynamic(() => import('./ConnectModal'), {
  ssr: false,
  loading: () => null, // Modal is non-critical UI, so we can use null as loading state
});

interface GlobalConnectModalProps {
  defaultOpen?: boolean;
}

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg" role="alert">
    <p className="font-semibold">Error loading connect modal:</p>
    <p className="text-sm">{error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className="mt-2 px-4 py-1 bg-white text-red-500 rounded hover:bg-red-50 transition-colors"
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

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    // Listen for the custom event to open the modal
    const handleOpenEvent = () => handleOpen();
    window.addEventListener('openConnectModal', handleOpenEvent);
    return () => window.removeEventListener('openConnectModal', handleOpenEvent);
  }, [handleOpen]);

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
