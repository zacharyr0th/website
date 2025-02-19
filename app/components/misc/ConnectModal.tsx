import React, { useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '@/lib';
import { FaXmark } from 'react-icons/fa6';
import { IconButton } from '../buttons';
import { ErrorBoundary } from 'react-error-boundary';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const { SOCIAL_LINKS } = config;

const openSocialLink = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

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
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => (
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
);

const ConnectModal = memo(({ isOpen, onClose }: ConnectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLButtonElement>(null);

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          role="presentation"
        >
          <div className="fixed inset-0 bg-text/30 backdrop-blur-sm" aria-hidden="true" />

          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={onClose}>
            <motion.div
              ref={modalRef}
              className="relative rounded-full px-6 py-3 shadow-xl bg-surface w-full max-w-[200px] mx-auto"
              variants={modalVariants}
              role="dialog"
              aria-modal="true"
              aria-labelledby="connect-modal-title"
            >
              <button
                ref={initialFocusRef}
                onClick={onClose}
                className="absolute -top-1.5 -right-1.5 z-10 p-1 bg-accent hover:bg-[var(--color-accent-hover)] rounded-full text-surface transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                aria-label="Close modal"
              >
                <FaXmark size={10} />
              </button>

              <div className="flex justify-center items-center gap-5">
                {Object.values(SOCIAL_LINKS)
                  .filter((link) => link.active && link.platform !== 'GitHub')
                  .map((link) => (
                    <IconButton
                      key={link.label}
                      variant="default"
                      onClick={() => openSocialLink(link.url)}
                      className="hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                      ariaLabel={`Connect on ${link.platform}`}
                      icon={<link.icon size={20} />}
                    />
                  ))}
              </div>
            </motion.div>
          </ErrorBoundary>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

ConnectModal.displayName = 'ConnectModal';

export default ConnectModal;
