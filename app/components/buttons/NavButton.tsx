import React, { useMemo } from 'react';
import type { BaseButtonProps } from './constants';
import { BaseButton } from './BaseButton';

export interface NavButtonProps extends BaseButtonProps {
  href?: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const NavButton = React.memo(
  React.forwardRef<HTMLButtonElement, NavButtonProps>(
    ({ active, children, leftIcon, rightIcon, className = '', isLoading = false, ...props }, ref) => {
      const style = useMemo(
        () => ({
          backgroundColor: active ? 'var(--color-surface)' : 'transparent',
          color: active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
        }),
        [active]
      );

      return (
        <BaseButton
          ref={ref}
          className={`interactive-button h-8 flex items-center justify-center ${!className?.includes('p-0') ? 'px-3' : ''} text-lg${active ? ' shadow-sm' : ''} ${className}`}
          style={style}
          isLoading={isLoading}
          {...props}
        >
          <span className="flex items-center gap-2">
            {leftIcon}
            {children}
            {rightIcon}
          </span>
        </BaseButton>
      );
    }
  )
);

NavButton.displayName = 'NavButton';
