import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/writing/',
          '/projects/',
          '/bio/',
          '/audio/',
          '/sitemap.xml',
          '/agents.json',
          '/*.json',
          '/images/*.{jpg,jpeg,png,gif,webp,avif}',
          '/fonts/*.{woff,woff2}',
          '/api/public/*',
          '/manifest.json',
        ],
        disallow: [
          '/api/private/',
          '/_next/static/development/',
          '/api/draft/*',
          '/*.env*',
          '/scripts/',
          '/node_modules/',
          '/.git/',
          '/tmp/',
          '/*.log',
          '/_next/static/chunks/*',
          '/_next/static/css/*',
          '/_next/static/media/*',
          '/api/auth/*',
          '/api/analytics/*',
          '/api/internal/*',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/writing/',
          '/projects/',
          '/bio/',
          '/audio/',
          '/sitemap.xml',
          '/manifest.json',
        ],
        disallow: [
          '/api/*',
          '/_next/*',
          '/scripts/*',
        ],
        crawlDelay: 0.5,
      },
      {
        userAgent: 'GPTBot',
        allow: [
          '/',
          '/writing/',
          '/projects/',
          '/bio/',
          '/audio/',
          '/agents.json',
          '/api/public/*',
        ],
        disallow: [
          '/api/private/',
          '/api/draft/*',
          '/_next/*',
          '/scripts/*',
        ],
        crawlDelay: 2,
      },
      {
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/writing/',
          '/projects/',
          '/bio/',
          '/audio/',
          '/agents.json',
        ],
        disallow: [
          '/api/*',
          '/_next/*',
          '/scripts/*',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: ['Yandexbot', 'Baiduspider', 'DuckDuckBot'],
        allow: [
          '/',
          '/writing/',
          '/projects/',
          '/bio/',
          '/audio/',
        ],
        disallow: [
          '/api/*',
          '/_next/*',
          '/scripts/*',
          '/agents.json',
        ],
        crawlDelay: 2,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
} 