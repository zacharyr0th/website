import { type ManifestOptions } from '@/types/manifest';

const getSiteUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  return `http://${process.env.DEVELOPMENT_HOST || 'localhost'}:${process.env.DEVELOPMENT_PORT || '3000'}`;
};

export const PROFILE_IMAGE = {
  url: '/misc/profile-picture.webp',
  width: 256,
  height: 256,
  alt: 'Zachary Roth',
  type: 'image/webp',
} as const;

export const SITE_INFO = {
  name: 'Zachary Roth',
  description:
    'Head of Growth at Aptos Labs, focusing on DeFi & AI. Exploring blockchain technology, market strategy, and innovative solutions.',
  url: getSiteUrl(),
  twitterHandle: '@zacharyr0th',
  locale: 'en_US',
  organization: {
    name: 'Aptos Labs',
    url: 'https://aptoslabs.com/',
    logo: 'https://aptoslabs.com/logo.png',
  },
  siteType: 'website' as const,
  defaultLanguage: 'en',
  alternateLanguages: [],
  publishedTime: '2023-01-01T00:00:00.000Z',
  modifiedTime: new Date().toISOString(),
  authorName: 'Zachary Roth',
  contactEmail: 'contact@zacharyroth.com',
  copyright: {
    startYear: 2024,
    currentYear: new Date().getFullYear(),
    holder: 'Zachary Roth',
    rights: 'All Rights Reserved',
  },
  keywords: [
    'Zachary Roth',
    'Blockchain',
    'DeFi',
    'Artificial Intelligence',
    'Growth Strategy',
    'Web3',
    'Aptos Labs',
    'Move Language',
    'Layer 1',
    'Cryptocurrency',
  ],
};

export const MANIFEST: ManifestOptions = {
  name: 'Zachary Roth | Software Engineer',
  shortName: 'zacharyr0th',
  description: 'Full-stack development, tech insights, and creative projects by Zachary Roth',
  startUrl: '/?source=pwa',
  id: 'zacharyr0th-portfolio',
  themeColor: '#3b82f6',
  backgroundColor: '#000000',
  display: 'standalone',
  orientation: 'any',
  scope: '/',
  lang: 'en-US',
  dir: 'ltr',
} as const;

export const FONT_CONFIG = {
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
} as const;

export const CACHE_CONFIG = {
  robots: {
    revalidate: 3600, // 1 hour
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  },
  sitemap: {
    revalidate: 3600, // 1 hour
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  },
  agents: {
    revalidate: 86400, // 24 hours
    headers: {
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=172800',
    },
  },
  markdown: {
    revalidate: 3600, // 1 hour
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  },
} as const;
