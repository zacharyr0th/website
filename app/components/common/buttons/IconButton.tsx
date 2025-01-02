import React from 'react';
import { BaseButton, BaseButtonProps } from './BaseButton';

const ICON_BUTTON_STYLES = {
  default: (active: boolean | undefined) =>
    active
      ? 'bg-surface text-text-primary p-2'
      : 'bg-transparent hover:bg-surface/50 text-text-primary p-2',
  solid: (active: boolean | undefined) =>
    active ? 'bg-surface text-text-primary p-2' : 'bg-primary hover:opacity-90 text-white p-2',
} as const;

export interface IconButtonProps extends BaseButtonProps {
  variant?: 'default' | 'solid';
  icon: React.ReactNode;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = 'default', active, className = '', icon, ...props }, ref) => {
    const variantClasses = ICON_BUTTON_STYLES[variant](active);
    return (
      <BaseButton
        ref={ref}
        className={`aspect-square flex items-center justify-center ${variantClasses} ${className}`}
        leftIcon={icon}
        {...props}
      />
    );
  }
);

IconButton.displayName = 'IconButton';
