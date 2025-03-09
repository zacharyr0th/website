import type { Metadata } from 'next';
import { SOCIAL_LINKS, PRIMARY_SOCIAL_PLATFORMS } from './social';

/**
 * Profile Image Configuration
 * 
 * Defines the properties of the profile image used throughout the site
 * for consistent representation in metadata, components, and structured data.
 */
export const PROFILE_IMAGE = {
  url: '/misc/profile-picture.webp',
  width: 256,
  height: 256,
  alt: 'Zachary Roth',
  type: 'image/webp',
} as const;

/**
 * Site Information
 * 
 * Central configuration for the website, used across metadata, sitemap, 
 * robots.txt, and API versioning.
 */
export const SITE_INFO = {
  name: 'Zachary Roth',
  description: 'Head of Growth at Aptos Labs, focusing on DeFi & AI. Exploring blockchain technology, market strategy, and innovative solutions.',
  url: process.env.NEXT_PUBLIC_SITE_URL || `http://${process.env.DEVELOPMENT_HOST || 'localhost'}:${process.env.DEVELOPMENT_PORT || '3000'}`,
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

/**
 * JSON-LD Structured Data
 * 
 * Provides search engines with structured information about the person/entity
 * represented by this website. This improves search result appearance and
 * knowledge graph integration.
 */
export const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_INFO.name,
  jobTitle: 'Head of Growth, DeFi & AI',
  worksFor: {
    '@type': 'Organization',
    name: SITE_INFO.organization.name,
    url: SITE_INFO.organization.url,
  },
  description: SITE_INFO.description,
  image: PROFILE_IMAGE.url,
  url: SITE_INFO.url,
  sameAs: PRIMARY_SOCIAL_PLATFORMS
    .filter(platform => SOCIAL_LINKS[platform].active)
    .map(platform => SOCIAL_LINKS[platform].url),
  knowsAbout: [
    'Blockchain Technology',
    'Decentralized Finance (DeFi)',
    'Artificial Intelligence',
    'Growth Strategy',
    'Web3',
    'Cryptocurrency',
    'Digital Assets',
    'Move Language',
    'Smart Contracts',
    'Layer 1 Blockchains',
  ],
};

/**
 * Breadcrumb Structured Data
 * 
 * Provides search engines with structured information about the site's navigation hierarchy.
 * This improves search result appearance and helps users understand their location within the site.
 */
export const BREADCRUMB_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_INFO.url.endsWith('/') ? SITE_INFO.url : `${SITE_INFO.url}/`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Writing',
      item: `${SITE_INFO.url.endsWith('/') ? SITE_INFO.url : `${SITE_INFO.url}/`}writing/`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Projects',
      item: `${SITE_INFO.url.endsWith('/') ? SITE_INFO.url : `${SITE_INFO.url}/`}projects/`,
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Bio',
      item: `${SITE_INFO.url.endsWith('/') ? SITE_INFO.url : `${SITE_INFO.url}/`}bio/`,
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: 'Audio',
      item: `${SITE_INFO.url.endsWith('/') ? SITE_INFO.url : `${SITE_INFO.url}/`}audio/`,
    },
  ],
};

/**
 * SEO Enhancement Configuration
 * 
 * Provides configuration for various SEO enhancements including schema.org types,
 * canonical URL strategy, and social sharing image dimensions.
 */
export const SEO_ENHANCEMENTS = {
  // Schema.org types to generate for different page types
  schemaTypes: {
    home: ['Person', 'WebSite'],
    writing: ['Blog', 'Article'],
    projects: ['Project', 'SoftwareApplication'],
    bio: ['Person', 'ProfilePage'],
    audio: ['AudioObject', 'PodcastEpisode'],
  },
  
  // Canonical URL strategy
  canonicalStrategy: {
    enforceHttps: true,
    removeTrailingSlash: true,
    lowercaseUrls: true,
  },
  
  // Social sharing image dimensions
  socialImages: {
    twitter: {
      width: 1200,
      height: 675,
    },
    facebook: {
      width: 1200,
      height: 630,
    },
    linkedin: {
      width: 1104,
      height: 736,
    },
  },
} as const;

/**
 * Section Metadata
 * 
 * Provides metadata for each section of the website, including title, description,
 * Open Graph image, and keywords for SEO optimization.
 */
export const SECTION_METADATA = {
  writing: {
    title: `Writing | ${SITE_INFO.name}`,
    description: 'Insights on blockchain technology, DeFi innovations, and market strategy.',
    ogImage: '/images/og/writing-og.webp',
    keywords: ['blockchain articles', 'DeFi insights', 'Web3 writing', 'crypto analysis'],
  },
  projects: {
    title: `Projects | ${SITE_INFO.name}`,
    description: 'Blockchain and DeFi projects, market analysis tools, and ecosystem development initiatives.',
    ogImage: '/images/og/projects-og.webp',
    keywords: ['blockchain projects', 'DeFi tools', 'Web3 development', 'crypto ecosystem'],
  },
  bio: {
    title: `Bio | ${SITE_INFO.name}`,
    description: 'Head of Growth at Aptos Labs, with experience in DeFi, blockchain ecosystems, and market strategy.',
    ogImage: '/images/og/bio-og.webp',
    keywords: ['blockchain professional', 'DeFi expert', 'Web3 growth', 'Aptos Labs'],
  },
  audio: {
    title: `Audio | ${SITE_INFO.name}`,
    description: 'Podcasts, interviews, and audio content on blockchain technology and market strategy.',
    ogImage: '/images/og/audio-og.webp',
    keywords: ['blockchain podcasts', 'DeFi interviews', 'Web3 audio', 'crypto discussions'],
  },
} as const;

