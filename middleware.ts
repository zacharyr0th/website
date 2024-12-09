import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Helper to check if request is from same origin
function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true; // Same origin requests may not have origin header

  try {
    const url = new URL(request.url);
    const requestHost = url.host;
    const originHost = new URL(origin).host;
    return requestHost === originHost;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  // Get the response
  const response = NextResponse.next();
  const headers = response.headers;

  // Content Security Policy
  headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://zacharyr0th.com https://*.zacharyr0th.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')
  );

  // Other security headers
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set(
    'Permissions-Policy',
    'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()'
  );

  // Handle CORS
  const origin = request.headers.get('origin');

  // If it's same origin or no origin, don't set CORS headers
  if (!isSameOrigin(request) && origin) {
    // For API routes
    if (request.nextUrl.pathname.startsWith('/api')) {
      headers.set('Access-Control-Allow-Origin', origin);
      headers.set('Access-Control-Allow-Credentials', 'true');
      headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      // Handle preflight requests
      if (request.method === 'OPTIONS') {
        headers.set('Access-Control-Max-Age', '86400');
        return new NextResponse(null, { headers });
      }
    }
  }

  return response;
}

// Specify which paths to run the middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
