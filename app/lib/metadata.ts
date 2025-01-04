import type { Metadata } from 'next'

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
      url: '/profile-picture.webp',
      width: 256,
      height: 256,
      alt: 'Zachary Roth',
      type: 'image/webp',
    },
  },
} as const

// Section metadata with type safety
export const SECTION_METADATA = {
  writing: {
    title: 'Writing',
    description: 'Articles and thoughts on technology, development, and blockchain.',
  },
} as const

// Helper function to create consistent title templates
const createTitleTemplate = (title: string) => ({
  default: CONFIG.site.name,
  template: `${title} | ${CONFIG.site.name}`,
})

// Metadata configuration
export const metadata: Metadata = {
  title: createTitleTemplate('%s'),
  description: CONFIG.site.description,
  metadataBase: new URL(CONFIG.site.url),
  
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

  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  verification: {
    google: 'WV7y_5dT5xmFX0gXGb4iLMr8dGRpsBT70Gp-57wyW_E',
  },
} 