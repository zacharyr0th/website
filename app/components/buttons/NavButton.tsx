import React, { useMemo } from 'react';
import { BaseButton, BaseButtonProps } from './BaseButton';

const getButtonStyle = (active: boolean | undefined) => ({
  backgroundColor: active ? 'var(--color-surface)' : 'transparent',
  color: active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '2.5rem',
});

export interface NavButtonProps extends BaseButtonProps {
  variant?: 'default';
}

export const NavButton = React.memo(
  React.forwardRef<HTMLButtonElement, NavButtonProps>(
    ({ variant = 'default', active, className = '', ...props }, ref) => {
      const style = useMemo(() => getButtonStyle(active), [active]);
      const buttonClassName = `interactive-button px-3 rounded-full text-lg${
        active ? ' shadow-sm' : ''
      } ${className}`;

      return (
        <BaseButton
          ref={ref}
          className={buttonClassName}
          style={style}
          {...props}
        />
      );
    }
  )
);

NavButton.displayName = 'NavButton'; 