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
    { route: '/projects', priority: 0.8, changeFrequency: 'weekly', isSecure: false },
    { route: '/audio', priority: 0.8, changeFrequency: 'daily', isSecure: false },
    { route: '/audio/archive', priority: 0.7, changeFrequency: 'weekly', isSecure: false },
    { route: '/bio', priority: 0.8, changeFrequency: 'monthly', isSecure: false },
  ] as const,

  // Dynamic routes for sitemap generation
  dynamic: {
    articles: '/api/public/articles',
    projects: '/api/public/projects',
    audio: '/api/public/audio',
  } as const,

  // Resource routes for sitemap.ts
  resources: [
    { route: '/manifest.json', priority: 0.4, changeFrequency: 'monthly', isSecure: false },
    { route: '/api/public/robots', priority: 0.4, changeFrequency: 'monthly', isSecure: false },
    { route: '/api/public/sitemap', priority: 0.4, changeFrequency: 'monthly', isSecure: false },
    {
      route: '/.well-known/security.txt',
      priority: 0.4,
      changeFrequency: 'monthly',
      isSecure: false,
    },
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
    userAgent: ['*-bot', '*-spider', '*-crawler', 'scanner', 'burp', 'sqlmap', 'nmap', 'nikto'],
    crawlDelay: 10,
  },
} as const;

/**
 * Security patterns for robots.txt
 */
export const SECURITY = {
  sensitivePathPatterns: [
    '/api/private/*',
    '/api/auth/*',
    '/api/draft/*',
    '/admin/*',
    '/.env*',
    '/.git*',
    '/node_modules/*',
  ],
  commonDisallowPatterns: [
    '/*.json', // Block direct access to JSON files
    '/*.config.*', // Block access to config files
    '/api/internal/*', // Block internal APIs
    '/api/debug/*', // Block debug endpoints
    '/tmp/*', // Block temp directories
    '/test/*', // Block test directories
    '/coverage/*', // Block coverage reports
    '/favicon.*', // Block favicon files
    '/icons/*', // Block icon directory
  ],
} as const;
