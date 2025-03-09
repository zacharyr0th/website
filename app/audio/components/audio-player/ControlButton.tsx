/**
 * ControlButton component for audio player
 * Provides interactive controls with loading state support
 */
import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface ControlButtonProps {
  onClick: () => void;
  icon: 'play' | 'pause' | 'next' | 'previous';
  isActive?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
  animate?: boolean;
  size?: 'small' | 'medium' | 'large';
  label?: string;
}

// Extract icon paths to a constant
const ICON_PATHS = new Map([
  [
    'play',
    'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z',
  ],
  ['pause', 'M10 9v6m4-6v6'],
  ['next', 'M9 5l7 7-7 7'],
  ['previous', 'M15 19l-7-7 7-7'],
]);

// Extract styles to constants with performance optimizations
const STYLES = {
  base: 'p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-50',
  active: 'text-[var(--color-primary)]',
  inactive: 'text-[var(--color-text-secondary)]',
  disabled: 'opacity-50 cursor-not-allowed',
  loading: 'relative',
  sizes: {
    small: 'p-1',
    medium: 'p-2',
    large: 'p-3',
  },
  iconSizes: {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  },
} as const;

// Extract animation config to prevent recreation
const ANIMATION_CONFIG = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.95 },
  transition: { type: 'spring', stiffness: 300, damping: 25 },
} as const;

const BUTTON_STYLE = {
  willChange: 'transform',
  contain: 'layout style paint',
} as const;

// Loading spinner component
const LoadingSpinner = memo<{ size: ControlButtonProps['size'] }>(({ size = 'medium' }) => (
  <div className="absolute inset-0 flex items-center justify-center">
    <motion.div
      className={`rounded-full border-2 border-t-transparent border-[var(--color-primary)]`}
      style={{
        width: size === 'small' ? '1rem' : size === 'medium' ? '1.5rem' : '2rem',
        height: size === 'small' ? '1rem' : size === 'medium' ? '1.5rem' : '2rem',
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

// Simple SVG component without unnecessary memoization
const ButtonIcon = memo<{ 
  icon: ControlButtonProps['icon']; 
  size: ControlButtonProps['size'];
  isLoading: boolean;
}>(({ icon, size = 'medium', isLoading }) => (
  <svg
    className={`${STYLES.iconSizes[size]} ${isLoading ? 'opacity-0' : ''}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    style={BUTTON_STYLE}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ICON_PATHS.get(icon)} />
  </svg>
));

ButtonIcon.displayName = 'ButtonIcon';

// Single button component that handles both animated and static cases
const ControlButton = memo<ControlButtonProps>(
  ({ 
    onClick, 
    icon, 
    isActive = false, 
    isLoading = false,
    isDisabled = false,
    className = '', 
    animate = true,
    size = 'medium',
    label,
  }) => {
    const buttonClassName = `
      ${STYLES.base} 
      ${STYLES.sizes[size]} 
      ${isActive ? STYLES.active : STYLES.inactive} 
      ${isDisabled ? STYLES.disabled : ''} 
      ${isLoading ? STYLES.loading : ''} 
      ${className}
    `;
    
    const handleClick = (e: React.MouseEvent) => {
      if (isDisabled || isLoading) {
        e.preventDefault();
        return;
      }
      onClick();
    };
    
    const ButtonComponent = animate ? motion.button : 'button';
    const animationProps = animate && !isDisabled && !isLoading ? ANIMATION_CONFIG : {};

    return (
      <ButtonComponent
        className={buttonClassName}
        onClick={handleClick}
        style={BUTTON_STYLE}
        disabled={isDisabled}
        aria-label={label || icon}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        {...animationProps}
      >
        <ButtonIcon icon={icon} size={size} isLoading={isLoading} />
        {isLoading && <LoadingSpinner size={size} />}
      </ButtonComponent>
    );
  }
);

ControlButton.displayName = 'ControlButton';

export default ControlButton;
