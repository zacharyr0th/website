/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
/* eslint-enable @typescript-eslint/no-unused-vars */

// CSP Directives
const CSP_DIRECTIVES = {
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  styleSrc: ["'self'", "'unsafe-inline'"],
  imgSrc: ["'self'", 'data:', 'https:'],
  connectSrc: ["'self'", 'https:'],
  fontSrc: ["'self'", 'https:', 'data:'],
  objectSrc: ["'none'"],
  mediaSrc: ["'self'"],
  frameSrc: ["'none'"],
  sandbox: ['allow-forms', 'allow-scripts', 'allow-same-origin'],
  childSrc: ["'none'"],
  workerSrc: ["'self'"],
  frameAncestors: ["'none'"],
  formAction: ["'self'"],
  upgradeInsecureRequests: true,
};

// Security Headers
export const SECURITY_HEADERS = {
  'Content-Security-Policy': Object.entries(CSP_DIRECTIVES)
    .map(([key, value]) => {
      if (value === true) return key;
      if (Array.isArray(value)) return `${key} ${value.join(' ')}`;
      return '';
    })
    .filter(Boolean)
    .join('; '),
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
};

export function applySecurityHeaders(response: NextResponse): NextResponse {
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

// Rate limiting configuration
export const RATE_LIMIT_CONFIG = {
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute
  message: { error: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
};

// Trusted domains for CORS
export const TRUSTED_DOMAINS = [
  'https://zacharyr0th.com',
  'https://www.zacharyr0th.com',
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
].filter(Boolean);
