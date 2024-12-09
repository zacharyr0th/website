import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { corsMiddleware } from './lib/cors';
import { applySecurityHeaders, RATE_LIMIT_CONFIG } from './lib/security';
import { logger } from './lib/logger';

// Simple in-memory store for rate limiting
// Note: In production, use Redis or similar for distributed systems
const rateLimit = new Map<string, { count: number; timestamp: number }>();

function isRateLimited(request: NextRequest): boolean {
  const key = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_CONFIG.windowMs;

  // Clean up old entries
  Array.from(rateLimit.entries()).forEach(([k, v]) => {
    if (v.timestamp < windowStart) {
      rateLimit.delete(k);
    }
  });

  const currentLimit = rateLimit.get(key);
  if (!currentLimit) {
    rateLimit.set(key, { count: 1, timestamp: now });
    return false;
  }

  if (currentLimit.timestamp < windowStart) {
    rateLimit.set(key, { count: 1, timestamp: now });
    return false;
  }

  if (currentLimit.count >= RATE_LIMIT_CONFIG.max) {
    logger('warn', `Rate limit exceeded for IP: ${key}`);
    return true;
  }

  currentLimit.count++;
  return false;
}

export async function middleware(request: NextRequest) {
  // Create base response
  let response = NextResponse.next();

  // Apply security headers to all responses
  response = applySecurityHeaders(response);

  // Only apply API-specific middleware to /api routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Apply CORS
    const corsResponse = corsMiddleware(request);
    if (corsResponse.status !== 200) {
      return applySecurityHeaders(corsResponse);
    }

    // Check rate limit for API routes
    if (isRateLimited(request)) {
      return applySecurityHeaders(
        new NextResponse(JSON.stringify(RATE_LIMIT_CONFIG.message), {
          status: 429,
          headers: {
            'content-type': 'application/json',
            'retry-after': (RATE_LIMIT_CONFIG.windowMs / 1000).toString(),
          },
        })
      );
    }

    // Additional API-specific security for /api/articles
    if (request.nextUrl.pathname.startsWith('/api/articles')) {
      // Skip origin check in development
      if (process.env.NODE_ENV !== 'development') {
        const origin = request.headers.get('origin');
        const host = request.headers.get('host');
        const isFromSameOrigin = origin ? new URL(origin).host === host : false;

        if (!isFromSameOrigin) {
          logger('warn', `Unauthorized access attempt from origin: ${origin}`);
          return applySecurityHeaders(
            new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
              status: 403,
              headers: { 'content-type': 'application/json' },
            })
          );
        }
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Apply to all routes
    '/(.*)',
  ],
};
