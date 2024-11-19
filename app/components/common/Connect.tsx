import React, { useEffect, useRef } from 'react';
import { SOCIAL_LINKS } from '@/lib/constants';

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
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      linkedInButtonRef.current?.focus();
    }
    
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLinkedInClick = () => {
    window.open(SOCIAL_LINKS.linkedin, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        className="relative bg-[var(--color-surface)] rounded-lg p-6 shadow-xl w-full max-w-md m-4"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        <h2 id="modal-title" className="text-xl font-mono text-[var(--color-text-primary)] mb-4">
          Connect with me
        </h2>

        <div className="space-y-4">
          <button
            ref={linkedInButtonRef}
            onClick={handleLinkedInClick}
            className="w-full px-4 py-2 bg-[#0077b5] text-[var(--color-white)] rounded font-mono hover:bg-[#006396] transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            LinkedIn
          </button>

          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-text-primary)] rounded font-mono hover:bg-[var(--color-primary)] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;