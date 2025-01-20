import type { Metadata, Viewport } from 'next';

// Constants configuration
const CONFIG = {
  site: {
    name: 'Zachary Roth',
    url: 'https://zacharyr0th.com',
    description: 'Personal website of Zachary Roth',
    locale: 'en_US',
    creator: '@zacharyr0th',
  },
  images: {
    profile: {
      url: '/misc/profile-picture.webp',
      width: 256,
      height: 256,
      alt: 'Zachary Roth',
      type: 'image/webp',
    },
  },
} as const;

// Section metadata with type safety
export const SECTION_METADATA = {
  writing: {
    title: 'Writing',
    description: 'Articles and thoughts on technology, development, and blockchain.',
  },
} as const;

// Helper function to create consistent title templates
const createTitleTemplate = (title: string) => ({
  default: CONFIG.site.name,
  template: `${title} | ${CONFIG.site.name}`,
});

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

// Metadata configuration
export const metadata: Metadata = {
  title: {
    template: '%s | Zachary Roth',
    default: 'Zachary Roth',
  },
  description: 'Software Engineer',
  applicationName: 'zacharyr0th.com',
  authors: [{ name: 'Zachary Roth', url: 'https://zacharyr0th.com' }],
  generator: 'Next.js',
  keywords: ['Zachary Roth', 'Software Engineer', 'Developer', 'Engineer', 'Portfolio'],
  referrer: 'origin-when-cross-origin',
  robots: 'index, follow',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  manifest: '/manifest.json',
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Zachary Roth',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover',
  },
  verification: {
    google: 'google',
    other: {
      me: ['https://github.com/zacharyr0th'],
    },
  },
  category: 'technology',
};
