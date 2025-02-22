import { NextResponse } from 'next/server';
import { security } from '@/lib';
import type { ApiResponse, ApiErrorResponse } from './types';

// Cache control constants
export const CACHE_CONTROL = {
  PRIVATE: 'private, no-cache, no-store, must-revalidate',
  PUBLIC: 'public, max-age=31536000, immutable',
  DYNAMIC: 'public, max-age=3600, stale-while-revalidate=86400',
} as const;

// Response options
export interface ResponseOptions {
  status?: number;
  headers?: Record<string, string>;
}

export interface ErrorResponseOptions extends ResponseOptions {
  code?: string;
  details?: unknown;
}

// Create successful API response
export function createApiResponse<T>(
  data: T,
  options: ResponseOptions = {}
): NextResponse<ApiResponse<T>> {
  const { status = 200, headers = {} } = options;

  return NextResponse.json(
    { data },
    {
      status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': CACHE_CONTROL.PRIVATE,
        ...security.getApiHeaders(),
        ...headers,
      },
    }
  );
}

// Create error API response
export function createApiErrorResponse(
  message: string,
  options: ErrorResponseOptions = {}
): NextResponse<ApiErrorResponse> {
  const { status = 500, code = 'INTERNAL_ERROR', details, headers = {} } = options;

  return NextResponse.json(
    {
      error: {
        code,
        message,
        details,
      },
    },
    {
      status,
      headers: {
        'Content-Type': 'application/problem+json',
        'Cache-Control': CACHE_CONTROL.PRIVATE,
        ...security.getErrorHeaders(),
        ...headers,
      },
    }
  );
}
