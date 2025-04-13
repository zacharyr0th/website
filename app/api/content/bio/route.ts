import path from 'path';
import fs from 'fs/promises';
import {
  createLogger,
  LogCategory,
  createApiResponse,
  createApiErrorResponse,
  getStaticHeaders,
} from '@/lib';
import type { ApiErrorDetails } from '@/lib/api/api';

const logger = createLogger('bio-api', { category: LogCategory.API });

// Validate environment variables
const validateEnvironment = () => {
  const requiredVars = {
    BIO_FILE_PATH: process.env.BIO_FILE_PATH || path.join(process.cwd(), 'app/bio/fullbio.md'),
  };

  // Validate file path
  const bioPath = requiredVars.BIO_FILE_PATH;
  if (!bioPath || !bioPath.endsWith('.md') || !bioPath.includes('bio')) {
    throw new Error('Invalid bio file path');
  }

  // Resolve to absolute path and validate
  const resolvedPath = path.resolve(bioPath);
  if (!resolvedPath.includes(process.cwd())) {
    throw new Error('Bio file must be within project directory');
  }

  return { BIO_FILE_PATH: resolvedPath };
};

const env = validateEnvironment();

// Get secure file path for bio
function getSecureBioPath(): string | null {
  const filePath = env.BIO_FILE_PATH;
  const resolvedPath = path.resolve(filePath);

  if (!resolvedPath.startsWith(process.cwd()) || !resolvedPath.endsWith('.md')) {
    return null;
  }

  return resolvedPath;
}

// Securely read a file with path validation
async function readFileSecurely(filePath: string) {
  try {
    // Validate path is within project directory
    const resolvedPath = path.resolve(filePath);
    const projectRoot = process.cwd();

    if (!resolvedPath.startsWith(projectRoot)) {
      return {
        success: false,
        error: 'Path traversal attempt detected',
      };
    }

    // Read file
    const content = await fs.readFile(filePath, 'utf-8');

    return {
      success: true,
      data: content,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error reading file',
    };
  }
}

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    logger.info('Fetching bio content...');

    // Get secure file path
    const filePath = getSecureBioPath();
    if (!filePath) {
      return createApiErrorResponse('Invalid bio file path', { status: 400 });
    }

    // Read and process bio
    const fileResult = await readFileSecurely(filePath);
    if (!fileResult.success) {
      const err = new Error(String(fileResult.error));
      logger.error('Failed to read bio file', err);
      return createApiErrorResponse('Bio file not found', { status: 404 });
    }

    if (typeof fileResult.data !== 'string') {
      logger.error('Invalid file content type', undefined, { type: typeof fileResult.data });
      return createApiErrorResponse('Invalid file content', { status: 500 });
    }

    // Get security headers
    const securityHeaders = getStaticHeaders(3600); // 1 hour cache

    return createApiResponse(fileResult.data, {
      headers: {
        ...securityHeaders,
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    logger.error('Error in bio API route', err, {
      timestamp:
        new Date().toISOString() as `${number}-${number}-${number}T${number}:${number}:${number}Z`,
    });

    return createApiErrorResponse('Failed to load bio', {
      status: 500,
      ...(process.env.NODE_ENV === 'development'
        ? { details: { message: err.message, stack: err.stack } as ApiErrorDetails }
        : {}),
    });
  }
}
