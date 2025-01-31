import type { MetadataRoute } from 'next';

/**
 * Configuration for robots.txt and agent accessibility
 * Optimized for both traditional web crawlers and AI agents
 */
const ROBOTS_CONFIG = {
  baseUrl: 'https://www.zacharyr0th.com',
  defaultRules: [
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
        '/api/public/*'
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
        '/*.log'
      ],
      crawlDelay: 0.1
    },
    {
      // Special rules for AI agents
      userAgent: 'GPTBot',
      allow: [
        '/',
        '/writing/',
        '/projects/',
        '/bio/',
        '/audio/',
        '/agents.json',
        '/api/public/*'
      ],
      disallow: [
        '/api/private/',
        '/api/draft/*',
        '/_next/*'
      ],
      crawlDelay: 0.5
    },
    {
      // Bing/Microsoft AI bot
      userAgent: 'Bingbot',
      allow: [
        '/',
        '/writing/',
        '/projects/',
        '/bio/',
        '/audio/',
        '/agents.json'
      ],
      disallow: [
        '/api/*',
        '/_next/*'
      ],
      crawlDelay: 0.5
    }
  ],
  sitemapUrl: 'sitemap.xml',
  headers: {
    'Cache-Control': 'public, max-age=3600',
    'X-Robots-Tag': 'all'
  }
};

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate hourly

/**
 * Generates the robots.txt configuration optimized for both traditional crawlers and AI agents
 * Features:
 * - Specific rules for different user agents
 * - Optimized crawl delays
 * - Clear allow/disallow patterns
 * - Cache control headers
 * - Regular revalidation
 * 
 * @returns {MetadataRoute.Robots} The optimized robots.txt configuration
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: ROBOTS_CONFIG.defaultRules,
    sitemap: `${ROBOTS_CONFIG.baseUrl}/${ROBOTS_CONFIG.sitemapUrl}`,
    host: ROBOTS_CONFIG.baseUrl,
  };
}
