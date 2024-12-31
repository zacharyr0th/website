export const SITE_METADATA = {
  siteName: 'Zachary Tyler Roth',
  siteUrl: 'https://zacharytylerroth.com',
  description: 'Personal website and portfolio of Zachary Tyler Roth',
  defaultTitle: 'Zachary Tyler Roth - Software Engineer',
  defaultDescription:
    'Software engineer focused on building beautiful, performant, and accessible web applications.',
  defaultImage: '/images/og-image.png',
  defaultKeywords: ['software engineer', 'web development', 'react', 'nextjs', 'typescript'],
} as const;

export const SITE_VIEWPORT = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
} as const;

export const LAYOUT = {
  // Navigation
  headerHeight: '64px',
  footerHeight: '64px',
  maxWidth: '1200px',

  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;
