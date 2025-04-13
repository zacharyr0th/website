import { type Metadata } from 'next';
import { PROFILE_IMAGE, SITE_INFO } from './site.config';
import { SOCIAL_LINKS, PRIMARY_SOCIAL_PLATFORMS } from '@/lib/social';

/**
 * SEO Configuration
 * Centralized configuration for all SEO-related settings including
 * metadata, structured data, and section-specific enhancements.
 */

// Core metadata configuration
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
    canonical: SITE_INFO.url.endsWith('/') ? SITE_INFO.url : `${SITE_INFO.url}/`,
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
    card: 'summary_large_image',
    title: SITE_INFO.name,
    description: SITE_INFO.description,
    creator: SITE_INFO.twitterHandle,
    images: [PROFILE_IMAGE.url],
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
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg' }],
  },
  manifest: '/manifest.json',
  category: 'technology',
} as const;

// SEO Enhancements
export const SEO_ENHANCEMENTS = {
  schemaTypes: {
    home: ['Person', 'WebSite'],
    writing: ['Blog', 'Article'],
    projects: ['Project', 'SoftwareApplication'],
    bio: ['Person', 'ProfilePage'],
    audio: ['AudioObject', 'PodcastEpisode'],
  },
  canonicalStrategy: {
    enforceHttps: true,
    removeTrailingSlash: true,
    lowercaseUrls: true,
  },
  socialImages: {
    twitter: { width: 1200, height: 675 },
    facebook: { width: 1200, height: 630 },
    linkedin: { width: 1104, height: 736 },
  },
} as const;

// Section-specific metadata
export const SECTION_METADATA = {
  writing: {
    title: `Writing | ${SITE_INFO.name}`,
    description: 'Insights on blockchain technology, DeFi innovations, and market strategy.',
    ogImage: '/images/og/writing-og.webp',
    keywords: ['blockchain articles', 'DeFi insights', 'Web3 writing', 'crypto analysis'],
    openGraph: {
      type: 'article',
      publishedTime: SITE_INFO.publishedTime,
      modifiedTime: SITE_INFO.modifiedTime,
      authors: [SITE_INFO.url + '/bio'],
      tags: ['blockchain', 'defi', 'web3', 'cryptocurrency', 'artificial intelligence'],
      section: 'Technology',
    },
  },
  projects: {
    title: `Projects | ${SITE_INFO.name}`,
    description:
      'Blockchain and DeFi projects, market analysis tools, and ecosystem development initiatives.',
    ogImage: '/images/og/projects-og.webp',
    keywords: ['blockchain projects', 'DeFi tools', 'Web3 development', 'crypto ecosystem'],
  },
  bio: {
    title: `Bio | ${SITE_INFO.name}`,
    description:
      'Head of Growth at Aptos Labs, with experience in DeFi, blockchain ecosystems, and market strategy.',
    ogImage: '/images/og/bio-og.webp',
    keywords: ['blockchain professional', 'DeFi expert', 'Web3 growth', 'Aptos Labs'],
  },
  audio: {
    title: `Audio | ${SITE_INFO.name}`,
    description:
      'Podcasts, interviews, and audio content on blockchain technology and market strategy.',
    ogImage: '/images/og/audio-og.webp',
    keywords: ['blockchain podcasts', 'DeFi interviews', 'Web3 audio', 'crypto discussions'],
  },
} as const;

// Structured Data
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
  sameAs: PRIMARY_SOCIAL_PLATFORMS.filter((platform) => SOCIAL_LINKS[platform].active).map(
    (platform) => SOCIAL_LINKS[platform].url
  ),
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
} as const;

// Website structured data
export const WEBSITE_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_INFO.name,
  url: SITE_INFO.url,
  description: SITE_INFO.description,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_INFO.url}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
  author: {
    '@type': 'Person',
    name: SITE_INFO.authorName,
    url: SITE_INFO.url,
  },
  creator: {
    '@type': 'Person',
    name: SITE_INFO.authorName,
  },
  publisher: {
    '@type': 'Person',
    name: SITE_INFO.authorName,
  },
  inLanguage: SITE_INFO.defaultLanguage,
  copyrightYear: new Date().getFullYear(),
  dateModified: SITE_INFO.modifiedTime,
  datePublished: SITE_INFO.publishedTime,
} as const;

// Breadcrumb Navigation
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
} as const;
