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
  title: createTitleTemplate('%s'),
  description: CONFIG.site.description,
  metadataBase: new URL(CONFIG.site.url),
  manifest: '/manifest.json',
  
  icons: {
    icon: [
      { url: '/misc/favicon.ico', sizes: '48x48' },
      { url: '/misc/favicon.ico', sizes: '32x32' },
      { url: '/misc/favicon.ico', sizes: '16x16' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: CONFIG.site.name,
  },

  openGraph: {
    type: 'website',
    locale: CONFIG.site.locale,
    url: CONFIG.site.url,
    siteName: CONFIG.site.name,
    title: createTitleTemplate('%s'),
    description: CONFIG.site.description,
    images: [CONFIG.images.profile],
  },

  twitter: {
    card: 'summary',
    title: createTitleTemplate('%s'),
    description: CONFIG.site.description,
    creator: CONFIG.site.creator,
    images: [CONFIG.images.profile],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
