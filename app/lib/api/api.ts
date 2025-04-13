/**
 * API Utilities
 *
 * Optimized utilities for API responses and error handling.
 * - Improved type safety with generics
 * - Memoized headers
 * - Standardized error handling
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Type definitions
export type ApiErrorDetails = Record<string, unknown>;
export type ApiHeaders = Record<string, string>;

// Memoize static headers for performance
const memoizedStaticHeaders = new Map<number, ApiHeaders>();

/**
 * Creates a standardized API response with type safety
 */
export function createApiResponse<T>(
  data: T,
  options: {
    status?: number;
    headers?: ApiHeaders;
    cache?: boolean;
  } = {}
): NextResponse<{ data: T; timestamp: string }> {
  const { status = 200, headers = {} } = options;

  return NextResponse.json(
    {
      data,
      timestamp: new Date().toISOString(),
    },
    {
      status,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    }
  );
}

/**
 * Creates a standardized API error response with improved error handling
 */
export function createApiErrorResponse(
  error: string | Error,
  options: {
    status?: number;
    details?: ApiErrorDetails;
    headers?: ApiHeaders;
  } = {}
): NextResponse<{ error: string; details?: ApiErrorDetails; timestamp: string }> {
  const { status = 500, details, headers = {} } = options;
  const errorMessage = error instanceof Error ? error.message : error;

  // Log server errors
  if (status >= 500) {
    console.error('[API Error]', {
      message: errorMessage,
      details,
      status,
      timestamp: new Date().toISOString(),
    });
  }

  return NextResponse.json(
    {
      error: errorMessage,
      ...(details && { details }),
      timestamp: new Date().toISOString(),
    },
    {
      status,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    }
  );
}

/**
 * Returns cached static headers for performance
 */
export function getStaticHeaders(maxAge = 3600): ApiHeaders {
  // Check memoized headers first
  const cached = memoizedStaticHeaders.get(maxAge);
  if (cached) return cached;

  const headers: ApiHeaders = {
    'Cache-Control': `public, max-age=${maxAge}, s-maxage=${maxAge}, stale-while-revalidate=${maxAge * 2}`,
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  };

  // Cache the headers
  memoizedStaticHeaders.set(maxAge, headers);
  return headers;
}

// Optimized bot configuration with type safety
export interface BotConfig {
  userAgent: string | string[];
  crawlDelay: number;
}

export const BOT_CONFIG = {
  allowedBots: [
    'googlebot',
    'bingbot',
    'yandexbot',
    'duckduckbot',
    'slurp',
    'baiduspider',
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
  ] as const,

  disallowedPaths: ['/api/*', '/admin/*', '/private/*'] as const,

  crawlDelay: 1,

  // Typed bot-specific configurations
  general: {
    userAgent: '*',
    crawlDelay: 1,
  } satisfies BotConfig,

  googlebot: {
    userAgent: 'Googlebot',
    crawlDelay: 1,
  } satisfies BotConfig,

  bingbot: {
    userAgent: 'Bingbot',
    crawlDelay: 1,
  } satisfies BotConfig,

  gptbot: {
    userAgent: 'GPTBot',
    crawlDelay: 2,
  } satisfies BotConfig,

  otherBots: {
    userAgent: ['Yandexbot', 'Baiduspider', 'DuckDuckBot', 'Slurp'],
    crawlDelay: 2,
  } satisfies BotConfig,

  securityScanners: {
    userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'YandexBot', 'Nimbostratus-Bot'],
    crawlDelay: 10,
  } satisfies BotConfig,
} as const;

// Allowed origins with type safety
export const ALLOWED_ORIGINS = [
  'https://zacharyroth.com',
  'https://www.zacharyroth.com',
  ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
] as const;

// CORS helper function
export function handleCORS(req: NextRequest): ApiHeaders {
  const origin = req.headers.get('origin') || ALLOWED_ORIGINS[0];

  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}
