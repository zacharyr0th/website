import { ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export interface NavItem {
  label: string;
  href: string;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}
