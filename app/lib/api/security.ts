/**
 * Security Configuration
 *
 * Enhanced security configuration with:
 * - Strong type safety
 * - Pattern validation
 * - Security best practices
 * - Rate limiting utilities
 */

// Type definitions
export type SecurityPattern = RegExp;
export type CsrfConfig = {
  readonly cookieName: string;
  readonly headerName: string;
  readonly expirySeconds: number;
};

export type RateLimitConfig = {
  readonly windowMs: number;
  readonly maxRequests: number;
  readonly message?: string;
};

// Security patterns with validation
function validatePattern(pattern: string): SecurityPattern {
  try {
    return new RegExp(pattern.replace(/\*/g, '.*'), 'i');
  } catch (error) {
    throw new Error(`Invalid security pattern: ${pattern}`);
  }
}

// Rate limit window constants
const RATE_LIMIT = {
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
} as const;

export const SECURITY = {
  // Pattern for sensitive routes that should not be included in sitemap
  sensitiveRoutePattern: validatePattern('^/(?:admin|dashboard|account|api|auth)'),

  // CSRF protection settings with secure defaults
  csrf: {
    cookieName: '__Host-csrf', // Using __Host- prefix for enhanced security
    headerName: 'X-CSRF-Token',
    expirySeconds: 3600, // 1 hour
  } as const satisfies CsrfConfig,

  // Rate limiting settings with different tiers
  rateLimit: {
    // Default rate limit
    default: {
      windowMs: 15 * RATE_LIMIT.MINUTE, // 15 minutes
      maxRequests: 100, // limit each IP to 100 requests per windowMs
      message: 'Too many requests, please try again later',
    } as const satisfies RateLimitConfig,

    // Strict rate limit for authentication endpoints
    auth: {
      windowMs: RATE_LIMIT.HOUR, // 1 hour
      maxRequests: 5, // 5 attempts per hour
      message: 'Too many authentication attempts, please try again later',
    } as const satisfies RateLimitConfig,

    // API rate limit
    api: {
      windowMs: RATE_LIMIT.MINUTE, // 1 minute
      maxRequests: 60, // 60 requests per minute
      message: 'API rate limit exceeded',
    } as const satisfies RateLimitConfig,
  },

  // Patterns for robots.txt with validation
  sensitivePathPatterns: [
    '/api/private/*',
    '/api/auth/*',
    '/api/admin/*',
    '/admin/*',
    '/dashboard/*',
    '/account/*',
  ].map((pattern) => validatePattern(pattern)),

  // Common patterns to disallow for all bots
  commonDisallowPatterns: ['/*.json', '/*.xml', '/api/draft/*', '/api/preview/*'].map((pattern) =>
    validatePattern(pattern)
  ),

  // Security headers
  headers: {
    // Content Security Policy
    csp: {
      'default-src': ["'self'"],
      'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      'style-src': ["'self'", "'unsafe-inline'"],
      'img-src': ["'self'", 'data:', 'https:'],
      'font-src': ["'self'"],
      'connect-src': ["'self'", 'https:'],
      'frame-ancestors': ["'none'"],
      'form-action': ["'self'"],
    } as const,

    // Other security headers
    general: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    } as const,
  },

  // Helper functions
  isSecurePath(path: string): boolean {
    return this.sensitiveRoutePattern.test(path);
  },

  isDisallowedForBots(path: string): boolean {
    return [...this.sensitivePathPatterns, ...this.commonDisallowPatterns].some((pattern) =>
      pattern.test(path)
    );
  },

  // Generate CSP header string
  getCSPHeader(): string {
    return Object.entries(this.headers.csp)
      .map(([key, values]) => `${key} ${values.join(' ')}`)
      .join('; ');
  },

  // Get all security headers
  getSecurityHeaders(): Record<string, string> {
    return {
      ...this.headers.general,
      'Content-Security-Policy': this.getCSPHeader(),
    };
  },
} as const;
