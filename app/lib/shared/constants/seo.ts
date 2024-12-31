export const SEO_DEFAULTS = {
  titleTemplate: '%s | Zachary Roth',
  defaultTitle: 'Zachary Roth - Technologist, Writer, & Musician',
  defaultDescription:
    'Personal portfolio and blog featuring projects, articles, and audio content.',
  siteUrl: 'https://zacharyr0th.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    site_name: 'Zachary Roth',
  },
  twitter: {
    handle: '@zacharyr0th',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'author',
      content: 'Zachary Roth',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
  ],
} as const;
