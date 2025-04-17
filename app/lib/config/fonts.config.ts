import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export const fonts = {
  sans: {
    ...GeistSans,
    display: 'swap',
    preload: true,
    fallback: ['system-ui', 'sans-serif'],
  },
  mono: {
    ...GeistMono,
    display: 'swap',
    preload: true,
    fallback: ['ui-monospace', 'monospace'],
  },
} as const;
