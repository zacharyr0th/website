import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';
import { createLogger, LogCategory } from '@/lib/core';
import {
  validateRequest,
  withSecureMemory,
  createSecureReference,
  SECURITY_MEMORY_LIMITS,
  createErrorResponse,
  getRequestIp,
} from '@/lib/security';
import { ErrorType } from '@/lib/security/types';
import { audioRequestSchema } from '@/lib/api/schemas';
import { z } from 'zod';

const logger = createLogger('api:audio:sign-url', { category: LogCategory.API });

// Validate environment variables
const validateEnvironment = () => {
  const requiredVars = {
    STORAGE_ACCESS_KEY: process.env.STORAGE_ACCESS_KEY,
    STORAGE_SECRET_KEY: process.env.STORAGE_SECRET_KEY,
    STORAGE_BUCKET_NAME: process.env.STORAGE_BUCKET_NAME,
    STORAGE_ENDPOINT: process.env.STORAGE_ENDPOINT,
    STORAGE_REGION: process.env.STORAGE_REGION || 'us-east-1',
  };

  const missingVars = Object.entries(requiredVars)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  return requiredVars as { [K in keyof typeof requiredVars]: string };
};

const env = validateEnvironment();

const s3Client = new S3Client({
  endpoint: env.STORAGE_ENDPOINT,
  region: env.STORAGE_REGION,
  credentials: {
    accessKeyId: env.STORAGE_ACCESS_KEY,
    secretAccessKey: env.STORAGE_SECRET_KEY,
  },
  forcePathStyle: true,
});

// Helper function to add CORS headers
const addCorsHeaders = (response: NextResponse, origin?: string | null) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'https://zacharyr0th.com',
    'https://www.zacharyr0th.com',
  ];

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
  response.headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Range, Origin, Content-Type, User-Agent, X-Request-Id'
  );
  response.headers.set('Access-Control-Expose-Headers', 'Content-Range, Content-Length');
  response.headers.set('Access-Control-Max-Age', '3600');
  return response;
};

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin');
  const response = new NextResponse(null, { status: 204 });
  return addCorsHeaders(response, origin);
}

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
    const validationResult = await validateRequest(request, audioRequestSchema);
    if (!validationResult.success) {
      requestLogger.warn('Request validation failed', {
        context: {
          errors: validationResult.errors,
          category: LogCategory.SECURITY,
        },
      });
      return createErrorResponse(ErrorType.VALIDATION_ERROR, 400, 'Invalid request parameters');
    }

    const { key, format } = (validationResult.data as z.infer<typeof audioRequestSchema>).query;

    // Use secure memory for processing
    return await withSecureMemory(SECURITY_MEMORY_LIMITS.DEFAULT, async () => {
      // Construct the full S3 key with the correct prefix and extension
      const s3Key = createSecureReference(`audio/${key.replace('piano/', 'piano/piano_')}.${format}`);

      const command = new GetObjectCommand({
        Bucket: env.STORAGE_BUCKET_NAME,
        Key: s3Key,
        ResponseContentType: format ? `audio/${format}` : 'audio/mp4',
      });

      try {
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

        return NextResponse.json(
          { url },
          {
            status: 200,
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Content-Type': 'application/json',
            },
          }
        );
      } catch (error) {
        requestLogger.error('Failed to generate signed URL', {
          error: new Error('URL generation failed'),
          context: { requestId },
        });
        return createErrorResponse(ErrorType.STORAGE_ERROR, 500, 'Failed to generate signed URL');
      }
    });
  } catch (error) {
    requestLogger.error('Unexpected error', {
      error: new Error('Internal server error'),
      context: {
        requestId,
        category: LogCategory.API,
      },
    });

    return createErrorResponse(ErrorType.INTERNAL_ERROR, 500, 'Internal server error');
  }
}
