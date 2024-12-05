import React, { useEffect, useRef } from 'react';
import { SOCIAL_LINKS, COLORS, ANIMATIONS } from '@/lib/constants';
import { FaLinkedin, FaXTwitter, FaEnvelope, FaXmark } from 'react-icons/fa6';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConnectModal: React.FC<ConnectModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const linkedInButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      linkedInButtonRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLinkedInClick = () => {
    window.open(SOCIAL_LINKS.linkedin, '_blank', 'noopener,noreferrer');
  };

  const handleXClick = () => {
    window.open(SOCIAL_LINKS.twitter, '_blank', 'noopener,noreferrer');
  };

  const handleEmailClick = () => {
    window.location.href = SOCIAL_LINKS.email;
  };

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
            onClick={handleLinkedInClick}
            className="p-3 sm:p-4 rounded-full bg-[#0077b5] text-white hover:bg-[#006396] transition-all duration-200 transform hover:scale-105 hover:shadow-lg active:scale-95"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          <button
            onClick={handleXClick}
            className="p-3 sm:p-4 rounded-full bg-black text-white hover:bg-zinc-800 transition-all duration-200 transform hover:scale-105 hover:shadow-lg active:scale-95"
            aria-label="X (Twitter) Profile"
          >
            <FaXTwitter className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          <button
            onClick={handleEmailClick}
            style={{ backgroundColor: COLORS.accent }}
            className="p-3 sm:p-4 rounded-full text-white transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:opacity-90 active:scale-95"
            aria-label="Send Email"
          >
            <FaEnvelope className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;
