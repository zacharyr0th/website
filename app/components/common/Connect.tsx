import React, { useEffect, useRef, useCallback } from 'react';
import { SOCIAL_LINKS, COLORS, ANIMATIONS } from '@/lib/constants';
import { FaLinkedin, FaXTwitter, FaEnvelope, FaXmark } from 'react-icons/fa6';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConnectModal: React.FC<ConnectModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const linkedInButtonRef = useRef<HTMLButtonElement>(null);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose]);

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

  const commonButtonStyles = "p-3 sm:p-4 rounded-full text-white transition-all duration-200 transform hover:scale-105 hover:shadow-lg active:scale-95";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ${ANIMATIONS.fadeIn}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        style={{ backgroundColor: COLORS.surface }}
        className={`relative rounded-xl px-6 py-4 shadow-xl sm:px-8 sm:py-6 ${ANIMATIONS.slideIn}`}
      >
        <button
          onClick={onClose}
          style={{ backgroundColor: COLORS.primary }}
          className="absolute -top-2 -right-2 p-1.5 text-white rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg z-10 flex items-center justify-center"
          aria-label="Close modal"
        >
          <FaXmark className="w-4 h-4 min-w-[16px]" />
        </button>

        <div className="flex justify-center items-center gap-4 sm:gap-6">
          <button
            ref={linkedInButtonRef}
            onClick={() => openSocialLink(SOCIAL_LINKS.linkedin)}
            className={`${commonButtonStyles} bg-[#0077b5] hover:bg-[#006396]`}
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          <button
            onClick={() => openSocialLink(SOCIAL_LINKS.twitter)}
            className={`${commonButtonStyles} bg-black hover:bg-zinc-800`}
            aria-label="X (Twitter) Profile"
          >
            <FaXTwitter className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          <button
            onClick={() => {window.location.href = SOCIAL_LINKS.email}}
            style={{ backgroundColor: COLORS.accent }}
            className={`${commonButtonStyles} hover:opacity-90`}
            aria-label="Send Email"
          >
            <FaEnvelope className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ConnectModal);
