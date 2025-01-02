import React from 'react';
import { BaseButton, BaseButtonProps } from './BaseButton';

// Extract button styles to prevent recreation
const buttonStyles = {
  default: (active: boolean | undefined) => ({
    backgroundColor: active ? 'var(--color-surface)' : 'transparent',
    color: 'var(--color-text-secondary)',
    border: active ? '1px solid var(--color-secondary)' : 'none',
  }),
} as const;

export interface NavButtonProps extends BaseButtonProps {
  variant?: 'default';
}

export const NavButton = React.forwardRef<HTMLButtonElement, NavButtonProps>(
  ({ variant = 'default', active, className = '', ...props }, ref) => {
    return (
      <BaseButton
        ref={ref}
        className={`px-6 py-2 rounded-full transition-colors duration-300 hover:bg-surface/10 ${className}`}
        style={buttonStyles[variant](active)}
        {...props}
      />
    );
  }
);

NavButton.displayName = 'NavButton';
