import { createLogger } from '@/lib/core';
import { ErrorType } from './types';

/**
 * Standard error response following RFC 7807
 */
export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail: string | undefined;
  instance: string | undefined;
  traceId: string;
  timestamp: string;
}

const logger = createLogger('security:error-handling');

interface ErrorResponse {
  type: ErrorType;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
  code?: string;
  errors?: Record<string, string[]>;
}

/**
 * Create a standardized error response
 */
export function createErrorResponse(
  type: ErrorType,
  status: number,
  message: string,
  detail?: string,
  code?: string,
  instance?: string
): Response {
  const errorResponse: ErrorResponse = {
    type,
    title: message,
    status,
    ...(detail && { detail }),
    ...(code && { code }),
    ...(instance && { instance }),
  };

  logger.error('Error response created', {
    error: new Error(message),
    metadata: {
      type: errorResponse.type,
      title: errorResponse.title,
      status: errorResponse.status,
      detail: errorResponse.detail,
      code: errorResponse.code,
      instance: errorResponse.instance,
    },
  });

  return new Response(JSON.stringify(errorResponse), {
    status,
    headers: {
      'Content-Type': 'application/problem+json',
      'X-Error-Code': type,
    },
  });
}

/**
 * Sanitize error messages to prevent information leakage
 */
export function sanitizeErrorMessage(error: Error): string {
  const sensitivePatterns = [/password/i, /secret/i, /token/i, /key/i, /auth/i];

  let message = error.message;
  sensitivePatterns.forEach((pattern) => {
    message = message.replace(pattern, '[REDACTED]');
  });

  return message;
}

/**
 * Get error headers for error responses
 */
export function getErrorHeaders(
  traceId?: string,
  correlationId?: string,
  retryAfter?: number
): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/problem+json',
    'Cache-Control': 'private, no-cache, no-store, must-revalidate',
  };

  if (traceId) {
    headers['X-Trace-Id'] = traceId;
  }

  if (correlationId) {
    headers['X-Correlation-Id'] = correlationId;
  }

  if (retryAfter !== undefined) {
    headers['Retry-After'] = retryAfter.toString();
  }

  return headers;
}
