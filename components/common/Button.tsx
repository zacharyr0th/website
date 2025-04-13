'use client';

import React, { useState, useMemo, memo } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { LoadingSpinner } from 'components/common/Loading';
import { isTouchDevice } from '@/lib/utils';

/**
 * Button styling constants with mobile and desktop optimizations
 */
const BUTTON_CLASSES = {
  base: 'rounded-full transition-all duration-300 font-mono focus:outline-none active:scale-95 touch-manipulation' as const,
  size: {
    xs: 'px-2 py-0.5 text-sm min-h-[24px] sm:min-h-[28px]',
    sm: 'px-2.5 py-1 text-sm min-h-[32px] sm:min-h-[36px]',
    md: 'px-3 py-1.5 text-base min-h-[40px] sm:min-h-[44px]',
    'md-lg': 'px-4 py-2 text-[1.1rem] min-h-[44px] sm:min-h-[48px]',
    lg: 'px-5 py-2.5 text-lg min-h-[48px] sm:min-h-[52px]',
  } as const,
  state: {
    disabled: 'opacity-50 cursor-not-allowed',
    loading: 'relative cursor-wait',
  } as const,
  variant: {
    primary:
      'bg-primary text-text-primary hover:opacity-90 active:opacity-100 active:bg-primary/90',
    secondary:
      'bg-surface text-text-secondary border border-secondary hover:border-accent hover:text-accent active:bg-surface/80',
    default: 'bg-transparent hover:bg-surface/10 active:bg-surface/20',
    surface: 'bg-surface hover:bg-surface/90 active:bg-surface/80',
  } as const,
};

export type ButtonSize = keyof typeof BUTTON_CLASSES.size;
export type ButtonVariant = keyof typeof BUTTON_CLASSES.variant;

/**
 * Unified Button component that handles all button variants and functionality
 * Optimized for both desktop and mobile interactions
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  isLoading?: boolean;
  variant?: ButtonVariant;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  icon?: React.ReactNode;
  ariaLabel?: string;
  active?: boolean;
  noPadding?: boolean;
}

/**
 * Function to generate button class names
 */
const getButtonClassName = ({
  size = 'md',
  variant = 'default',
  isLoading,
  disabled,
  className = '',
}: ButtonProps): string => {
  return [
    BUTTON_CLASSES.base,
    BUTTON_CLASSES.size[size] || BUTTON_CLASSES.size.md,
    BUTTON_CLASSES.variant[variant] || BUTTON_CLASSES.variant.default,
    disabled && BUTTON_CLASSES.state.disabled,
    isLoading && BUTTON_CLASSES.state.loading,
    className,
  ]
    .filter(Boolean)
    .join(' ');
};

/**
 * Memoized content wrapper
 */
const ButtonContent = memo(
  ({
    leftIcon,
    children,
    rightIcon,
  }: {
    leftIcon?: React.ReactNode;
    children: React.ReactNode;
    rightIcon?: React.ReactNode;
  }) => (
    <span className="flex items-center gap-2">
      {leftIcon}
      {children}
      {rightIcon}
    </span>
  )
);
ButtonContent.displayName = 'ButtonContent';

