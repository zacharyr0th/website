type SiteMetadata = {
  siteName: string;
  siteUrl: string;
  description: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultImage: string;
  defaultKeywords: string[];
};

export const SITE_METADATA: SiteMetadata = {
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
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#000000',
  viewportFit: 'cover',
  interactiveWidget: 'resizes-visual',
} as const;
