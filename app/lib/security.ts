/**
 * Security utilities for API routes and server components
 */

/**
 * Returns headers for static content with cache control
 * @param maxAge Maximum age in seconds for the cache
 * @returns Headers object with security and cache headers
 */
export const getStaticHeaders = (maxAge: number = 3600) => {
  return {
    'Cache-Control': `public, max-age=${maxAge}, s-maxage=${maxAge}, stale-while-revalidate=${maxAge * 2}`,
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
  };
};
