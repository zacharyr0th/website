import React from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'default' | 'icon';
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'default',
      active = false,
      children,
      onClick,
      className = '',
      size = 'md',
      ariaLabel,
      asChild = false,
    },
    ref
  ) => {
    const baseClasses = 'transition-colors duration-300 focus:outline-none rounded-3xl';

    const sizeClasses = {
      sm: 'px-6 py-2 text-base',
      md: 'px-6 py-2 text-base',
      lg: 'px-8 py-2.5 text-lg',
    };

    const variantClasses = {
      primary: 'bg-primary text-[var(--color-button-text)] shadow-[var(--box-shadow)]',
      secondary: 'bg-surface text-text-secondary border border-secondary',
      default: 'bg-background text-text-primary hover:bg-surface/20',
      icon: 'aspect-square flex items-center justify-center',
    };

    const activeClasses = active ? 'ring-2 ring-primary' : '';

    const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${activeClasses} ${className}`;

    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        className: classes,
        onClick,
        'aria-label': ariaLabel,
      });
    }

    return (
      <button
        ref={ref}
        onClick={onClick}
        className={classes}
        aria-label={ariaLabel}
        style={
          {
            '--box-shadow': 'var(--box-shadow)',
            '--border-radius': 'var(--border-radius-md)',
          } as React.CSSProperties
        }
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
