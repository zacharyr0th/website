/**
 * API Module
 *
 * This file consolidates API-related functionality including:
 * - Response handling
 * - Headers management
 * - Type definitions
 * - Schema validation
 */
import { NextResponse } from 'next/server';
import { z } from 'zod';

// =========================================
// Types
// =========================================

export interface ApiResponse<T> {
  data: T;
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface ApiHeaders extends Record<string, string> {
  'Cache-Control': string;
  'Content-Type': string;
  Vary?: string;
  'Content-Encoding'?: string;
}

// =========================================
// Headers
// =========================================

export const CACHE_CONTROL = {
  PRIVATE: 'private, no-cache, no-store, must-revalidate',
  PUBLIC: 'public, max-age=31536000, immutable',
  DYNAMIC: 'public, max-age=3600, stale-while-revalidate=86400',
} as const;

export const getSecurityHeaders = () => {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Cache-Control': 'no-store, max-age=0',
    Pragma: 'no-cache',
  };
};

export const getContentHeaders = (maxAge = 3600): Record<string, string> => ({
  ...getSecurityHeaders(),
  'Cache-Control': `public, s-maxage=${maxAge}, stale-while-revalidate=${maxAge * 24}`,
});

// For backward compatibility
export const getApiHeaders = getSecurityHeaders;

// =========================================
// Response Utilities
// =========================================

export interface ResponseOptions {
  status?: number;
  headers?: Record<string, string>;
}

export interface ErrorResponseOptions extends ResponseOptions {
  code?: string;
  details?: unknown;
}

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
        ...getSecurityHeaders(),
        ...headers,
      },
    }
  );
}

export function createApiErrorResponse(
  message: string,
  options: ErrorResponseOptions = {}
): NextResponse<ApiErrorResponse> {
  const { status = 400, code = 'BAD_REQUEST', details, headers = {} } = options;

  return NextResponse.json(
    {
      error: {
        code,
        message,
        ...(details ? { details } : {}),
      },
    },
    {
      status,
      headers: {
        ...getSecurityHeaders(),
        ...headers,
      },
    }
  );
}

// =========================================
// Schemas
// =========================================

// Common image schema
export const imageSchema = z.object({
  src: z.string(),
  alt: z.string().optional(),
});

// Article schemas
export const frontmatterSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.string(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  image: imageSchema.optional(),
  takeaways: z.array(z.string()).optional(),
});

export const articleSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  content: z.string(),
  link: z.string(),
  description: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  image: imageSchema.optional(),
  takeaways: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
  frontmatter: frontmatterSchema,
});

export const articlesSchema = z.array(articleSchema);

// Request schemas
export const audioRequestSchema = z.object({
  query: z.object({
    key: z.string().regex(/^[a-zA-Z0-9-_/]+$/),
    format: z.enum(['mp3', 'm4a', 'wav']).optional(),
    quality: z.enum(['high', 'medium', 'low']).optional(),
  }),
  headers: z.object({
    'x-request-id': z.string().optional(),
    'x-forwarded-for': z.string().optional(),
    'user-agent': z.string(),
  }),
});

export const articleRequestSchema = z.object({
  params: z.object({
    slug: z.string().regex(/^[a-zA-Z0-9-]+$/),
  }),
  query: z
    .object({
      version: z.string().optional(),
      format: z.enum(['html', 'markdown']).optional(),
    })
    .optional(),
  headers: z.object({
    'x-request-id': z.string().optional(),
    'user-agent': z.string(),
  }),
});

export const streamRequestSchema = z.object({
  query: z.object({
    key: z.string().regex(/^[a-zA-Z0-9-_/]+$/),
    range: z
      .string()
      .regex(/^bytes=\d+-\d*$/)
      .optional(),
  }),
  headers: z.object({
    range: z
      .string()
      .regex(/^bytes=\d+-\d*$/)
      .optional(),
    'if-range': z.string().optional(),
    'if-match': z.string().optional(),
    'if-none-match': z.string().optional(),
    'user-agent': z.string(),
  }),
});

// Security schemas
export const cspReportSchema = z.object({
  'csp-report': z.object({
    'document-uri': z.string().url().optional(),
    referrer: z.string().optional(),
    'violated-directive': z.string(),
    'effective-directive': z.string().optional(),
    'original-policy': z.string(),
    'blocked-uri': z.string(),
    'status-code': z.number().optional(),
    'source-file': z.string().optional(),
    'line-number': z.number().optional(),
    'column-number': z.number().optional(),
    disposition: z.enum(['enforce', 'report']).optional(),
  }),
});

// Type exports
export type AudioRequest = z.infer<typeof audioRequestSchema>;
export type ArticleRequest = z.infer<typeof articleRequestSchema>;
export type StreamRequest = z.infer<typeof streamRequestSchema>;
