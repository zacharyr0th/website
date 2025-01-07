import type { ButtonHTMLAttributes } from 'react';

export const BUTTON_CLASSES = {
  base: 'rounded-full transition-all duration-300 font-mono focus:outline-none focus:ring-2 focus:ring-accent/50 focus-visible:ring-2 focus-visible:ring-accent' as const,
  size: {
    xs: 'px-2 py-0.5 text-sm min-h-[24px]',
    sm: 'px-2.5 py-1 text-sm min-h-[32px]',
    md: 'px-3 py-1.5 text-base min-h-[40px]',
    lg: 'px-5 py-2.5 text-lg min-h-[48px]',
  } as const,
  state: {
    disabled: 'opacity-50 cursor-not-allowed',
    loading: 'relative cursor-wait',
  } as const,
  variant: {
    primary: 'bg-primary text-text-primary hover:opacity-90',
    secondary: 'bg-surface text-text-secondary border border-secondary hover:border-accent hover:text-accent',
    default: 'bg-transparent hover:bg-surface/10',
    surface: 'bg-surface hover:bg-surface/90',
  } as const,
} as const;

export type ButtonSize = keyof typeof BUTTON_CLASSES.size;
export type ButtonVariant = keyof typeof BUTTON_CLASSES.variant;

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  isLoading?: boolean;
  variant?: ButtonVariant;
  className?: string;
}

export const getButtonClassName = ({
  size = 'md',
  variant = 'default',
  isLoading,
  disabled,
  className = '',
}: BaseButtonProps): string => {
  const classes = [
    BUTTON_CLASSES.base,
    BUTTON_CLASSES.size[size],
    BUTTON_CLASSES.variant[variant],
    disabled && BUTTON_CLASSES.state.disabled,
    isLoading && BUTTON_CLASSES.state.loading,
    className
  ];

  return classes.filter(Boolean).join(' ');
}; 