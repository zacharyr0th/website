import type { MetadataRoute } from 'next';

// Force static generation for better performance
export const dynamic = 'force-static';

// Define common paths aligned with middleware security patterns
const ALLOWED_PATHS = [
  '/',
  '/writing/',
  '/projects/',
  '/bio/',
  '/audio/',
  '/sitemap.xml',
  '/agents.json',
  '/manifest.json',
  '/.well-known/*',
] as const;

const COMMON_DISALLOW = [
  '/_next/*',
  '/scripts/*',
  '/api/private/*',
  '/api/auth/*',
  '/api/admin/*',
  '/api/protected/*',
  '/api/analytics/*',
  '/api/internal/*',
] as const;

const SENSITIVE_PATHS = [
  '/api/draft/*',
  '/*.env*',
  '/scripts/',
  '/node_modules/',
  '/.git/',
  '/tmp/',
  '/*.log',
  '/_next/static/development/*',
  '/_next/static/chunks/*',
  '/_next/static/css/*',
  '/_next/static/media/*',
] as const;

const ASSET_PATTERNS = [
  '/*.json',
  '/images/*.{jpg,jpeg,png,gif,webp,avif}',
  '/fonts/*.{woff,woff2}',
  '/api/public/*',
] as const;

const PUBLIC_API_PATHS = ['/api/public/*', '/api/webhooks/*'] as const;

// Type for user agents matching MetadataRoute.Robots requirements
type UserAgentConfig = {
  userAgent: string | string[];
  allow?: string | string[];
  disallow?: string | string[];
  crawlDelay?: number;
};

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    `http://${process.env.DEVELOPMENT_HOST || 'localhost'}:${process.env.DEVELOPMENT_PORT || '3000'}`;

  // Define bot-specific configurations with security considerations
  const botConfigs: UserAgentConfig[] = [
    {
      userAgent: '*',
      allow: [...ALLOWED_PATHS, ...ASSET_PATTERNS],
      disallow: [...SENSITIVE_PATHS, ...COMMON_DISALLOW],
      crawlDelay: 1,
    },
    {
      userAgent: 'Googlebot',
      allow: [...ALLOWED_PATHS, '/manifest.json'],
      disallow: [...COMMON_DISALLOW],
      crawlDelay: 0.5,
    },
    {
      userAgent: 'GPTBot',
      allow: [...ALLOWED_PATHS, '/agents.json', ...PUBLIC_API_PATHS],
      disallow: [...COMMON_DISALLOW, '/api/private/*', '/api/draft/*'],
      crawlDelay: 2,
    },
    {
      userAgent: 'Bingbot',
      allow: [...ALLOWED_PATHS, '/agents.json'],
      disallow: [...COMMON_DISALLOW],
      crawlDelay: 1,
    },
    {
      userAgent: ['Yandexbot', 'Baiduspider', 'DuckDuckBot'],
      allow: [...ALLOWED_PATHS],
      disallow: [...COMMON_DISALLOW, '/agents.json', ...PUBLIC_API_PATHS],
      crawlDelay: 2,
    },
    // Security scanners and potentially harmful bots
    {
      userAgent: ['*-bot', '*-spider', '*-crawler', 'scanner', 'burp'],
      disallow: ['/', '/api/*'],
      crawlDelay: 10,
    },
  ];

  return {
    rules: botConfigs,
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
