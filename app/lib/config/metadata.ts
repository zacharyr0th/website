import type { Metadata } from 'next';

// Site configuration
const SITE_NAME = 'Zachary Roth';
const SITE_URL = 'https://zacharyr0th.com';
const SITE_DESCRIPTION =
  'Head of Growth at Aptos Labs, focusing on DeFi & AI. Exploring blockchain technology, market strategy, and innovative solutions.';
const TWITTER_HANDLE = '@zacharyr0th';

// Profile image configuration
const PROFILE_IMAGE = {
  url: '/misc/profile-picture.webp',
  width: 256,
  height: 256,
  alt: 'Zachary Roth',
  type: 'image/webp',
} as const;

// Section metadata
export const SECTION_METADATA = {
  writing: {
    title: 'Writing | Zachary Roth',
    description: 'Insights on blockchain technology, DeFi innovations, and market strategy.',
  },
  projects: {
    title: 'Projects | Zachary Roth',
    description:
      'Blockchain and DeFi projects, market analysis tools, and ecosystem development initiatives.',
  },
  bio: {
    title: 'Bio | Zachary Roth',
    description:
      'Head of Growth at Aptos Labs, with experience in DeFi, blockchain ecosystems, and market strategy.',
  },
} as const;

// JSON-LD Structured Data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Zachary Roth',
  jobTitle: 'Head of Growth, DeFi & AI',
  worksFor: {
    '@type': 'Organization',
    name: 'Aptos Labs',
    url: 'https://aptoslabs.com/',
  },
  description: SITE_DESCRIPTION,
  image: PROFILE_IMAGE.url,
  url: SITE_URL,
  sameAs: [
    'https://twitter.com/zacharyr0th',
    'https://github.com/zacharyroth',
    'https://linkedin.com/in/zacharyroth',
  ],
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
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [PROFILE_IMAGE],
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
      { url: '/assets/icons/icon-192.webp', sizes: '192x192' },
    ],
    shortcut: '/assets/icons/icon-192.webp',
    apple: '/assets/icons/apple-touch-icon.png',
  },

  alternates: {
    canonical: SITE_URL,
  },

  verification: {
    google: 'your-google-site-verification',
  },

  other: {
    'msapplication-TileColor': '#000000',
    'theme-color': '#000000',
  },
};

// Export structured data for use in pages
export const getStructuredData = () => structuredData;
