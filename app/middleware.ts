import { NextResponse, type NextRequest } from 'next/server';
import { createLogger, LogCategory } from '@/lib/core';
import {
  getBaseSecurityHeaders,
  getApiHeaders,
  validateOrigin,
  SECURITY_CONSTANTS,
} from '@/lib/security';

const logger = createLogger('middleware', { category: LogCategory.API });

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
      !validateOrigin(origin, [
        ...SECURITY_CONSTANTS.ALLOWED_ORIGINS,
        'https://hel1.your-objectstorage.com',
      ])
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
