import React from 'react';
import { ButtonProps } from '../types';

export const Button: React.FC<ButtonProps> = ({
  primary = false,
  secondary = false,
  children,
  onClick,
  className = '',
}) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-full transition-colors duration-300 ${
      primary
        ? 'bg-primary text-[var(--color-white)] shadow-[var(--box-shadow)]'
        : secondary
        ? 'bg-surface text-text-secondary border border-secondary'
        : 'bg-background text-text-primary'
    } ${className}`}
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