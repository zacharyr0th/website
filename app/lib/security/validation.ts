import { NextRequest } from 'next/server';
import { VALID_CONTENT_TYPES, ALLOWED_METHODS, SECURITY_SETTINGS } from './constants';
import { z } from 'zod';
import type { ValidationResult } from './types';

// Core validation patterns
const PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{1,255}\.[a-zA-Z]{2,}$/,
  PASSWORD: /^(?=[A-Za-z0-9@$!%*?&]{8,64})(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[^]{8,64}$/,
  USERNAME: /^[\w]{3,20}$/,
  PHONE: /^\+?[\d-]{10,15}$/,
  DATE: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
};

// Basic validation functions
export const validate = {
  email: (email: string) => PATTERNS.EMAIL.test(email),
  password: (password: string) => PATTERNS.PASSWORD.test(password),
  username: (username: string) => PATTERNS.USERNAME.test(username),
  url: (url: string) => {
    try {
      new URL(url);
      return url.startsWith('http://') || url.startsWith('https://');
    } catch {
      return false;
    }
  },
  phone: (phone: string) => PATTERNS.PHONE.test(phone),
  date: (date: string) => PATTERNS.DATE.test(date),
};

/**
 * Comprehensive request validation function that handles both basic request validation
 * and schema-based validation when a schema is provided.
 */
export async function validateRequest(
  request: Request | NextRequest,
  schema?: z.ZodType
): Promise<ValidationResult> {
  try {
    // Basic request validation
    if (request instanceof NextRequest) {
      // Method validation
      if (!ALLOWED_METHODS.includes(request.method as (typeof ALLOWED_METHODS)[number])) {
        return {
          success: false,
          errors: [
            {
              path: ['method'],
              message: `Method ${request.method} is not allowed`,
            },
          ],
        };
      }

      // Content-type validation for mutations
      if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
        const contentType = request.headers.get('content-type')?.split(';')[0];
        if (!contentType || !VALID_CONTENT_TYPES.has(contentType)) {
          return {
            success: false,
            errors: [
              {
                path: ['content-type'],
                message: 'Invalid content type',
              },
            ],
          };
        }

        // Size validation
        const contentLength = parseInt(request.headers.get('content-length') || '0', 10);
        if (contentLength > SECURITY_SETTINGS.MAX_REQUEST_SIZE) {
          return {
            success: false,
            errors: [
              {
                path: ['content-length'],
                message: 'Request body too large',
              },
            ],
          };
        }
      }
    }

    // Schema validation if provided
    if (schema) {
      const url = new URL(request.url);
      const params = Object.fromEntries(url.searchParams);

      const result = await schema.safeParseAsync({
        query: params,
        headers: Object.fromEntries(request.headers.entries()),
        params: {}, // Route params would be injected by Next.js
      });

      if (!result.success) {
        return {
          success: false,
          errors: result.error.errors.map((err) => ({
            path: Array.isArray(err.path) ? err.path.map((p) => String(p)) : [],
            message: err.message,
          })),
        };
      }

      return {
        success: true,
        data: result.data,
      };
    }

    // If no schema provided and basic validation passed
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      errors: [
        {
          path: [],
          message: error instanceof Error ? error.message : 'Validation failed',
        },
      ],
    };
  }
}

// CSP Report Schema
export const cspReportSchema = z.object({
  'csp-report': z.object({
    'document-uri': z.string().url().optional(),
    referrer: z.string().optional(),
    'violated-directive': z.string(),
    'effective-directive': z.string().optional(),
    'original-policy': z.string(),
    'blocked-uri': z.string().optional(),
    'status-code': z.number().optional(),
  }),
});

// Report-To Schema
export const reportToSchema = z.object({
  age: z.number(),
  body: z.object({
    'document-uri': z.string().url().optional(),
    referrer: z.string().optional(),
    'violated-directive': z.string(),
    'effective-directive': z.string().optional(),
    'original-policy': z.string(),
    'blocked-uri': z.string().optional(),
    'status-code': z.number().optional(),
  }),
  type: z.string(),
  url: z.string().url(),
});
