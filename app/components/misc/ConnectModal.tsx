import React, { useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOCIAL_LINKS } from '../../lib/social';
import { FaXmark } from 'react-icons/fa6';
import { IconButton } from '../buttons';
import { ErrorBoundary } from 'react-error-boundary';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const openSocialLink = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: 'spring', duration: 0.3 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <div className="p-4 text-center">
    <p className="text-red-500 mb-2">Something went wrong:</p>
    <pre className="text-sm mb-4">{error.message}</pre>
    <button
      onClick={resetErrorBoundary}
      className="px-4 py-2 bg-accent text-surface rounded-md hover:bg-accent/90 transition-colors"
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
    
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus management
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
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          role="presentation"
        >
          <div 
            className="fixed inset-0 bg-text/50 backdrop-blur-sm" 
            aria-hidden="true"
          />
          
          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={onClose}>
            <motion.div
              ref={modalRef}
              className="relative rounded-xl px-8 py-6 shadow-xl bg-surface max-w-md w-full mx-4"
              variants={modalVariants}
              role="dialog"
              aria-modal="true"
              aria-labelledby="connect-modal-title"
            >
              <button
                ref={initialFocusRef}
                onClick={onClose}
                className="absolute -top-3 -right-3 z-10 p-1.5 bg-[var(--color-accent-hover)] hover:bg-accent rounded-full text-surface transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                aria-label="Close modal"
              >
                <FaXmark size={12} />
              </button>

              <div className="flex justify-center items-center gap-8">
                {Object.values(SOCIAL_LINKS)
                  .filter((link) => link.active && link.platform !== 'GitHub')
                  .map((link) => (
                    <IconButton
                      key={link.label}
                      variant="default"
                      onClick={() => openSocialLink(link.url)}
                      className="hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                      ariaLabel={`Connect on ${link.platform}`}
                      icon={<link.icon size={24} />}
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
