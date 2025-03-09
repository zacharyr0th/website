/**
 * API Utilities
 *
 * This file contains utility functions for API responses and error handling.
 */

import { NextResponse } from 'next/server';

/**
 * Creates a standardized API response
 */
export function createApiResponse<T>(
  data: T,
  options: {
    status?: number;
    headers?: Record<string, string>;
  } = {}
) {
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
 * Creates a standardized API error response
 */
export function createApiErrorResponse(
  error: string | Error,
  options: {
    status?: number;
    details?: unknown;
    headers?: Record<string, string>;
  } = {}
) {
  const { status = 500, details, headers = {} } = options;
  const errorMessage = error instanceof Error ? error.message : error;

  const responseBody: Record<string, unknown> = {
    error: errorMessage,
    timestamp: new Date().toISOString(),
  };

  if (details) {
    responseBody.details = details;
  }

  return NextResponse.json(responseBody, {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}

/**
 * Returns static headers for caching and security
 */
export function getStaticHeaders(maxAge = 3600) {
  return {
    'Cache-Control': `public, max-age=${maxAge}, s-maxage=${maxAge}, stale-while-revalidate=${maxAge * 2}`,
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
  };
}

// Bot configuration
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
  ],
  disallowedPaths: ['/api/*', '/admin/*', '/private/*'],
  crawlDelay: 1,

  // Bot-specific configurations
  general: {
    userAgent: '*',
    crawlDelay: 1,
  },
  googlebot: {
    userAgent: 'Googlebot',
    crawlDelay: 1,
  },
  bingbot: {
    userAgent: 'Bingbot',
    crawlDelay: 1,
  },
  gptbot: {
    userAgent: 'GPTBot',
    crawlDelay: 2,
  },
  otherBots: {
    userAgent: ['Yandexbot', 'Baiduspider', 'DuckDuckBot', 'Slurp'],
    crawlDelay: 2,
  },
  securityScanners: {
    userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'YandexBot', 'Nimbostratus-Bot'],
    crawlDelay: 10,
  },
};

// Allowed origins for CORS
export const ALLOWED_ORIGINS = [
  'https://zacharyroth.com',
  'https://www.zacharyroth.com',
  'http://localhost:3000',
];
