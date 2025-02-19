import { NextResponse, type NextRequest } from 'next/server';
import { createLogger, LogCategory } from '@/lib/core';
import type { ProblemDetails } from '@/lib/security';
import {
  getBaseSecurityHeaders,
  getStaticHeaders,
  getApiHeaders,
  checkRateLimit,
  generateNonce,
  ErrorType,
  getErrorHeaders,
  SECURITY_CONSTANTS,
  checkServerLoad,
  getRequestIp,
  validateRequest,
  validateOrigin,
  generateSriHash,
  getCSP,
  withSecureMemory,
  accessControl,
  Resource,
} from '@/lib/security';

// Enable strict mode for enhanced security
('use strict');

const logger = createLogger('middleware', { category: LogCategory.API });

export async function middleware(request: NextRequest) {
  const startTime = Date.now();
  const requestId = crypto.randomUUID();
  const isApiRoute = SECURITY_CONSTANTS.ROUTE_TYPES.API.PATTERNS.BASE.test(
    request.nextUrl.pathname
  );
  const isSensitiveRoute = SECURITY_CONSTANTS.ROUTE_TYPES.API.PATTERNS.SENSITIVE.test(
    request.nextUrl.pathname
  );

  // Create a child logger with request context
  const requestLogger = logger.child({
    requestId,
    method: request.method,
    path: request.nextUrl.pathname,
    ip: getRequestIp(request),
    userAgent: request.headers.get('user-agent'),
    isApiRoute,
    isSensitiveRoute,
  });

  try {
    // 1. Origin Validation
    if (!validateOrigin(request.headers.get('origin') || '', SECURITY_CONSTANTS.ALLOWED_ORIGINS)) {
      requestLogger.warn('Invalid origin detected', {
        context: {
          origin: request.headers.get('origin'),
          category: LogCategory.SECURITY,
        },
      });
      return new Response('Invalid origin', { status: 403 });
    }

    // 2. Static Asset Handling
    if (
      SECURITY_CONSTANTS.ROUTE_TYPES.STATIC.PATTERNS.some((pattern) =>
        pattern.test(request.nextUrl.pathname)
      )
    ) {
      const response = NextResponse.next();
      const headers = getStaticHeaders();
      Object.entries(headers).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
      return response;
    }

    // 3. HTTPS Enforcement in Production
    if (process.env.NODE_ENV === 'production' && !request.url.startsWith('https')) {
      const secureUrl = request.nextUrl.clone();
      secureUrl.protocol = 'https';
      return NextResponse.redirect(secureUrl);
    }

    // 4. Server Load Check
    const serverLoadResponse = checkServerLoad(request);
    if (serverLoadResponse) {
      return serverLoadResponse;
    }

    // 5. Rate Limiting with Pattern Detection
    const { headers: rateLimitHeaders, error: rateLimitError } = await checkRateLimit(request, {
      pattern: isSensitiveRoute ? 'sensitive' : isApiRoute ? 'api' : 'default',
    });

    if (rateLimitError) {
      return rateLimitError;
    }

    // 6. Generate Nonce for CSP
    const nonce = generateNonce();

    // 7. Access Control Check for Protected Routes
    const userId = request.headers.get('x-user-id') || undefined;
    if (isSensitiveRoute && userId) {
      const canAccess = accessControl.canAccess(userId, Resource.API, 'use', {
        path: request.nextUrl.pathname,
        method: request.method,
      });

      if (!canAccess) {
        requestLogger.warn('Unauthorized access attempt', {
          context: {
            userId,
            path: request.nextUrl.pathname,
            category: LogCategory.SECURITY,
          },
        });
        return new Response('Unauthorized', { status: 401 });
      }
    } else if (isSensitiveRoute) {
      // No user ID provided for sensitive route
      requestLogger.warn('Missing user ID for sensitive route', {
        context: {
          path: request.nextUrl.pathname,
          category: LogCategory.SECURITY,
        },
      });
      return new Response('Unauthorized', { status: 401 });
    }

    // 8. Secure Memory Handling for Sensitive Routes
    if (isSensitiveRoute) {
      withSecureMemory(1024, () => {
        // Process sensitive data in secure memory
        // ... process sensitive data ...
      });
    }

    // 9. Request Validation
    const validationResult = await validateRequest(request);
    if (!validationResult.success) {
      requestLogger.warn('Request validation failed', {
        context: {
          errors: validationResult.errors,
          category: LogCategory.SECURITY,
        },
      });
      return new Response('Invalid request', { status: 400 });
    }

    // 10. Apply Security Headers
    const securityHeaders = isApiRoute
      ? getApiHeaders({
          includeCSP: true,
          includeHSTS: true,
          includeFrameOptions: true,
          nonce,
        })
      : getBaseSecurityHeaders({
          includeCSP: true,
          includeHSTS: true,
          includeFrameOptions: true,
          nonce,
        });

    // Create response with all security measures
    const response = NextResponse.next();
    const headers = new Headers(response.headers);

    // Add all security headers
    Object.entries({ ...securityHeaders, ...rateLimitHeaders }).forEach(([key, value]) => {
      headers.set(key, value);
    });

    // Add request tracking headers
    headers.set('x-request-id', requestId);
    headers.set('x-nonce', nonce);

    // Add SRI hash for relevant responses
    if (response.headers.get('content-type')?.includes('javascript')) {
      const content = await response.text();
      headers.set('integrity', generateSriHash(content));
    }

    // Add custom CSP
    const customCsp = getCSP(nonce);
    if (customCsp) {
      headers.set('Content-Security-Policy', customCsp);
    }

    const finalResponse = NextResponse.next({
      request: {
        headers: headers,
      },
    });

    // Add CSP headers to the response
    const responseHeaders = new Headers(finalResponse.headers);
    Object.entries(headers).forEach(([key, value]) => {
      responseHeaders.set(key, value);
    });

    // Log performance metrics
    const duration = Date.now() - startTime;
    requestLogger.info('Request completed', {
      context: {
        duration,
        status: finalResponse.status,
        category: LogCategory.PERFORMANCE,
      },
    });

    return new NextResponse(finalResponse.body, {
      status: finalResponse.status,
      statusText: finalResponse.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    // Enhanced error handling
    const sanitizedError = error instanceof Error ? error.message : 'Unknown error';
    const errorResponse: ProblemDetails = {
      type: ErrorType.INTERNAL_ERROR,
      title: 'Internal Server Error',
      status: 500,
      detail: process.env.NODE_ENV === 'development' ? sanitizedError : undefined,
      instance: request.nextUrl.pathname,
      traceId: requestId,
      timestamp: new Date().toISOString(),
    };

    requestLogger.error('Middleware error', {
      error: error as Error,
      context: {
        errorDetails: errorResponse,
        category: LogCategory.SECURITY,
      },
    });

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: {
        ...getErrorHeaders(errorResponse.traceId),
        'Content-Type': 'application/problem+json',
      },
    });
  }
}

// Configure which routes to apply middleware to with optimized patterns
export const config = {
  matcher: [
    '/((?!_next/|_static/|_vercel|favicon.ico|sitemap.xml).*)',
    '/api/auth/:path*',
    '/api/admin/:path*',
    '/api/protected/:path*',
  ],
};
