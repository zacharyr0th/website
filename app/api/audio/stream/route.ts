import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getFileStats, getFileStream, constructAudioKey } from '@/lib/server';

// Simple logger function
const log = (
  level: 'debug' | 'info' | 'warn' | 'error',
  message: string,
  data?: Record<string, unknown>
) => {
  const timestamp = new Date().toISOString();
  console[level](`[${timestamp}] [audio-stream] ${message}`, data || '');
};

// Request validation schema
const requestSchema = z.object({
  key: z.string().regex(/^[a-zA-Z0-9-_/]+$/),
  format: z.enum(['mp3', 'm4a', 'wav']).optional(),
});

// MIME type mapping
const mimeTypes = {
  mp3: 'audio/mpeg',
  m4a: 'audio/mp4',
  wav: 'audio/wav',
} as const;

// Create a simple error response
function createErrorResponse(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function GET(request: Request) {
  const requestId = crypto.randomUUID();

  try {
    // Parse and validate request parameters
    const params = Object.fromEntries(new URL(request.url).searchParams);
    const result = requestSchema.safeParse(params);

    if (!result.success) {
      log('warn', 'Invalid request parameters', {
        requestId,
        validation: JSON.stringify(result.error.issues),
        requestParams: JSON.stringify(params),
      });
      return createErrorResponse('Invalid request parameters', 400);
    }

    const { key, format = 'm4a' } = result.data;
    const range = request.headers.get('range');

    // Split the key to get category and filename
    // Expected format: "piano/nocturne-1"
    const [category, filename] = key.split('/');

    if (!category || !filename) {
      log('warn', 'Invalid key format', { requestId, key });
      return createErrorResponse('Invalid key format', 400);
    }

    // Construct the object storage key
    const objectKey = constructAudioKey(category, filename, format);

    // Log request details
    log('info', 'Processing audio stream request', {
      requestId,
      key,
      format,
      objectKey,
      rangeHeader: range || 'none',
    });

    // Get file stats first
    const statsResult = await getFileStats(objectKey);
    if (!statsResult.success) {
      log('error', 'Failed to get file stats', {
        requestId,
        path: objectKey,
        error: statsResult.error,
      });
      return createErrorResponse('Audio file not found', 404);
    }

    // Add null check for statsResult.data
    if (!statsResult.data) {
      log('error', 'File stats data is missing', { requestId, path: objectKey });
      return createErrorResponse('Audio file metadata not available', 500);
    }

    const fileSize = statsResult.data.size;

    // Handle range request
    let start = 0;
    let end = fileSize - 1;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      start = parseInt(parts[0] || '0', 10);
      end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (isNaN(start) || isNaN(end) || start >= fileSize || end >= fileSize || start > end) {
        log('warn', 'Invalid range request', {
          requestId,
          rangeHeader: range,
          fileSize: fileSize.toString(),
          startByte: start.toString(),
          endByte: end.toString(),
        });
        return createErrorResponse('Invalid range', 416);
      }
    }

    // Create stream
    const streamResult = await getFileStream(objectKey, range || undefined);

    if (!streamResult.success) {
      log('error', 'Failed to create stream', {
        requestId,
        path: objectKey,
        rangeInfo: range ? `${start}-${end}` : 'none',
        error: streamResult.error,
      });
      return createErrorResponse('Failed to stream audio', 500);
    }

    // Add null check for streamResult.data
    if (!streamResult.data) {
      log('error', 'Stream data is missing', { requestId, path: objectKey });
      return createErrorResponse('Audio stream data not available', 500);
    }

    // Set response headers
    const headers = new Headers({
      'Content-Type':
        streamResult.data.contentType || mimeTypes[format as keyof typeof mimeTypes] || 'audio/mp4',
      'Content-Length': (end - start + 1).toString(),
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Range, Content-Type, Origin',
      'Access-Control-Expose-Headers': 'Content-Length, Content-Range, Content-Type',
    });

    if (range) {
      headers.set('Content-Range', `bytes ${start}-${end}/${fileSize}`);
    }

    // Log successful response
    log('debug', 'Streaming audio file', {
      requestId,
      key,
      format,
      fileSize: fileSize.toString(),
      rangeInfo: range ? `${start}-${end}` : 'full',
    });

    // Return streaming response
    return new Response(streamResult.data.stream as unknown as ReadableStream, {
      status: range ? 206 : 200,
      headers,
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    log('error', 'Unexpected error in stream route', {
      requestId,
      error: err.message,
      stack: err.stack || 'No stack trace',
    });
    return createErrorResponse('Internal server error', 500);
  }
}

// Handle OPTIONS requests for CORS
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
