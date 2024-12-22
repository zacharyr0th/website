import React from 'react';
import { NavItem, NavButtonProps } from '../types';

export const navItems: NavItem[] = [
  { label: 'Projects', href: '/projects' },
  { label: 'Writing', href: '/writing' },
  { label: 'Audio', href: '/audio' },
];

export const NavButton: React.FC<NavButtonProps> = ({ variant, children, ...props }) => (
  <button
    className={`px-4 py-2 rounded-full transition-all duration-300 ${
      variant === 'primary'
        ? 'bg-primary text-[var(--color-white)]'
        : variant === 'secondary'
        ? 'bg-surface text-text-secondary'
        : 'bg-background text-text-primary'
    } hover:opacity-90`}
    style={{
      backgroundColor: `var(--color-${
        variant === 'primary' ? 'primary' : variant === 'secondary' ? 'surface' : 'background'
      })`,
      color:
        variant === 'primary'
          ? 'var(--color-white)'
          : `var(--color-text-${variant === 'secondary' ? 'secondary' : 'primary'})`,
      boxShadow: 'var(--box-shadow)',
    }}
    {...props}
  >
    {children}
  </button>
);

export const NAV_BLUR_CLASSES = {
  scrolled: 'bg-background/80 backdrop-blur-lg',
  transparent: 'bg-transparent',
} as const; 