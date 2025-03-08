/**
 * Headers for API responses
 */

export const getSecurityHeaders = () => {
  const headers: Record<string, string> = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Cache-Control': 'no-store, max-age=0',
    'Pragma': 'no-cache',
  };

  return headers;
};

/**
 * Headers specific to content endpoints (articles, bio, etc.)
 */
export const getContentHeaders = (maxAge = 3600): Record<string, string> => ({
  ...getSecurityHeaders(),
  'Cache-Control': `public, s-maxage=${maxAge}, stale-while-revalidate=${maxAge * 24}`,
});
