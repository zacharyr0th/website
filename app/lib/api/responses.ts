import { NextResponse } from 'next/server';
import type { ApiResponse, ApiHeaders } from './types';
import { security } from '@/lib';

// Cache control constants
export const CACHE_CONTROL = {
  STATIC: 'public, max-age=31536000, immutable',
  DYNAMIC: 'public, max-age=3600, stale-while-revalidate=86400',
  PRIVATE: 'private, no-cache, no-store, must-revalidate',
  API: {
    PUBLIC: 'public, max-age=60, stale-while-revalidate=600',
    PRIVATE: 'private, no-cache, must-revalidate',
    STATIC: 'public, max-age=3600, stale-while-revalidate=86400',
  },
} as const;

// Compression threshold in bytes
const COMPRESSION_THRESHOLD = 1024; // 1KB

// Helper to get cache control value
const getCacheControl = (cache: keyof typeof CACHE_CONTROL | string): string => {
  if (typeof cache === 'string' && !Object.keys(CACHE_CONTROL).includes(cache)) {
    return cache;
  }
  const value = CACHE_CONTROL[cache as keyof typeof CACHE_CONTROL];
  return typeof value === 'string' ? value : value.PRIVATE;
};

/**
 * Create a standardized API response
 */
export const createApiResponse = <T>(
  data: T,
  options: {
    status?: number;
    cache?: keyof typeof CACHE_CONTROL | string;
    headers?: Partial<ApiHeaders>;
    compress?: boolean;
  } = {}
): NextResponse<ApiResponse<T>> => {
  const { status = 200, cache = 'PRIVATE', headers = {}, compress = true } = options;

  // Prepare response data
  const responseData = { data };
  const responseBody = JSON.stringify(responseData);

  // Determine if response should be compressed
  const shouldCompress =
    compress && responseBody.length > COMPRESSION_THRESHOLD && !headers['Content-Encoding'];

  // Prepare headers
  const responseHeaders: ApiHeaders = {
    'Cache-Control': getCacheControl(cache),
    'Content-Type': 'application/json',
    Vary: 'Accept-Encoding',
    ...security.getApiHeaders(),
    ...headers,
  };

  // Add compression headers if needed
  if (shouldCompress) {
    responseHeaders['Content-Encoding'] = 'gzip';
  }

  return NextResponse.json(responseData, {
    status,
    headers: responseHeaders,
  });
};

/**
 * Create a standardized API error response using RFC 7807 Problem Details
 */
export const createApiErrorResponse = (
  message: string,
  options: {
    status?: number;
    details?: unknown;
    code?: keyof typeof security.ErrorType;
    headers?: Partial<ApiHeaders>;
  } = {}
): NextResponse => {
  const { status = 500, details, headers = {} } = options;

  const traceId = crypto.randomUUID();
  const errorResponse = security.createErrorResponse(
    security.ErrorType.INTERNAL_ERROR,
    status,
    message,
    typeof details !== 'undefined' ? JSON.stringify(details) : undefined
  );

  return NextResponse.json(errorResponse, {
    status,
    headers: {
      'Content-Type': 'application/problem+json',
      'Cache-Control': CACHE_CONTROL.PRIVATE,
      ...security.getErrorHeaders(traceId),
      ...headers,
    },
  });
};
