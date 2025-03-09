/**
 * ConnectModal.tsx
 * This file contains both the ConnectModal component and the GlobalConnectModal component
 * that provides a global wrapper with keyboard shortcuts and event listeners.
 */

'use client';

import React, { useEffect, useRef, useCallback, memo, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOCIAL_LINKS } from '@/lib';
import { FaXmark } from 'react-icons/fa6';
import { Button } from '@/components/misc';
import { ErrorBoundary } from 'react-error-boundary';

// ===== ConnectModal Component =====

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SocialLink {
  url: string;
  label: string;
  platform: string;
  active: boolean;
  icon: React.ComponentType<{ size: number }> | null;
}

const openSocialLink = (url: string): void => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

const modalVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
} as const;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
} as const;

const ModalErrorFallback = memo(
  ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
    <div className="p-3 text-center">
      <p className="text-red-500 mb-2 text-sm">Something went wrong:</p>
      <pre className="text-xs mb-3">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="px-3 py-1.5 bg-accent text-surface rounded-full hover:bg-accent/90 transition-colors text-sm"
      >
        Try again
      </button>
    </div>
  )
);

ModalErrorFallback.displayName = 'ModalErrorFallback';

export const ConnectModal = memo(({ isOpen, onClose }: ConnectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLButtonElement>(null);
  const [socialLinks, setSocialLinks] = React.useState<Record<string, SocialLink>>({});

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    setSocialLinks(SOCIAL_LINKS);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';
    initialFocusRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape, handleClickOutside]);

  const filteredSocialLinks = useMemo(
    () =>
      Object.entries(socialLinks).filter(
        ([, link]) => link.active && link.platform !== 'GitHub' && link.icon
      ),
    [socialLinks]
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={overlayVariants}
        role="presentation"
      >
        <div className="fixed inset-0 bg-text/30 backdrop-blur-sm" aria-hidden="true" />

        <ErrorBoundary FallbackComponent={ModalErrorFallback} onReset={onClose}>
          <motion.div
            ref={modalRef}
            className="relative rounded-full px-8 py-4 shadow-xl bg-surface w-full max-w-[240px] mx-auto"
            variants={modalVariants}
            role="dialog"
            aria-modal="true"
            aria-labelledby="connect-modal-title"
          >
            <button
              ref={initialFocusRef}
              onClick={onClose}
              className="absolute -top-2 -right-2 z-10 p-1.5 bg-accent hover:bg-[var(--color-accent-hover)] rounded-full text-surface transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              aria-label="Close modal"
            >
              <FaXmark size={12} />
            </button>

            <div className="flex justify-center items-center gap-6">
              {filteredSocialLinks.map(([key, link]) => {
                const Icon = link.icon;
                if (!Icon) return null;

                return (
                  <Button
                    key={key}
                    variant="default"
                    onClick={() => openSocialLink(link.url)}
                    className="hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                    ariaLabel={`Connect on ${link.platform}`}
                    icon={<Icon size={24} />}
                  />
                );
              })}
            </div>
          </motion.div>
        </ErrorBoundary>
      </motion.div>
    </AnimatePresence>
  );
});

ConnectModal.displayName = 'ConnectModal';

// ===== GlobalConnectModal Component =====

interface GlobalConnectModalProps {
  defaultOpen?: boolean;
}

const GlobalErrorFallback = ({
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

export const GlobalConnectModal = memo(({ defaultOpen = false }: GlobalConnectModalProps) => {
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
    <ErrorBoundary FallbackComponent={GlobalErrorFallback} onReset={handleClose}>
      <ConnectModal isOpen={isOpen} onClose={handleClose} />
    </ErrorBoundary>
  );
});

GlobalConnectModal.displayName = 'GlobalConnectModal';

// Default export for backward compatibility
export default GlobalConnectModal;
