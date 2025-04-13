import type { Viewport } from 'next';

/**
 * Next.js Viewport Configuration
 *
 * This configuration follows Next.js 15.3 best practices for viewport settings.
 * It includes:
 * - Responsive design settings
 * - Theme color for light/dark mode
 * - PWA display settings
 * - iOS viewport settings
 */
export const viewport: Viewport = {
  // Basic responsive design settings
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,

  // Viewport fit for notched devices
  viewportFit: 'cover',

  // iOS specific settings
  // https://webkit.org/blog/7929/designing-websites-for-iphone-x/
  // https://developer.apple.com/documentation/webkit/viewport_meta_tag
  colorScheme: 'dark light',
  interactiveWidget: 'resizes-visual',

  // Theme color with media queries for light/dark mode
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
} as const;
