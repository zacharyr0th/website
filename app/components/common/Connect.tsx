import React, { useEffect, useRef, useCallback } from 'react';
import { SOCIAL_LINKS } from '@/app/lib/constants/social';
import { ICONS } from './icons';
import { FaXmark } from 'react-icons/fa6';
import { Button } from './Button';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConnectModal: React.FC<ConnectModalProps> = ({ isOpen, onClose }) => {
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

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    linkedInButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleEscape, handleClickOutside]);

  if (!isOpen) return null;

  const openSocialLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        style={{ backgroundColor: 'var(--color-surface)' }}
        className={`relative rounded-xl px-6 py-4 shadow-xl sm:px-8 sm:py-6`}
      >
        <Button
          variant="icon"
          size="sm"
          onClick={onClose}
          className="absolute -top-2 -right-2 bg-primary text-white"
          ariaLabel="Close modal"
        >
          <FaXmark className="w-4 h-4 min-w-[16px]" />
        </Button>

        <div className="flex justify-center items-center gap-4 sm:gap-6">
          <Button
            ref={linkedInButtonRef}
            variant="icon"
            onClick={() => openSocialLink(SOCIAL_LINKS.linkedin.url)}
            className="bg-[#0077b5] hover:bg-[#006396] text-white"
            ariaLabel={SOCIAL_LINKS.linkedin.label}
          >
            <ICONS.social.linkedin className="w-6 h-6 sm:w-7 sm:h-7" />
          </Button>

          <Button
            variant="icon"
            onClick={() => openSocialLink(SOCIAL_LINKS.twitter.url)}
            className="bg-black hover:bg-zinc-800 text-white"
            ariaLabel={SOCIAL_LINKS.twitter.label}
          >
            <ICONS.social.twitter className="w-6 h-6 sm:w-7 sm:h-7" />
          </Button>

          <Button
            variant="icon"
            onClick={() => {
              window.location.href = SOCIAL_LINKS.email.url;
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white dark:bg-gray-700 dark:hover:bg-gray-600"
            ariaLabel={SOCIAL_LINKS.email.label}
          >
            <ICONS.social.email className="w-6 h-6 sm:w-7 sm:h-7" />
          </Button>
        </div>
      </div>
    </div>
  );
};

ConnectModal.displayName = 'ConnectModal';

export default ConnectModal;
