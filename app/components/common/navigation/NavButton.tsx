'use client';

import React from 'react';
import type { ButtonProps } from '@/app/lib/types/types';

const NavButton: React.FC<ButtonProps> = ({
  variant = 'default',
  active = false,
  children,
  onClick,
  className = '',
  size = 'md',
  ariaLabel,
}) => {
  const baseStyles = 'rounded-full transition-all duration-300 font-mono';
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantStyles = {
    primary: active
      ? 'bg-accent text-text-primary'
      : 'bg-transparent hover:bg-accent/10 text-text-primary',
    secondary: active
      ? 'bg-surface text-text-primary'
      : 'bg-transparent hover:bg-surface/50 text-text-primary',
    default: active
      ? 'bg-surface text-text-primary'
      : 'bg-transparent hover:bg-surface/50 text-text-primary',
    icon: active
      ? 'bg-surface text-text-primary p-2'
      : 'bg-transparent hover:bg-surface/50 text-text-primary p-2',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default NavButton;
