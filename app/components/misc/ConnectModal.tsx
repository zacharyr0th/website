import React, { useEffect, useRef, useCallback, memo } from 'react';
import { SOCIAL_LINKS } from '../../lib/social';
import { FaXmark } from 'react-icons/fa6';
import { IconButton } from '../buttons';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const openSocialLink = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

const ConnectModal = memo(({ isOpen, onClose }: ConnectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

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

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleEscape, handleClickOutside]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-text/50 backdrop-blur-sm">
      <div ref={modalRef} className="relative rounded-xl px-8 py-6 shadow-xl bg-surface">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 p-1.5 bg-[var(--color-accent-hover)] hover:bg-accent rounded-full text-surface transition-colors"
          aria-label="Close modal"
        >
          <FaXmark size={12} />
        </button>

        <div className="flex justify-center items-center gap-8">
          {Object.values(SOCIAL_LINKS)
            .filter((link) => link.platform !== 'GitHub')
            .map((link) => (
              <IconButton
                key={link.label}
                variant="default"
                onClick={() => openSocialLink(link.url)}
                className="hover:text-accent transition-colors"
                ariaLabel={link.label}
                icon={<link.icon size={24} />}
              />
            ))}
        </div>
      </div>
    </div>
  );
});

ConnectModal.displayName = 'ConnectModal';

export default ConnectModal;
