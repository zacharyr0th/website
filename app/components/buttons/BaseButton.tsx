import React from 'react';
import type { BaseButtonProps } from './constants';
import { getButtonClassName } from './constants';
import { LoadingSpinner } from '../../lib/Loading';

export const BaseButton = React.memo(
  React.forwardRef<HTMLButtonElement, BaseButtonProps>(
    (
      {
        children,
        className = '',
        disabled = false,
        isLoading = false,
        size = 'md',
        variant = 'default',
        ...props
      },
      ref
    ) => {
      const buttonClassName = getButtonClassName({
        size,
        variant,
        isLoading,
        disabled,
        className,
      } as const);

      return (
        <button ref={ref} className={buttonClassName} disabled={disabled || isLoading} {...props}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
          <span className={isLoading ? 'invisible' : 'visible'}>{children}</span>
        </button>
      );
    }
  )
);

BaseButton.displayName = 'BaseButton';
