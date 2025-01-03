import React from 'react';
import { BaseButton, BaseButtonProps } from './BaseButton';

const buttonStyles = {
  default: {
    backgroundColor: 'transparent',
  },
  primary: {
    backgroundColor: 'var(--color-surface)',
  },
} as const;

export interface IconButtonProps extends BaseButtonProps {
  icon: React.ReactNode;
  variant?: keyof typeof buttonStyles;
  ariaLabel: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, variant = 'default', className = '', ariaLabel, ...props }, ref) => {
    return (
      <BaseButton
        ref={ref}
        className={`interactive-button p-2 rounded-lg ${className}`}
        style={buttonStyles[variant]}
        aria-label={ariaLabel}
        {...props}
      >
        {icon}
      </BaseButton>
    );
  }
);

IconButton.displayName = 'IconButton'; 