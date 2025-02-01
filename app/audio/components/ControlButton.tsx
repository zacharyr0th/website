import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

interface ControlButtonProps {
  onClick: () => void;
  icon: keyof typeof ICON_PATHS;
  isActive?: boolean;
  className?: string;
  animate?: boolean;
}

// Extract icon paths to a constant
const ICON_PATHS = {
  play: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z',
  pause: 'M10 9v6m4-6v6',
  next: 'M9 5l7 7-7 7',
  previous: 'M15 19l-7-7 7-7',
} as const;

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

// Extract SVG component for better performance
const ButtonIcon = memo<{ icon: keyof typeof ICON_PATHS }>(({ icon }) => (
  <svg 
    className="w-6 h-6" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    style={{ willChange: 'transform', contain: 'strict' }}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d={ICON_PATHS[icon]} 
    />
  </svg>
));

ButtonIcon.displayName = 'ButtonIcon';

// Extract button components for better performance
const StaticButton = memo<ControlButtonProps>(({ onClick, icon, isActive, className = '' }) => {
  const buttonClassName = useMemo(() => {
    const activeClass = isActive ? STYLES.active : STYLES.inactive;
    return `${STYLES.base} ${activeClass} ${className}`;
  }, [isActive, className]);

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      style={{ willChange: 'transform', contain: 'layout style paint' }}
    >
      <ButtonIcon icon={icon} />
    </button>
  );
});

StaticButton.displayName = 'StaticButton';

const AnimatedButton = memo<ControlButtonProps>(({ onClick, icon, isActive, className = '' }) => {
  const buttonClassName = useMemo(() => {
    const activeClass = isActive ? STYLES.active : STYLES.inactive;
    return `${STYLES.base} ${activeClass} ${className}`;
  }, [isActive, className]);

  return (
    <motion.button
      className={buttonClassName}
      onClick={onClick}
      {...ANIMATION_CONFIG}
      style={{ willChange: 'transform', contain: 'layout style paint' }}
    >
      <ButtonIcon icon={icon} />
    </motion.button>
  );
});

AnimatedButton.displayName = 'AnimatedButton';

const ControlButton = memo<ControlButtonProps>(({ animate = true, ...props }) => {
  const Button = animate ? AnimatedButton : StaticButton;
  return <Button {...props} />;
});

ControlButton.displayName = 'ControlButton';

export default ControlButton; 