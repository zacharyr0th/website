import React from 'react';
import { BaseButton, BaseButtonProps } from './BaseButton';

const buttonStyles = {
  default: (active: boolean | undefined) => ({
    backgroundColor: active ? 'var(--color-surface)' : 'transparent',
    color: active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
    border: active ? '1px solid var(--color-accent)' : '1px solid transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '2.5rem',
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
        className={`interactive-button px-3 py-1 rounded-full text-lg my-auto${
          active ? 'shadow-sm' : ''
        } ${className}`}
        style={buttonStyles[variant](active)}
        {...props}
      />
    );
  }
);

NavButton.displayName = 'NavButton';
