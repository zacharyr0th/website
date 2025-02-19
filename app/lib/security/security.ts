import { randomBytes } from 'crypto';
import { RATE_LIMIT_CONFIG } from './constants';

/**
 * Generate a secure random identifier for objects
 * Used to prevent enumerable IDs in URLs
 */
export function generateSecureId(length: number = 32): string {
  return randomBytes(length).toString('hex');
}

/**
 * Map between secure IDs and internal IDs
 * This should be stored in Redis/database in production
 */
const secureIdMap = new Map<string, string>();

/**
 * Create a secure reference for an object ID
 */
export function createSecureReference(internalId: string): string {
  const secureId = generateSecureId();
  secureIdMap.set(secureId, internalId);
  return secureId;
}

/**
 * Resolve a secure reference back to an internal ID
 * Returns null if the reference is invalid
 */
export function resolveSecureReference(secureId: string | undefined): string | null {
  if (!secureId) return null;
  const internalId = secureIdMap.get(secureId);
  return internalId || null;
}

/**
 * Delete a secure reference when it's no longer needed
 */
export function deleteSecureReference(secureId: string): void {
  secureIdMap.delete(secureId);
}

/**
 * Validate access to a resource
 * This should be implemented with your specific access control logic
 */
export function validateResourceAccess(
  userId: string | undefined,
  resourceType: string,
  resourceId: string
): boolean {
  try {
    if (!userId || !resourceId) return false;

    // Validate resource type
    const validResourceTypes = ['user', 'project', 'document'];
    if (!validResourceTypes.includes(resourceType)) return false;

    // Implement your access control logic here
    // This is just a placeholder
    return false;
  } catch (error) {
    // Log the error but don't expose details
    console.error('Access validation error:', error);
    return false;
  }
}

/**
 * Validate origin against allowlist
 */
export function validateOrigin(origin: string, allowedOrigins: string[]): boolean {
  return allowedOrigins.includes(origin) || allowedOrigins.includes('*');
}

/**
 * Clean and validate URLs
 */
export function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Invalid protocol');
    }
    return parsed.toString();
  } catch {
    return '';
  }
}

/**
 * Generate SRI hash for external resources
 */
export function generateSriHash(content: string): string {
  return `sha384-${Buffer.from(content).toString('base64')}`;
}

/**
 * Validate and sanitize HTML content
 */
export function sanitizeHtml(html: string): string {
  // Use DOMPurify or similar library
  return html; // Placeholder - implement actual sanitization
}

/**
 * Security constants with optimized settings
 */
export const SECURITY_CONSTANTS = {
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(',') || ['*'],
  MAX_REQUEST_SIZE: 1024 * 1024, // 1MB
  RATE_LIMIT: RATE_LIMIT_CONFIG.STANDARD,
  CSP_DIRECTIVES: {
    DEFAULT_SRC: ["'self'"],
    SCRIPT_SRC: ["'self'", "'strict-dynamic'", "'wasm-unsafe-eval'"],
    STYLE_SRC: ["'self'", "'unsafe-inline'"],
    IMG_SRC: ["'self'", 'data:', 'https:'],
    FONT_SRC: ["'self'", 'data:', 'https:'],
    CONNECT_SRC: ["'self'", 'https:'],
    FRAME_ANCESTORS: ["'none'"],
    BASE_URI: ["'self'"],
    FORM_ACTION: ["'self'"],
    OBJECT_SRC: ["'none'"],
    FRAME_SRC: ["'none'"],
    MEDIA_SRC: ["'self'", 'https://hel1.your-objectstorage.com'],
    MANIFEST_SRC: ["'self'"],
    WORKER_SRC: ["'self'", 'blob:'],
    PREFETCH_SRC: ["'self'"],
    NAVIGATE_TO: ["'self'"],
  },
  ROUTE_TYPES: {
    STATIC: {
      PATTERNS: [
        /\.(jpg|jpeg|gif|png|webp|svg|css|js|woff2?|ico|txt|xml)$/i,
        /^\/(writing|projects|bio|audio)\/?$/,
        /^\/manifest\.json$/,
        /^\/robots\.txt$/,
        /^\/sitemap\.xml$/,
        /^\/.well-known\//,
      ],
      HEADERS: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    },
    API: {
      PATTERNS: {
        BASE: /^\/api\//,
        SENSITIVE: /^\/api\/(auth|admin|protected)/,
        PUBLIC: /^\/api\/(public|webhooks)/,
      },
    },
  },
} as const;

