'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';

interface ControlButtonProps {
  onClick: () => void;
  icon: 'play' | 'pause' | 'next' | 'previous';
  label?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const ControlButton = memo<ControlButtonProps>(
  ({ onClick, icon, label, isLoading = false, isDisabled = false, className = '', children }) => {
    return (
      <motion.button
        onClick={onClick}
        disabled={isDisabled || isLoading}
        className={`relative flex items-center justify-center w-12 h-12 text-[var(--color-text)] transition-opacity duration-200
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80 active:opacity-60'} 
        ${className}`}
        whileHover={!isDisabled && !isLoading ? { scale: 1.05 } : {}}
        whileTap={!isDisabled && !isLoading ? { scale: 0.95 } : {}}
        aria-label={label}
      >
        {icon === 'play' && (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
        {icon === 'pause' && (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        )}
        {icon === 'next' && (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        )}
        {icon === 'previous' && (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
          </svg>
        )}
        {isLoading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
        {children}
      </motion.button>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function for better memoization
    return (
      prevProps.icon === nextProps.icon &&
      prevProps.isLoading === nextProps.isLoading &&
      prevProps.isDisabled === nextProps.isDisabled &&
      prevProps.className === nextProps.className
    );
  }
);

ControlButton.displayName = 'ControlButton';

export type { ControlButtonProps };
export default ControlButton;
