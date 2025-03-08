import { NextResponse, type NextRequest } from 'next/server';
import { createLogger, LogCategory } from '@/lib/core';

const logger = createLogger('middleware', { category: LogCategory.API });

// Simple origin validation function
const validateOrigin = (origin: string, allowedOrigins: string[]): boolean => {
  return allowedOrigins.some((allowed) => {
    if (allowed === '*') return true;
    if (allowed.includes('*')) {
      const pattern = allowed.replace('*', '.*');
      return new RegExp(`^${pattern}$`).test(origin);
    }
    return origin === allowed;
  });
};

// Allowed origins
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://localhost:3000',
  'https://zacharyroth.com',
  'https://*.zacharyroth.com',
];

// Basic security headers
const getBaseSecurityHeaders = () => ({
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
});

// API headers with CORS
const getApiHeaders = () => ({
  ...getBaseSecurityHeaders(),
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
});

export async function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');
  const isAudioRoute = request.nextUrl.pathname.includes('/website-audio/');

  // Special handling for audio routes
  if (isAudioRoute) {
    const response = NextResponse.next();
    if (origin) {
      const corsHeaders = {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Range, Content-Type',
        'Access-Control-Expose-Headers': 'Content-Range, Content-Length',
      };
      Object.entries(corsHeaders).forEach(([key, value]) => response.headers.set(key, value));
    }
    return response;
  }

  try {
    // Basic origin validation for non-audio routes
    if (
      origin &&
      !validateOrigin(origin, [...ALLOWED_ORIGINS, 'https://hel1.your-objectstorage.com'])
    ) {
      return new Response('Invalid origin', { status: 403 });
    }

    // HTTPS redirect in production
    if (process.env.NODE_ENV === 'production' && !request.url.startsWith('https')) {
      return NextResponse.redirect(new URL(request.url.replace('http://', 'https://')));
    }

    const response = NextResponse.next();
    const headers = isApiRoute ? getApiHeaders() : getBaseSecurityHeaders();
    Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
    return response;
  } catch (error) {
    logger.error('Middleware error', error instanceof Error ? error : new Error(String(error)));
    return new Response('Internal Server Error', { status: 500 });
  }
}

// Optimize matcher patterns
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)', '/api/:path*'],
};
