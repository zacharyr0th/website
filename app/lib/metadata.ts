import type { Metadata } from 'next';

// Site configuration
const SITE_NAME = 'Zachary Roth';
const SITE_URL = 'https://zacharyr0th.com';
const SITE_DESCRIPTION = 'Personal website of Zachary Roth';
const TWITTER_HANDLE = '@zacharyr0th';

// Profile image configuration
const PROFILE_IMAGE = {
  url: '/profile-picture.webp',
  width: 256,
  height: 256,
  alt: 'Zachary Roth',
  type: 'image/webp',
} as const;

// Section metadata
export const SECTION_METADATA = {
  writing: {
    title: 'Writing',
    description: 'Articles and thoughts on technology, development, and blockchain.',
  },
} as const;

// Base metadata configuration
export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [PROFILE_IMAGE],
  },

  twitter: {
    card: 'summary',
    creator: TWITTER_HANDLE,
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

  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/assets/icons/icon-192.webp', sizes: '192x192' }
    ],
    shortcut: '/assets/icons/icon-192.webp',
    apple: '/assets/icons/apple-touch-icon.png',
  },
};
