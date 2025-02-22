import { NextResponse } from 'next/server';
import { createLogger, LogCategory } from '@/lib/core';
import { ErrorType } from '@/lib/security/types';
import { z } from 'zod';

const logger = createLogger('api:audio:sign-url', { category: LogCategory.API });

// Simple request schema
const requestSchema = z.object({
  key: z.string().regex(/^[a-zA-Z0-9-_/]+$/),
  format: z.enum(['mp3', 'm4a', 'wav']).optional(),
});

export async function GET(request: Request) {
  try {
    // Parse and validate request parameters
    const params = Object.fromEntries(new URL(request.url).searchParams);
    const result = requestSchema.safeParse(params);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request parameters', type: ErrorType.VALIDATION_ERROR },
        { status: 400 }
      );
    }

    const { key, format = 'm4a' } = result.data;

    // Return URL to our streaming endpoint
    const streamUrl = new URL('/api/audio/stream', request.url);
    streamUrl.searchParams.set('key', key);
    streamUrl.searchParams.set('format', format);

    return NextResponse.json(
      { url: streamUrl.toString() },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unexpected error');
    logger.error('Unexpected error', err);
    return NextResponse.json(
      { error: 'Internal server error', type: ErrorType.INTERNAL_ERROR },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests
export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin');
  const response = new NextResponse(null, { status: 204 });
  if (origin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Range, Content-Type');
    response.headers.set('Access-Control-Max-Age', '3600');
  }
  return response;
}