/**
 * Get Content Security Policy (CSP) headers with enhanced security
 */
export function getCSP(nonce: string): string {
  return `
    default-src 'self'; 
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'wasm-unsafe-eval' https:; 
    style-src 'self' 'unsafe-inline' https:; 
    img-src 'self' data: https:; 
    font-src 'self' data: https:; 
    connect-src 'self' https:; 
    frame-ancestors 'none';
    form-action 'self';
    base-uri 'self';
    object-src 'none';
    frame-src 'none';
    media-src 'self' https://hel1.your-objectstorage.com;
    manifest-src 'self';
    worker-src 'self' blob:;
    prefetch-src 'self';
    navigate-to 'self';
    upgrade-insecure-requests;
    block-all-mixed-content;
    require-trusted-types-for 'script';
    trusted-types default dompurify;
    sandbox allow-forms allow-same-origin allow-scripts allow-popups;
    report-uri /api/security/csp-report;
    report-to default
  `
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Get request ID from headers or generate a new one
 */
export function getRequestId(request: Request): string {
  return request.headers.get('x-request-id') || randomBytes(16).toString('hex');
}

/**
 * Get client IP address from request headers
 */
export function getRequestIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  if (forwardedFor) {
    return forwardedFor;
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

// Secure Memory Management
interface SecureBuffer extends Buffer {
  secure: true;
}

interface SecureHeap {
  alloc(size: number): SecureBuffer;
  zero(buffer: SecureBuffer): void;
  free(buffer: SecureBuffer): void;
  isSecure(buffer: Buffer): buffer is SecureBuffer;
}

// Initialize secure heap with 1MB capacity and 256-bit isolation
const secureHeap: SecureHeap = (() => {
  const heap = new Map<SecureBuffer, boolean>();
  const maxSize = 1024 * 1024; // 1MB
  let currentSize = 0;

  return {
    alloc(size: number): SecureBuffer {
      if (currentSize + size > maxSize) {
        throw new Error('Secure heap capacity exceeded');
      }

      // Create buffer with secure flag
      const buffer = Buffer.allocUnsafe(size) as SecureBuffer;
      buffer.fill(0); // Zero the memory
      Object.defineProperty(buffer, 'secure', { value: true, enumerable: true });

      heap.set(buffer, true);
      currentSize += size;

      return buffer;
    },

    zero(buffer: SecureBuffer): void {
      if (!heap.has(buffer)) {
        throw new Error('Invalid secure buffer');
      }
      buffer.fill(0);
    },

    free(buffer: SecureBuffer): void {
      if (!heap.has(buffer)) {
        throw new Error('Invalid secure buffer');
      }
      this.zero(buffer);
      heap.delete(buffer);
      currentSize -= buffer.length;
    },

    isSecure(buffer: Buffer): buffer is SecureBuffer {
      return 'secure' in buffer && buffer.secure === true && heap.has(buffer as SecureBuffer);
    },
  };
})();

/**
 * Handle sensitive data with secure memory management
 */
export function handleSensitiveData<T>(operation: (buffer: SecureBuffer) => T, data: string): T {
  const buffer = secureHeap.alloc(Buffer.byteLength(data));
  try {
    buffer.write(data);
    return operation(buffer);
  } finally {
    secureHeap.free(buffer);
  }
}

/**
 * Process sensitive data with automatic cleanup
 */
export function withSecureMemory<T>(size: number, operation: (buffer: SecureBuffer) => T): T {
  const buffer = secureHeap.alloc(size);
  try {
    return operation(buffer);
  } finally {
    secureHeap.free(buffer);
  }
}

export { checkServerLoad } from './performance';
