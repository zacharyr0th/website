import { buildCSPHeader, generateNonce, getCSPReportingConfig } from './csp';
import { COMMON_SECURITY_HEADERS, CACHE_CONTROL } from './constants';
import { getErrorHeaders } from './error-handling';

export interface SecurityHeadersOptions {
  includeCSP?: boolean;
  includeClearSiteData?: boolean;
  includeFrameOptions?: boolean;
  includeHSTS?: boolean;
  includeNoCache?: boolean;
  nonce?: string;
  additionalHeaders?: Record<string, string>;
}

/**
 * Get base security headers with configurable options
 */
export function getBaseSecurityHeaders(
  options: SecurityHeadersOptions = {}
): Record<string, string> {
  const {
    includeCSP = true,
    includeClearSiteData = false,
    includeFrameOptions = true,
    includeHSTS = true,
    includeNoCache = false,
    nonce,
    additionalHeaders = {},
  } = options;

  const headers: Record<string, string> = {
    ...COMMON_SECURITY_HEADERS,
    'X-DNS-Prefetch-Control': 'off',
    'X-Download-Options': 'noopen',
    'Origin-Agent-Cluster': '?1',
  };

  // Remove X-Powered-By header
  Object.defineProperty(headers, 'X-Powered-By', {
    value: undefined,
    enumerable: false,
    configurable: true,
    writable: true,
  });

  if (includeFrameOptions) {
    headers['X-Frame-Options'] = 'DENY';
  }

  if (includeHSTS) {
    headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload';
  }

  if (includeCSP) {
    const cspNonce = nonce || generateNonce();
    headers['Content-Security-Policy'] = buildCSPHeader(cspNonce);

    const reportingConfig = getCSPReportingConfig();
    headers['Report-To'] = JSON.stringify(reportingConfig.reportTo);
    headers['NEL'] =
      '{"report_to":"default","max_age":31536000,"include_subdomains":true,"success_fraction":0.01,"failure_fraction":1.0}';
  }

  if (includeClearSiteData) {
    headers['Clear-Site-Data'] = '"cache","cookies","storage"';
  }

  if (includeNoCache) {
    headers['Cache-Control'] = CACHE_CONTROL.PRIVATE;
    headers['Pragma'] = 'no-cache';
  }

  return { ...headers, ...additionalHeaders };
}

/**
 * Get headers for API responses
 */
export function getApiHeaders(options: SecurityHeadersOptions = {}): Record<string, string> {
  return getBaseSecurityHeaders({
    includeCSP: true,
    includeHSTS: true,
    includeFrameOptions: true,
    includeNoCache: true,
    ...options,
  });
}

/**
 * Get headers for static content
 */
export function getStaticHeaders(maxAge = 3600): Record<string, string> {
  return getBaseSecurityHeaders({
    includeCSP: true,
    includeHSTS: true,
    includeFrameOptions: true,
    includeNoCache: false,
    additionalHeaders: {
      'Cache-Control': `public, s-maxage=${maxAge}, stale-while-revalidate=${maxAge * 24}`,
    },
  });
}

/**
 * Get rate limit headers
 */
export function getRateLimitHeaders(
  limit: number,
  remaining: number,
  reset: number,
  retryAfter?: number
): Record<string, string> {
  const headers: Record<string, string> = {
    'X-RateLimit-Limit': limit.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': reset.toString(),
  };

  if (retryAfter !== undefined) {
    headers['Retry-After'] = retryAfter.toString();
  }

  return headers;
}

/**
 * Get security headers for general use
 */
export function getSecurityHeaders(options: SecurityHeadersOptions = {}): Record<string, string> {
  return getBaseSecurityHeaders(options);
}

export { getErrorHeaders };
