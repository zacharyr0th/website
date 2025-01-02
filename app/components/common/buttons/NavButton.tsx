import React from 'react';
import { BaseButton, BaseButtonProps } from './BaseButton';

const buttonStyles = {
  default: (active: boolean | undefined) => ({
    backgroundColor: active ? 'var(--color-surface)' : 'transparent',
    color: active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
    border: active ? '1px solid var(--color-accent)' : '1px solid transparent',
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
        className={`px-4 py-1.5 rounded-full transition-all duration-300 hover:bg-surface/10 hover:text-text-primary ${
          active ? 'shadow-sm' : ''
        } ${className}`}
        style={buttonStyles[variant](active)}
        {...props}
      />
    );
  }
);

NavButton.displayName = 'NavButton';
