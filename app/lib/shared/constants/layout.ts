import type { Metadata, Viewport } from 'next';

export const LAYOUT = {
  METADATA: {
    title: 'Zachary Roth',
    description: 'Personal website and blog of Zachary Roth',
    keywords: ['blockchain', 'development', 'technology', 'writing'],
  } as Metadata,

  VIEWPORT: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  } as Viewport,

  STYLES: {
    maxWidth: 'max-w-7xl',
    containerPadding: 'px-4 sm:px-6 lg:px-8',
    sectionSpacing: 'py-12 md:py-16 lg:py-20',
    borderRadius: {
      sm: 'var(--border-radius-sm)',
      md: 'var(--border-radius-md)',
      lg: 'var(--border-radius-lg)',
      full: 'var(--border-radius-full)',
    },
  },
} as const;
