import { FaSun, FaMoon } from 'react-icons/fa';
import type { ThemeColors } from '@/app/lib/types';
import type { IconType } from 'react-icons';

export const THEMES = ['light', 'dark'] as const;

export const THEME_ICONS: Record<(typeof THEMES)[number], IconType> = {
  light: FaSun,
  dark: FaMoon,
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

export const COLORS: ThemeColors = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  accent: 'var(--color-accent)',
  background: 'var(--color-background)',
  surface: 'var(--color-surface)',
  muted: 'var(--color-muted)',
  subtle: 'var(--color-subtle)',
  privvy: 'var(--color-privvy)',
  text: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
  },
  status: {
    error: 'var(--color-error)',
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    info: 'var(--color-info)',
  },
} as const;

export const TRANSITIONS = {
  default: 'all var(--transition-speed) ease-in-out',
  fast: 'all calc(var(--transition-speed) * 0.5) ease-in-out',
  slow: 'all calc(var(--transition-speed) * 1.5) ease-in-out',
} as const;

export const EFFECTS = {
  boxShadow: 'var(--box-shadow)',
  hover: {
    scale: 'transform: scale(1.05)',
    lift: 'transform: translateY(-2px)',
  },
} as const;
