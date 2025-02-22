import type { SecurityHeaders } from './types';

/**
 * Get base security headers
 */
export function getBaseSecurityHeaders(): SecurityHeaders {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  };
}

/**
 * Get headers for static content
 */
export function getStaticHeaders(maxAge = 3600): SecurityHeaders {
  return {
    ...getBaseSecurityHeaders(),
    'Cache-Control': `public, max-age=${maxAge}, must-revalidate`,
  };
}

/**
 * Get headers for API responses
 */
export function getApiHeaders(): SecurityHeaders {
  return {
    ...getBaseSecurityHeaders(),
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
  };
}

/**
 * Get headers for error responses
 */
export function getErrorHeaders(): SecurityHeaders {
  return {
    ...getBaseSecurityHeaders(),
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
  };
}
