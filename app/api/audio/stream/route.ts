import { NextResponse } from 'next/server';
import { createLogger, LogCategory } from '@/lib/core';
import { ErrorType } from '@/lib/security/types';
import { z } from 'zod';
import path from 'path';
import { createSecureReadStream, getFileStatsSecure } from '@/lib/server/file-access';
import type { SecureFileOptions } from '@/lib/server/file-access';
import { security, api } from '@/lib';
import fs from 'fs';

const logger = createLogger('api:audio:stream', { category: LogCategory.API });

// Request validation schema
const requestSchema = z.object({
  key: z.string().regex(/^[a-zA-Z0-9-_/]+$/),
  format: z.enum(['mp3', 'm4a', 'wav']).optional(),
});

// Secure file options
const audioFileOptions: SecureFileOptions = {
  allowedExtensions: ['.mp3', '.m4a', '.wav'],
  requiredPath: path.join(process.cwd(), 'public', 'audio'),
  maxSize: 1024 * 1024 * 50, // 50MB max size
};

// MIME type mapping
const mimeTypes = {
  mp3: 'audio/mpeg',
  m4a: 'audio/mp4',
  wav: 'audio/wav',
} as const;

export async function GET(request: Request) {
  try {
    // Parse and validate request parameters
    const params = Object.fromEntries(new URL(request.url).searchParams);
    const result = requestSchema.safeParse(params);

    if (!result.success) {
      logger.warn('Invalid request parameters', {
        validation: JSON.stringify(result.error.issues),
        requestParams: JSON.stringify(params),
      });
      return api.createApiErrorResponse('Invalid request parameters', {
        status: 400,
        code: ErrorType.VALIDATION_ERROR,
      });
    }

    const { key, format = 'm4a' } = result.data;
    const range = request.headers.get('range');

    // Construct file path
    const audioDir = path.join(process.cwd(), 'public', 'audio');
    const filePath = path.join(audioDir, `${key.replace('piano/', 'piano/piano_')}.${format}`);

    // Log request details
    logger.debug('Processing audio stream request', {
      key,
      format,
      filePath,
      rangeHeader: range || 'none',
    });

    // Get file stats first
    const statsResult = await getFileStatsSecure(filePath, audioFileOptions);
    if (!statsResult.success) {
      const fileExists = await fs.promises
        .access(filePath)
        .then(() => true)
        .catch(() => false);
      const error = new Error(statsResult.error || 'Failed to get file stats');
      logger.error('Failed to get file stats', error, {
        path: filePath,
        exists: fileExists,
      });
      return api.createApiErrorResponse('Audio file not found', {
        status: 404,
        code: ErrorType.NOT_FOUND,
      });
    }

    const fileSize = statsResult.data!.size;

    // Handle range request
    let start = 0;
    let end = fileSize - 1;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      start = parseInt(parts[0] || '0', 10);
      end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (isNaN(start) || isNaN(end) || start >= fileSize || end >= fileSize || start > end) {
        logger.warn('Invalid range request', {
          rangeHeader: range,
          fileSize: fileSize.toString(),
          startByte: start.toString(),
          endByte: end.toString(),
        });
        return api.createApiErrorResponse('Invalid range', {
          status: 416,
          code: ErrorType.VALIDATION_ERROR,
        });
      }
    }

    // Create stream
    const streamResult = createSecureReadStream(filePath, {
      ...audioFileOptions,
      start,
      end,
    });

    if (!streamResult.success) {
      const error = new Error(streamResult.error || 'Failed to create stream');
      logger.error('Failed to create stream', error, {
        path: filePath,
        rangeInfo: range ? `${start}-${end}` : 'none',
      });
      return api.createApiErrorResponse('Failed to stream audio', {
        status: 500,
        code: ErrorType.INTERNAL_ERROR,
      });
    }

    // Get base security headers
    const securityHeaders = security.getBaseSecurityHeaders();

    // Set response headers
    const headers = new Headers({
      ...securityHeaders,
      'Content-Type': mimeTypes[format as keyof typeof mimeTypes] || 'audio/mp4',
      'Content-Length': (end - start + 1).toString(),
      'Accept-Ranges': 'bytes',
      'Cache-Control': api.CACHE_CONTROL.PUBLIC,
      'Cross-Origin-Resource-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    });

    if (range) {
      headers.set('Content-Range', `bytes ${start}-${end}/${fileSize}`);
    }

    // Log successful response
    logger.debug('Streaming audio file', {
      key,
      format,
      fileSize: fileSize.toString(),
      rangeInfo: range ? `${start}-${end}` : 'full',
    });

    // Return streaming response
    return new Response(streamResult.data, {
      status: range ? 206 : 200,
      headers,
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    logger.error('Unexpected error in stream route', err, {
      stack: err.stack || 'No stack trace',
    });
    return api.createApiErrorResponse('Internal server error', {
      status: 500,
      code: ErrorType.INTERNAL_ERROR,
    });
  }
}

// Handle OPTIONS requests for CORS
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
