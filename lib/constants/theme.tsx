import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeColors } from '../types';

export const THEMES = ['light', 'dark'] as const;
export const THEME_ICONS = {
  light: <FaSun />,
  dark: <FaMoon />,
} as const;

export const LAYOUT = {
  maxWidth: 'max-w-7xl',
  containerPadding: 'px-4 sm:px-6 lg:px-8',
  sectionSpacing: 'py-12 md:py-16 lg:py-20',
  borderRadius: {
    sm: 'var(--border-radius-sm)',
    md: 'var(--border-radius-md)',
    lg: 'var(--border-radius-lg)',
    full: 'var(--border-radius-full)',
  },
} as const;

export const MEDIA_QUERIES = {
  sm: `(min-width: ${CONFIG.breakpoints.sm}px)`,
  md: `(min-width: ${CONFIG.breakpoints.md}px)`,
  lg: `(min-width: ${CONFIG.breakpoints.lg}px)`,
  xl: `(min-width: ${CONFIG.breakpoints.xl}px)`,
} as const;

export const ANIMATIONS = {
  fadeIn: 'animate-fadeIn',
  slideIn: 'animate-slideIn',
  transition: 'transition-all duration-300',
} as const;

export const NAV_BLUR_CLASSES = {
  scrolled: 'bg-background/80 backdrop-blur-lg',
  transparent: 'bg-transparent',
} as const;

export const COLORS: ThemeColors = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  accent: 'var(--color-accent)',
  background: 'var(--color-background)',
  surface: 'var(--color-surface)',
  muted: 'var(--color-muted)',
  subtle: 'var(--color-subtle)',
  privvy: 'var(--color-privvy)',
} as const;

export const getTextColor = (backgroundColor: string): string => {
  const lightColors = [
    'var(--color-background)',
    'var(--color-surface)',
    'var(--color-muted)',
    'var(--color-subtle)',
    'var(--color-privvy)',
  ];

  const mediumColors = ['var(--color-border)', 'var(--color-input)'];

  if (lightColors.includes(backgroundColor)) {
    return 'text-gray-900 dark:text-gray-100';
  } else if (mediumColors.includes(backgroundColor)) {
    return 'text-gray-100 dark:text-gray-900';
  } else {
    return 'text-gray-100';
  }
}; 