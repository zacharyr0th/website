import type { Metadata, Viewport } from 'next';

export const SITE_METADATA = {
  title: 'Zachary Tyler Roth - Software Engineer',
  description: 'Software engineer focused on building beautiful, performant, and accessible web applications.',
} satisfies Metadata;

export const SITE_VIEWPORT = {
  width: 'device-width',
  initialScale: 1,
} satisfies Viewport;
