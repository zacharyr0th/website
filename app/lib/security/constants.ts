/**
 * Security Constants
 */

// Core route patterns
export const PATTERNS = {
  STATIC: /^[a-zA-Z0-9_-]+\.(jpg|jpeg|gif|png|webp|svg|css|js|woff2?|ico|txt|xml)$/i,
  API: /^\/api\//,
  SENSITIVE: /^\/api\/(auth|admin|protected)/,
} as const;

// Valid content types
export const VALID_CONTENT_TYPES = new Set([
  'application/json',
  'application/x-www-form-urlencoded',
  'multipart/form-data',
  'text/plain',
]);

// Common security headers
export const COMMON_SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
} as const;

// Allowed HTTP methods
export const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const;

// Rate limiting configuration
export const RATE_LIMIT_CONFIG = {
  STANDARD: {
    requests: 200,
    duration: '15m',
    backoff: (attempts: number) => Math.min(Math.pow(2, attempts) * 1000, 30000),
  },
  SENSITIVE: {
    requests: 50,
    duration: '15m',
    backoff: (attempts: number) => Math.min(Math.pow(2, attempts) * 2000, 60000),
  },
  BRUTE_FORCE: {
    requests: 5,
    duration: '5m',
    backoff: (attempts: number) => Math.min(Math.pow(2, attempts) * 5000, 300000),
  },
} as const;

// Cache control directives
export const CACHE_CONTROL = {
  STATIC: 'public, max-age=31536000, immutable',
  DYNAMIC: 'public, max-age=3600, stale-while-revalidate=86400',
  PRIVATE: 'private, no-cache, no-store, must-revalidate',
} as const;

// Security settings
export const SECURITY_SETTINGS = {
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(',') || ['*'],
  MAX_REQUEST_SIZE: 1024 * 1024, // 1MB
  CSP_CACHE_SIZE: 100,
} as const;

// Performance monitoring configuration
export const PERFORMANCE_CONFIG = {
  MAX_LAG: 100,
  CHECK_INTERVAL: 500,
  SAMPLING_RATE: 0.1,
  HIGH_LOAD_THRESHOLD: 0.8,
  CIRCUIT_BREAKER: {
    FAILURE_THRESHOLD: 5,
    RESET_TIMEOUT: 30000,
    HALF_OPEN_REQUESTS: 3,
  },
} as const;

export const ROUTE_RATE_LIMITS = {
  AUDIO: {
    SIGN_URL: {
      windowMs: 60 * 1000, // 1 minute
      max: 30,
      message: 'Too many URL signing requests, please try again later',
    },
    STREAM: {
      windowMs: 60 * 1000,
      max: 20,
      message: 'Too many streaming requests, please try again later',
    },
  },
  ARTICLES: {
    READ: {
      windowMs: 60 * 1000,
      max: 50,
      message: 'Too many article requests, please try again later',
    },
    WRITE: {
      windowMs: 60 * 1000,
      max: 10,
      message: 'Too many article write requests, please try again later',
    },
  },
  DEFAULT: {
    windowMs: 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later',
  },
} as const;

export const SECURITY_MEMORY_LIMITS = {
  AUDIO_STREAM: 1024 * 1024 * 2, // 2MB
  ARTICLE_PROCESSING: 1024 * 512, // 512KB
  DEFAULT: 1024 * 256, // 256KB
} as const;
