import React from 'react';
import type { BaseButtonProps } from './constants';
import { BaseButton } from './BaseButton';

export interface ActionButtonProps extends BaseButtonProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ children, leftIcon, rightIcon, className = '', variant = 'primary', ...props }, ref) => (
    <BaseButton ref={ref} className={`px-6 py-2 ${className}`} variant={variant} {...props}>
      <span className="flex items-center gap-2">
        {leftIcon}
        {children}
        {rightIcon}
      </span>
    </BaseButton>
  )
);

ActionButton.displayName = 'ActionButton';
