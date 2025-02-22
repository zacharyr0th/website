import { Source_Sans_3, Fira_Code } from 'next/font/google';

// Configure Fira Code for headings and code with coding ligatures
export const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-fira',
  fallback: ['Consolas', 'Monaco', 'Courier New', 'monospace'],
  preload: true,
  adjustFontFallback: true,
  // Enable coding ligatures and features
  style: ['normal'],
});

// Configure Source Sans Pro for body text
export const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-source',
  preload: true,
  adjustFontFallback: true,
  style: ['normal', 'italic'],
});

// Export font CSS variables
export const fontVariables = {
  mono: '--font-fira',
  sans: '--font-source',
} as const;

// Export font family utilities
export const fontFamilies = {
  mono: 'var(--font-fira)',
  sans: 'var(--font-source)',
} as const;

// Export font feature settings for use in CSS
export const fontFeatures = {
  base: "'liga' 1, 'kern' 1, 'calt' 1",
  tabular: "'tnum' 1",
  code: "'ss01' 1, 'zero' 1, 'calt' 1",
} as const;
