import { type ManifestOptions } from '@/types/manifest';

export const PROFILE_IMAGE = {
  url: '/misc/profile-picture.webp',
  width: 256,
  height: 256,
  alt: 'Zachary Roth',
  type: 'image/webp',
} as const;

// Site keywords
export const SITE_KEYWORDS = [
  'blockchain',
  'cryptocurrency',
  'DeFi',
  'Web3',
  'Aptos',
  'Move',
  'growth strategy',
  'market analysis',
];

export const SITE_INFO = {
  name: 'Zachary Tyler Roth',
  description: 'Thoughts on blockchain, DeFi, and market strategy.',
  url: 'https://zacharyr0th.com',
  twitterHandle: '@zacharyr0th',
  locale: 'en-US',
  organization: {
    name: 'Aptos Labs',
    url: 'https://aptoslabs.com',
    logo: 'https://aptoslabs.com/images/aptos_word_dark.svg',
  },
  siteType: 'website' as const,
  defaultLanguage: 'en-US',
  alternateLanguages: [],
  authorName: 'Zachary Tyler Roth',
  publishedTime: '2024-01-01T00:00:00.000Z',
  modifiedTime: '2024-03-19T00:00:00.000Z',
  keywords: SITE_KEYWORDS,
  defaultOgImage: '/images/og/default-og.webp', // Default Open Graph image
} as const satisfies Record<string, unknown>;

export const MANIFEST: ManifestOptions = {
  name: 'Zachary Roth | Software Engineer',
  shortName: 'zacharyr0th',
  description: 'Full-stack development, thoughtful insights, and creative projects by Zachary Roth',
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