export const Button = memo(
  React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        children,
        leftIcon,
        rightIcon,
        icon,
        ariaLabel,
        active,
        className = '',
        variant = 'default',
        noPadding = false,
        disabled = false,
        isLoading = false,
        size = 'md',
        ...props
      },
      ref
    ) => {
      // Memoize style and class computations
      const { buttonClassName, style, content } = useMemo(() => {
        if (icon && !children) {
          return {
            buttonClassName: getButtonClassName({
              size,
              variant,
              isLoading,
              disabled,
              className: `${noPadding ? '' : 'p-2 sm:p-2.5'} ${className}`,
            }),
            style: {},
            content: <span className="flex items-center justify-center">{icon}</span>,
          };
        }

        if (active !== undefined) {
          return {
            buttonClassName: getButtonClassName({
              size,
              variant,
              isLoading,
              disabled,
              className: `h-8 sm:h-10 flex items-center justify-center ${!noPadding ? 'px-3 sm:px-4' : ''} text-lg ${className}`,
            }),
            style: {
              backgroundColor: active ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
              color: active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
            },
            content: (
              <ButtonContent leftIcon={leftIcon} rightIcon={rightIcon}>
                {children}
              </ButtonContent>
            ),
          };
        }

        if (leftIcon || rightIcon) {
          return {
            buttonClassName: getButtonClassName({
              size,
              variant: variant || 'primary',
              isLoading,
              disabled,
              className: `${noPadding ? '' : 'px-4 sm:px-6 py-2'} ${className}`,
            }),
            style: {},
            content: (
              <ButtonContent leftIcon={leftIcon} rightIcon={rightIcon}>
                {children}
              </ButtonContent>
            ),
          };
        }

        return {
          buttonClassName: getButtonClassName({
            size,
            variant,
            isLoading,
            disabled,
            className,
          }),
          style: {},
          content: children,
        };
      }, [
        icon,
        children,
        active,
        size,
        variant,
        isLoading,
        disabled,
        noPadding,
        className,
        leftIcon,
        rightIcon,
      ]);

      return (
        <button
          ref={ref}
          className={buttonClassName}
          disabled={disabled || isLoading}
          style={style}
          aria-label={icon && !children ? ariaLabel : undefined}
          {...props}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
          <span className={isLoading ? 'invisible' : 'visible'}>{content}</span>
        </button>
      );
    }
  )
);

Button.displayName = 'Button';

/**
 * TouchButton Props - extends ButtonProps with touch-specific properties
 */
export interface TouchButtonProps extends ButtonProps {
  /**
   * Feedback color to show on touch
   */
  touchFeedbackColor?: string;

  /**
   * Custom touch start handler
   */
  onTouchStart?: (e: React.TouchEvent) => void;

  /**
   * Custom touch end handler
   */
  onTouchEnd?: (e: React.TouchEvent) => void;

  /**
   * Whether to use larger touch targets
   */
  enlargeTouchTarget?: boolean;
}

/**
 * TouchButton component optimized for mobile interactions
 * Extends the base Button with touch-specific enhancements
 */
export const TouchButton = memo(
  React.forwardRef<HTMLButtonElement, TouchButtonProps>(
    (
      {
        children,
        className = '',
        touchFeedbackColor = 'rgba(255, 255, 255, 0.1)',
        onTouchStart,
        onTouchEnd,
        enlargeTouchTarget = true,
        size = 'md',
        ...props
      },
      ref
    ) => {
      const [isTouched, setIsTouched] = useState(false);
      const isTouch = useMemo(() => isTouchDevice(), []);

      const touchSize = useMemo(() => {
        if (!enlargeTouchTarget || !isTouch) return size;
        return size === 'xs' ? 'sm' : size === 'sm' ? 'md' : size === 'md' ? 'md-lg' : 'lg';
      }, [enlargeTouchTarget, isTouch, size]);

      const handleTouchStart = useMemo(
        () => (e: React.TouchEvent) => {
          setIsTouched(true);
          onTouchStart?.(e);
        },
        [onTouchStart]
      );

      const handleTouchEnd = useMemo(
        () => (e: React.TouchEvent) => {
          setIsTouched(false);
          onTouchEnd?.(e);
        },
        [onTouchEnd]
      );

      const buttonStyle = useMemo(
        () => ({
          ...props.style,
          ...(isTouched ? { backgroundColor: touchFeedbackColor } : {}),
        }),
        [props.style, isTouched, touchFeedbackColor]
      );

      return (
        <Button
          ref={ref}
          className={`${className} ${isTouch ? 'touch-manipulation' : ''}`}
          size={touchSize}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={buttonStyle}
          {...props}
        >
          {children}
        </Button>
      );
    }
  )
);

TouchButton.displayName = 'TouchButton';
