import { LRUCache } from 'lru-cache';

// Simple LRU cache for CSP headers
const cspCache = new LRUCache<string, string>({
  max: 100,
  ttl: 1000 * 60 * 60, // 1 hour TTL
});

type CSPValue =
  | "'self'"
  | "'none'"
  | "'unsafe-inline'"
  | "'unsafe-eval'"
  | 'data:'
  | 'https:'
  | `'nonce-${string}'`
  | 'https://hel1.your-objectstorage.com';

export enum CSPDirective {
  DEFAULT_SRC = 'default-src',
  SCRIPT_SRC = 'script-src',
  STYLE_SRC = 'style-src',
  IMG_SRC = 'img-src',
  CONNECT_SRC = 'connect-src',
  FRAME_ANCESTORS = 'frame-ancestors',
  FORM_ACTION = 'form-action',
  OBJECT_SRC = 'object-src',
  MEDIA_SRC = 'media-src',
}

const DEFAULT_DIRECTIVES: Record<CSPDirective, CSPValue[]> = {
  [CSPDirective.DEFAULT_SRC]: ["'self'"],
  [CSPDirective.SCRIPT_SRC]: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  [CSPDirective.STYLE_SRC]: ["'self'", "'unsafe-inline'"],
  [CSPDirective.IMG_SRC]: ["'self'", 'data:', 'https:'],
  [CSPDirective.CONNECT_SRC]: ["'self'", 'https:', 'https://hel1.your-objectstorage.com'],
  [CSPDirective.FRAME_ANCESTORS]: ["'none'"],
  [CSPDirective.FORM_ACTION]: ["'self'"],
  [CSPDirective.OBJECT_SRC]: ["'none'"],
  [CSPDirective.MEDIA_SRC]: ["'self'", 'https://hel1.your-objectstorage.com'],
};

export function generateNonce(): string {
  return crypto.randomUUID();
}

export function buildCSPHeader(nonce?: string): string {
  // Fast path: return cached value if no nonce
  if (!nonce) {
    const cached = cspCache.get('default');
    if (cached) return cached;
  }

  const directives = new Map(Object.entries(DEFAULT_DIRECTIVES));

  // Add nonce to script-src if provided
  if (nonce) {
    const scriptSrc = directives.get(CSPDirective.SCRIPT_SRC) || [];
    directives.set(CSPDirective.SCRIPT_SRC, [...scriptSrc, `'nonce-${nonce}'`]);
  }

  // Build CSP string
  const parts = [];
  for (const [key, values] of directives) {
    if (values.length) {
      parts.push(`${key} ${values.join(' ')}`);
    }
  }

  // Add required security directives
  parts.push('upgrade-insecure-requests');
  parts.push('block-all-mixed-content');

  const cspValue = parts.join('; ');

  // Cache the result if no nonce
  if (!nonce) {
    cspCache.set('default', cspValue);
  }

  return cspValue;
}

export function getCSPReportingConfig() {
  return {
    reportTo: [
      {
        group: 'csp-violations',
        max_age: 31536000,
        endpoints: [{ url: '/api/security/csp-report' }],
      },
    ],
    reportUri: '/api/security/csp-report',
  };
}
