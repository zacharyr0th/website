import path from 'path';
import { processMarkdown } from '@/bio/lib/markdown';
import { api, core, security } from '@/lib';
import { readFileSecure } from '@/lib/server';

const logger = core.createLogger('bio-api', { category: core.LogCategory.API });

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

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    logger.info('Fetching bio content...');

    // Get secure file path
    const filePath = getSecureBioPath();
    if (!filePath) {
      return api.createApiErrorResponse('Invalid bio file path', { status: 400 });
    }

    // Read and process bio
    const fileResult = await readFileSecure(filePath);
    if (!fileResult.success) {
      const err = new Error(String(fileResult.error));
      logger.error('Failed to read bio file', err);
      return api.createApiErrorResponse('Bio file not found', { status: 404 });
    }

    if (typeof fileResult.data !== 'string') {
      logger.error('Invalid file content type', undefined, { type: typeof fileResult.data });
      return api.createApiErrorResponse('Invalid file content', { status: 500 });
    }

    const processedContent = await processMarkdown(fileResult.data);

    // Get security headers
    const securityHeaders = security.getStaticHeaders(3600); // 1 hour cache

    return api.createApiResponse(processedContent, {
      headers: {
        // Override the Content-Type from security headers with text/html
        ...securityHeaders,
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    logger.error('Error in bio API route', err, {
      timestamp: new Date().toISOString(),
    });

    return api.createApiErrorResponse('Failed to load bio', {
      status: 500,
      details: process.env.NODE_ENV === 'development' ? err : undefined,
    });
  }
}
