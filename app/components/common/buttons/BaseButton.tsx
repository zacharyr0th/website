import React from 'react';

// Consolidated theme constants
export const THEME = {
  colors: {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-surface)',
    accent: 'var(--color-accent)',
    background: 'var(--color-background)',
    text: {
      primary: 'var(--color-text-primary)',
      secondary: 'var(--color-text-secondary)',
    },
  },
  button: {
    shadow: 'var(--box-shadow)',
    radius: 'var(--border-radius-md)',
  },
} as const;

// Base button classes
export const BUTTON_CLASSES = {
  base: 'rounded-full transition-all duration-300 font-mono focus:outline-none',
  size: {
    xs: 'px-2 py-0.5 text-sm',
    sm: 'px-2.5 py-1 text-sm',
    md: 'px-3 py-1.5 text-base',
    lg: 'px-5 py-2.5 text-lg',
  },
  state: {
    disabled: 'opacity-50 cursor-not-allowed',
  },
} as const;

export type ButtonSize = keyof typeof BUTTON_CLASSES.size;

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  active?: boolean;
  ariaLabel?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  (
    {
      size = 'md',
      children,
      className = '',
      ariaLabel,
      isLoading,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const content = (
      <>
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </span>
        )}
        <span className={`flex items-center gap-2 ${isLoading ? 'opacity-0' : ''}`}>
          {leftIcon}
          {children}
          {rightIcon}
        </span>
      </>
    );

    return (
      <button
        ref={ref}
        className={`${BUTTON_CLASSES.base} ${BUTTON_CLASSES.size[size]} ${disabled ? BUTTON_CLASSES.state.disabled : ''} ${className}`}
        aria-label={ariaLabel}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

BaseButton.displayName = 'BaseButton';
