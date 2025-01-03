import React from 'react';
import { BaseButton, BaseButtonProps } from './BaseButton';

// Extract button styles to prevent recreation
const buttonStyles = {
  primary: {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-white)',
    boxShadow: 'var(--box-shadow)',
  },
  secondary: {
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text-secondary)',
    border: '1px solid var(--color-secondary)',
  },
} as const;

export interface ActionButtonProps extends BaseButtonProps {
  variant: 'primary' | 'secondary';
}

export const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ variant = 'primary', className = '', ...props }, ref) => {
    return (
      <BaseButton
        ref={ref}
        className={`px-6 py-2 rounded-full transition-colors duration-300 ${className}`}
        style={buttonStyles[variant]}
        {...props}
      />
    );
  }
);

ActionButton.displayName = 'ActionButton';
