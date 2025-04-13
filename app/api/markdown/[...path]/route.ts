import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { CACHE_CONFIG } from '@/lib/config/site.config';
import { errorHandler } from '@/lib/errors/handler';
import { ApiError, ErrorCategory, ErrorSeverity } from '@/lib/errors/types';

export const dynamic = 'force-static';
export const revalidate = 3600; // 1 hour, value from CACHE_CONFIG.markdown.revalidate

export async function GET(_request: Request, { params }: { params: { path: string[] } }) {
  try {
    // Join the path segments and ensure it's within the public directory
    const filePath = path.join(process.cwd(), 'public', ...params.path);

    // Security check to prevent directory traversal
    if (!filePath.startsWith(path.join(process.cwd(), 'public'))) {
      throw new ApiError('Invalid file path', 400);
    }

    // Read the markdown file
    const content = await fs.readFile(filePath, 'utf-8');

    // Return the markdown content with appropriate headers
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/markdown',
        ...CACHE_CONFIG.markdown.headers,
      },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      errorHandler.report(error, {
        source: 'markdown.route',
        category: ErrorCategory.API,
        severity: ErrorSeverity.ERROR,
      });

      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: error.statusCode,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Handle file not found
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return new NextResponse(JSON.stringify({ error: 'File not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Handle unknown errors
    const appError = new ApiError('Failed to read markdown file', 500, {
      source: 'markdown.route',
      severity: ErrorSeverity.ERROR,
      metadata: {
        originalError: error instanceof Error ? error.message : 'Unknown error',
        path: params.path,
      },
    });

    errorHandler.report(appError);

    return new NextResponse(JSON.stringify({ error: 'Failed to read markdown file' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
