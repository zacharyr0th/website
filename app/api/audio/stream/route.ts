import { NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import type { GetObjectCommandInput } from '@aws-sdk/client-s3';
import { createLogger } from '@/lib/core';
import {
  validateRequest,
  withSecureMemory,
  createSecureReference,
  SECURITY_MEMORY_LIMITS,
  createErrorResponse,
  ErrorType,
  getRequestIp,
} from '@/lib/security';
import { streamRequestSchema } from '@/lib/api/schemas';
import { z } from 'zod';

const logger = createLogger('api:audio:stream');

// Validate environment variables
const validateEnvironment = () => {
  const requiredVars = {
    STORAGE_BUCKET_NAME: process.env.STORAGE_BUCKET_NAME,
    STORAGE_REGION: process.env.STORAGE_REGION,
  };

  // Validate required variables
  for (const [key, value] of Object.entries(requiredVars)) {
    if (!value) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }

  return requiredVars;
};

const env = validateEnvironment();

// Initialize S3 client
const s3Client = new S3Client({
  region: env.STORAGE_REGION,
});

export async function GET(request: Request) {
  const requestId = crypto.randomUUID();
  const clientIp = getRequestIp(request);

  const requestLogger = logger.child({
    requestId,
    clientIp,
    method: 'GET',
    path: new URL(request.url).pathname,
  });

  try {
    // Validate request using schema
    const validationResult = await validateRequest(request, streamRequestSchema);
    if (!validationResult.success) {
      requestLogger.warn('Request validation failed', {
        error: new Error(validationResult.errors?.[0]?.message || 'Validation failed'),
      });
      return createErrorResponse(ErrorType.VALIDATION_ERROR, 400, 'Invalid request parameters');
    }

    const { key } = (validationResult.data as z.infer<typeof streamRequestSchema>).query;
    const range = (validationResult.data as z.infer<typeof streamRequestSchema>).headers.range;

    // Create secure reference for the file key
    const secureKey = createSecureReference(key);

    // Use secure memory for processing
    return await withSecureMemory(SECURITY_MEMORY_LIMITS.AUDIO_STREAM, async () => {
      try {
        const commandInput: GetObjectCommandInput = {
          Bucket: env.STORAGE_BUCKET_NAME,
          Key: key,
        };

        if (range) {
          commandInput.Range = range;
        }

        const command = new GetObjectCommand(commandInput);

        const { Body, ContentLength, ContentType, ContentRange } = await s3Client.send(command);

        if (!Body) {
          throw new Error('No body returned from S3');
        }

        // Convert readable stream to Response
        const stream = Body as ReadableStream;

        const headers = new Headers({
          'Content-Type': ContentType || 'audio/mpeg',
          'Accept-Ranges': 'bytes',
        });

        if (ContentLength) {
          headers.set('Content-Length', ContentLength.toString());
        }

        if (ContentRange) {
          headers.set('Content-Range', ContentRange);
        }

        // Add security headers
        headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        headers.set('Pragma', 'no-cache');
        headers.set('Expires', '0');

        requestLogger.info('Stream started', {
          metadata: {
            secureKey,
            contentType: ContentType,
            contentLength: ContentLength,
          },
        });

        return new Response(stream, {
          status: range ? 206 : 200,
          headers,
        });
      } catch (error) {
        requestLogger.error('Failed to stream audio', {
          error: error as Error,
          metadata: {
            secureKey,
          },
        });

        return createErrorResponse(ErrorType.STORAGE_ERROR, 500, 'Failed to stream audio file');
      }
    });
  } catch (error) {
    requestLogger.error('Unexpected error', {
      error: error as Error,
    });

    return createErrorResponse(ErrorType.INTERNAL_ERROR, 500, 'Internal server error');
  }
}

// Handle OPTIONS requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Range, Origin, Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
