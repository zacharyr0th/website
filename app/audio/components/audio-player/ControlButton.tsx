import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface ControlButtonProps {
  onClick: () => void;
  icon: 'play' | 'pause' | 'next' | 'previous';
  isActive?: boolean;
  className?: string;
  animate?: boolean;
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
  base: 'p-2 rounded-full transition-colors',
  active: 'text-[var(--color-primary)]',
  inactive: 'text-[var(--color-text-secondary)]',
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

// Simple SVG component without unnecessary memoization
const ButtonIcon = ({ icon }: { icon: ControlButtonProps['icon'] }) => (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    style={BUTTON_STYLE}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ICON_PATHS.get(icon)} />
  </svg>
);

// Single button component that handles both animated and static cases
const ControlButton = memo<ControlButtonProps>(
  ({ onClick, icon, isActive = false, className = '', animate = true }) => {
    const buttonClassName = `${STYLES.base} ${isActive ? STYLES.active : STYLES.inactive} ${className}`;
    const ButtonComponent = animate ? motion.button : 'button';

    return (
      <ButtonComponent
        className={buttonClassName}
        onClick={onClick}
        style={BUTTON_STYLE}
        {...(animate ? ANIMATION_CONFIG : {})}
      >
        <ButtonIcon icon={icon} />
      </ButtonComponent>
    );
  }
);

ControlButton.displayName = 'ControlButton';

export default ControlButton;
