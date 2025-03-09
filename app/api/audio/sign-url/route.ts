import { NextResponse } from 'next/server';
import { z } from 'zod';

// Simple logger function
const log = (
  level: 'debug' | 'info' | 'warn' | 'error',
  message: string,
  data?: Record<string, unknown>
) => {
  const timestamp = new Date().toISOString();
  console[level](`[${timestamp}] [audio-sign-url] ${message}`, data || '');
};

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
      return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 });
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
    log('error', 'Unexpected error', { error: err.message });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Handle OPTIONS requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Range, Content-Type, Origin',
      'Access-Control-Max-Age': '86400',
    },
  });
}
