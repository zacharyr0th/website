# Security Library

Security middleware and utilities for the website.

## Core Components

| File           | Purpose                 | Key Features                                                                  |
| -------------- | ----------------------- | ----------------------------------------------------------------------------- |
| `index.ts`     | Main entry point        | • Exports all security features<br>• Type definitions<br>• Public API surface |
| `constants.ts` | Security constants      | • Security headers<br>• Allowed origins<br>• Content types<br>• Cache control |
| `csp.ts`       | Content Security Policy | • CSP builder<br>• Nonce generation<br>• Policy caching<br>• Directives       |
| `headers.ts`   | Security headers        | • Header generation<br>• CORS configuration<br>• Cache control                |
| `types.ts`     | Type definitions        | • Security interfaces<br>• Error types<br>• Configuration types               |

## Features

### Content Security Policy (CSP)

The CSP system provides defense against various web attacks:

```typescript
// CSP with LRU caching
const cspCache = new LRUCache<string, string>({
  max: 100,
  ttl: 1000 * 60 * 60, // 1 hour TTL
});

// Core CSP directives
const DEFAULT_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'https:'],
  'connect-src': ["'self'", 'https:', 'https://hel1.your-objectstorage.com'],
  'frame-ancestors': ["'none'"],
  'form-action': ["'self'"],
  'object-src': ["'none'"],
  'media-src': ["'self'", 'https://hel1.your-objectstorage.com'],
};
```

Features:

- LRU caching for performance
- Nonce generation for dynamic scripts
- Strict CSP directives
- Media source control
- Mixed content blocking

### Security Headers

Comprehensive security headers to protect against common vulnerabilities:

```typescript
const COMMON_SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};
```

Features:

- MIME type sniffing protection
- Clickjacking prevention
- XSS protection
- Referrer policy control
- Permission restrictions
- HTTPS enforcement

### Error Handling

Standardized error responses following RFC 7807 Problem Details:

```typescript
export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
}

export const ErrorType = {
  VALIDATION_ERROR: 'validation_error',
  INTERNAL_ERROR: 'internal_error',
  NOT_FOUND: 'not_found',
  UNAUTHORIZED: 'unauthorized',
  FORBIDDEN: 'forbidden',
};
```

Features:

- Structured error responses
- Standard error types
- Detailed error information
- Status code mapping

### Cache Control

Optimized caching strategies for different content types:

```typescript
export const CACHE_CONTROL = {
  STATIC: 'public, max-age=31536000, immutable',
  DYNAMIC: 'public, max-age=3600, stale-while-revalidate=86400',
  PRIVATE: 'private, no-cache, no-store, must-revalidate',
};
```

Features:

- Static asset caching
- Dynamic content caching
- Private response handling
- Cache validation

### Origin Validation

Secure origin validation for CORS and security:

```typescript
export const SECURITY_CONSTANTS = {
  ALLOWED_ORIGINS: [
    'http://localhost:3000',
    'https://zacharyr0th.com',
    'https://www.zacharyr0th.com',
  ],
};

export function validateOrigin(origin: string, allowedOrigins: string[]): boolean {
  if (!origin) return true;
  return allowedOrigins.includes(origin);
}
```

Features:

- Origin whitelist
- CORS support
- Development/production handling

## Usage

### Basic Security Headers

```typescript
import { getBaseSecurityHeaders } from '@/lib/security';

const headers = getBaseSecurityHeaders();
// Apply headers to response
```

### Content Security Policy

```typescript
import { generateNonce, buildCSPHeader } from '@/lib/security';

const nonce = generateNonce();
const csp = buildCSPHeader(nonce);
// Apply CSP to response headers
```

### Error Responses

```typescript
import { createErrorResponse, ErrorType } from '@/lib/security';

const errorResponse = createErrorResponse(ErrorType.VALIDATION_ERROR, 400, 'Invalid input');
// Return error response
```

## Configuration

Security settings can be configured through environment variables:

```env
# Origins
ALLOWED_ORIGINS=https://zacharyr0th.com,https://www.zacharyr0th.com

# Security
NODE_ENV=production  # Enables strict security in production
```

## Best Practices

1. Always use HTTPS in production
2. Keep security headers up to date
3. Regularly review CSP directives
4. Use appropriate cache controls
5. Validate all origins
6. Handle errors consistently

## Integration

The security library is integrated at multiple levels:

1. **Middleware**: Global security headers and CSP
2. **API Routes**: Error handling and response formatting
3. **Static Assets**: Cache control and security headers
4. **Dynamic Routes**: Context-specific security measures
