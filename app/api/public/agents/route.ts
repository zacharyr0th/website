/**
 * Dynamic Agents.json Generator
 *
 * This API route dynamically generates the agents.json file with values from the site configuration.
 * It uses a more efficient approach by defining the JSON structure directly in code.
 */

import { NextResponse } from 'next/server';
import { SITE_INFO } from '@/lib';
import { CACHE_CONFIG } from '@/lib/config/site.config';
import { errorHandler } from '@/lib/errors/handler';
import { ApiError, ErrorCategory, ErrorSeverity } from '@/lib/errors/types';

// Force static generation with revalidation
export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours, value from CACHE_CONFIG.agents.revalidate

export async function GET() {
  try {
    const agents = {
      name: SITE_INFO.name,
      description: SITE_INFO.description,
      url: SITE_INFO.url,
      type: 'personal',
      endpoints: {
        robots: `${SITE_INFO.url}/api/public/robots`,
        sitemap: `${SITE_INFO.url}/api/public/sitemap`,
        rss: `${SITE_INFO.url}/rss.xml`,
      },
      social: {
        twitter: SITE_INFO.twitterHandle,
      },
      organization: SITE_INFO.organization,
    };

    return new NextResponse(JSON.stringify(agents, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        ...CACHE_CONFIG.agents.headers,
      },
    });
  } catch (error) {
    // Handle specific error types
    if (error instanceof ApiError) {
      errorHandler.report(error, {
        source: 'agents.route',
        category: ErrorCategory.API,
        severity: ErrorSeverity.ERROR,
      });

      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: error.statusCode,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Handle unknown errors
    const appError = new ApiError('Failed to generate agents data', 500, {
      source: 'agents.route',
      severity: ErrorSeverity.ERROR,
      metadata: {
        originalError: error instanceof Error ? error.message : 'Unknown error',
      },
    });

    errorHandler.report(appError);

    return new NextResponse(JSON.stringify({ error: 'Failed to generate agents data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