/**
 * Route Configurations
 * 
 * Used for sitemap.ts, robots.txt, and SEO enhancements.
 */
export const ROUTES = {
  // Static routes with priorities and change frequencies for sitemap.ts
  static: [
    { route: '', priority: 1.0, changeFrequency: 'daily', isSecure: false },
    { route: '/writing', priority: 0.9, changeFrequency: 'daily', isSecure: false },
    { route: '/projects', priority: 0.8, changeFrequency: 'daily', isSecure: false },
    { route: '/audio', priority: 0.8, changeFrequency: 'daily', isSecure: false },
    { route: '/audio/archive', priority: 0.7, changeFrequency: 'weekly', isSecure: false },
    { route: '/bio', priority: 0.8, changeFrequency: 'monthly', isSecure: false },
  ] as const,
  
  // Resource routes for sitemap.ts
  resources: [
    { route: '/manifest.json', priority: 0.4, changeFrequency: 'monthly', isSecure: false },
    { route: '/api/public/robots', priority: 0.4, changeFrequency: 'monthly', isSecure: false },
    { route: '/api/public/sitemap', priority: 0.4, changeFrequency: 'monthly', isSecure: false },
    { route: '/.well-known/security.txt', priority: 0.4, changeFrequency: 'monthly', isSecure: false },
    { route: '/api/public/agents', priority: 0.4, changeFrequency: 'monthly', isSecure: false },
    { route: '/rss.xml', priority: 0.5, changeFrequency: 'daily', isSecure: false },
  ] as const,
  
  // Allowed paths for robots.txt
  allowedPaths: [
    '/',
    '/writing/',
    '/projects/',
    '/bio/',
    '/audio/',
    '/api/public/sitemap',
    '/api/public/agents',
    '/manifest.json',
    '/.well-known/*',
    '/rss.xml',
  ] as const,
  
  // Asset patterns for robots.txt
  assetPatterns: [
    '/*.json',
    '/images/*.{jpg,jpeg,png,gif,webp,avif}',
    '/fonts/*.{woff,woff2}',
    '/api/public/*',
    '/assets/*',
  ] as const,
  
  // Public API paths that are allowed for bots
  publicApiPaths: [
    '/api/public/articles',
    '/api/public/projects',
    '/api/public/audio',
    '/api/public/agents',
    '/api/public/robots',
    '/api/public/sitemap',
  ] as const,
} as const;

/**
 * Bot Configuration
 * 
 * Used for robots.txt generation to control crawler behavior.
 */
export const BOT_CONFIG = {
  general: {
    userAgent: '*',
    crawlDelay: 1,
  },
  googlebot: {
    userAgent: 'Googlebot',
    crawlDelay: 0.5,
  },
  gptbot: {
    userAgent: 'GPTBot',
    crawlDelay: 2,
  },
  bingbot: {
    userAgent: 'Bingbot',
    crawlDelay: 1,
  },
  otherBots: {
    userAgent: ['Yandexbot', 'Baiduspider', 'DuckDuckBot'],
    crawlDelay: 2,
  },
  securityScanners: {
    userAgent: ['*-bot', '*-spider', '*-crawler', 'scanner', 'burp'],
    crawlDelay: 10,
  },
} as const;

/**
 * Next.js Metadata Configuration
 * 
 * This metadata is used by Next.js to generate the <head> section of the HTML document.
 * It provides SEO metadata, Open Graph tags, Twitter cards, and other metadata.
 */
export const metadata: Metadata = {
  title: {
    default: SITE_INFO.name,
    template: `%s | ${SITE_INFO.name}`,
  },
  description: SITE_INFO.description,
  applicationName: SITE_INFO.name,
  authors: [{ name: SITE_INFO.authorName, url: SITE_INFO.url }],
  generator: 'Next.js',
  keywords: SITE_INFO.keywords,
  creator: SITE_INFO.authorName,
  publisher: SITE_INFO.authorName,
  metadataBase: new URL(SITE_INFO.url),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  
  openGraph: {
    type: SITE_INFO.siteType,
    locale: SITE_INFO.locale,
    url: SITE_INFO.url,
    title: SITE_INFO.name,
    description: SITE_INFO.description,
    siteName: SITE_INFO.name,
    images: [
      {
        url: PROFILE_IMAGE.url,
        width: PROFILE_IMAGE.width,
        height: PROFILE_IMAGE.height,
        alt: PROFILE_IMAGE.alt,
      },
    ],
  },
  
  twitter: {
    card: 'summary',
    title: SITE_INFO.name,
    description: SITE_INFO.description,
    creator: SITE_INFO.twitterHandle,
    images: [PROFILE_IMAGE.url],
  },
  
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
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
  
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    // bing is not directly supported in the Metadata type
    // Use the 'other' field for additional verification codes
  },
  
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  
  manifest: '/manifest.json',
  
  category: 'technology',
  
  // Store the publish/modified times in the other field since they're not valid for website type
  other: {
    'og:published_time': SITE_INFO.publishedTime,
    'og:modified_time': SITE_INFO.modifiedTime,
  },
};
