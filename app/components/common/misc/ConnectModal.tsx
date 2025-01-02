import React, { useEffect, useRef, useCallback, memo } from 'react';
import { SOCIAL_LINKS } from '@/app/lib/social';
import { FaXmark } from 'react-icons/fa6';
import { IconButton } from '../buttons';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SocialButtonConfig {
  url: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  className: string;
  hoverClassName: string;
}

const openSocialLink = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

const SOCIAL_BUTTONS = [
  {
    url: SOCIAL_LINKS.linkedin.url,
    label: SOCIAL_LINKS.linkedin.label,
    icon: SOCIAL_LINKS.linkedin.icon,
    className: 'text-white transform transition-all duration-200',
    hoverClassName: 'hover:opacity-80 hover:scale-105',
  },
  {
    url: SOCIAL_LINKS.twitter.url,
    label: SOCIAL_LINKS.twitter.label,
    icon: SOCIAL_LINKS.twitter.icon,
    className: 'text-white transform transition-all duration-200',
    hoverClassName: 'hover:opacity-80 hover:scale-105',
  },
  {
    url: SOCIAL_LINKS.email.url,
    label: SOCIAL_LINKS.email.label,
    icon: SOCIAL_LINKS.email.icon,
    className: 'text-white transform transition-all duration-200',
    hoverClassName: 'hover:opacity-80 hover:scale-105',
  },
] satisfies SocialButtonConfig[];

const ConnectModal: React.FC<ConnectModalProps> = memo(({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const linkedInButtonRef = useRef<HTMLButtonElement>(null);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    const cleanup = () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    linkedInButtonRef.current?.focus();

    return cleanup;
  }, [isOpen, handleEscape, handleClickOutside]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        style={{ backgroundColor: 'var(--color-surface)' }}
        className="relative rounded-xl px-8 py-6 shadow-xl transform transition-transform duration-200"
      >
        <IconButton
          variant="solid"
          size="sm"
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 transition-transform duration-200 hover:scale-110"
          ariaLabel="Close modal"
          icon={<FaXmark className="w-4 h-4 min-w-[16px]" />}
        />

        <div className="flex justify-center items-center gap-6">
          {SOCIAL_BUTTONS.map((button, index) => {
            const Icon = button.icon;
            return (
              <IconButton
                key={button.label}
                ref={index === 0 ? linkedInButtonRef : undefined}
                variant="default"
                onClick={() => openSocialLink(button.url)}
                className={`${button.className} ${button.hoverClassName}`}
                ariaLabel={button.label}
                icon={<Icon className="w-7 h-7" />}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
});

ConnectModal.displayName = 'ConnectModal';

export default ConnectModal;
