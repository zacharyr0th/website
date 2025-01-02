import type { Metadata, Viewport } from 'next';

export const SITE_METADATA: Metadata = {
  title: 'Zachary Tyler Roth - Software Engineer',
  description: 'Software engineer focused on building beautiful, performant, and accessible web applications.',
  keywords: ['software engineer', 'web development', 'react', 'nextjs', 'typescript'],
  openGraph: {
    title: 'Zachary Tyler Roth - Software Engineer',
    description: 'Software engineer focused on building beautiful, performant, and accessible web applications.',
    url: 'https://zacharytylerroth.com',
    siteName: 'Zachary Tyler Roth',
    images: [
      {
        url: '/images/og-image.png',
      },
    ],
    type: 'website',
  },
};

export const SITE_VIEWPORT: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#000000',
  viewportFit: 'cover',
  interactiveWidget: 'resizes-visual',
} as const;
