import React from 'react';
import type { BaseButtonProps } from './constants';
import { BaseButton } from './BaseButton';

export interface IconButtonProps extends BaseButtonProps {
  icon: React.ReactNode;
  ariaLabel: string;
  noPadding?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, className = '', ariaLabel, noPadding = false, ...props }, ref) => (
    <BaseButton
      ref={ref}
      className={`interactive-button ${noPadding ? '' : 'p-2'} ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      <span className="flex items-center justify-center">{icon}</span>
    </BaseButton>
  )
);

IconButton.displayName = 'IconButton';
