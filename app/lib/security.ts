/**
 * Security Configuration
 *
 * Contains security-related constants and patterns
 */

export const SECURITY = {
  // Pattern for sensitive routes that should not be included in sitemap
  sensitiveRoutePattern: /^\/(?:admin|dashboard|account|api|auth)/i,

  // CSRF protection settings
  csrf: {
    cookieName: 'csrf',
    headerName: 'X-CSRF-Token',
    expirySeconds: 3600, // 1 hour
  },

  // Rate limiting settings
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // limit each IP to 100 requests per windowMs
  },

  // Patterns for robots.txt
  sensitivePathPatterns: [
    '/api/private/*',
    '/api/auth/*',
    '/api/admin/*',
    '/admin/*',
    '/dashboard/*',
    '/account/*',
  ],

  // Common patterns to disallow for all bots
  commonDisallowPatterns: ['/*.json', '/*.xml', '/api/draft/*', '/api/preview/*'],
};
