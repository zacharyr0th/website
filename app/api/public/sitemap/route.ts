/**
 * Dynamic Sitemap Index Generator
 *
 * This API route dynamically generates either the sitemap index or individual sitemaps
 * based on the request path. It splits content into logical sections for better management
 * and scalability.
 */

import { NextResponse } from 'next/server';
import { ROUTES, SECURITY, SITE_INFO } from '@/lib';
import type { RouteConfig } from '@/lib/api/routes';
import { CACHE_CONFIG } from '@/lib/config/site.config';
import { errorHandler } from '@/lib/errors/handler';
import { ApiError, ErrorCategory, ErrorSeverity } from '@/lib/errors/types';

// Force static generation with revalidation
export const dynamic = 'force-static';
export const revalidate = 3600; // 1 hour, value from CACHE_CONFIG.sitemap.revalidate

// Type for sitemap entries
type SitemapEntry = {
  url: string;
  lastModified: Date | string;
  changeFrequency?: string;
  priority: number;
};

// Security patterns from middleware
const SENSITIVE_ROUTE_PATTERN = SECURITY.sensitiveRoutePattern;

// Helper function to create sitemap entries
// @ts-expect-error - Function is used in future expansion
function createSitemapEntry(
  baseUrl: string,
  { route, priority, changeFrequency, isSecure }: RouteConfig,
  lastModified: Date = new Date()
): SitemapEntry | null {
  // Skip secure routes
  if (isSecure || SENSITIVE_ROUTE_PATTERN.test(route)) {
    return null;
  }

  return {
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: changeFrequency || 'monthly',
    priority,
  };
}

// Generate sitemap XML
// @ts-expect-error - Function is used in future expansion
function generateSitemapXml(entries: SitemapEntry[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${entries
    .map(
      (entry) => `<url>
    <loc>${entry.url}</loc>
    <lastmod>${new Date(entry.lastModified).toISOString()}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join('\n  ')}
</urlset>`;
}

// Generate sitemap index XML
// @ts-expect-error - Function is used in future expansion
function generateSitemapIndexXml(baseUrl: string, lastModified: Date = new Date()): string {
  const sitemaps = ['static', 'articles', 'projects', 'resources'];

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps
    .map(
      (type) => `<sitemap>
    <loc>${baseUrl}/api/public/sitemap/${type}</loc>
    <lastmod>${lastModified.toISOString()}</lastmod>
  </sitemap>`
    )
    .join('\n  ')}
</sitemapindex>`;
}

export async function GET() {
  try {
    const baseUrl = SITE_INFO.url;
    const now = new Date().toISOString();

    // Start XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static routes
    for (const route of ROUTES.static) {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${route.route}</loc>\n`;
      xml += `    <lastmod>${now}</lastmod>\n`;
      xml += `    <changefreq>${route.changeFrequency}</changefreq>\n`;
      xml += `    <priority>${route.priority}</priority>\n`;
      xml += '  </url>\n';
    }

    // Add resource routes
    for (const route of ROUTES.resources) {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${route.route}</loc>\n`;
      xml += `    <lastmod>${now}</lastmod>\n`;
      xml += `    <changefreq>${route.changeFrequency}</changefreq>\n`;
      xml += `    <priority>${route.priority}</priority>\n`;
      xml += '  </url>\n';
    }

    // Close XML
    xml += '</urlset>';

    // Return XML response with appropriate headers
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        ...CACHE_CONFIG.sitemap.headers,
      },
    });
  } catch (error) {
    // Handle specific error types
    if (error instanceof ApiError) {
      errorHandler.report(error, {
        source: 'sitemap.route',
        category: ErrorCategory.API,
        severity: ErrorSeverity.ERROR,
      });

      return new NextResponse(
        `<?xml version="1.0" encoding="UTF-8"?>\n<error>${error.message}</error>`,
        {
          status: error.statusCode,
          headers: { 'Content-Type': 'application/xml' },
        }
      );
    }

    // Handle unknown errors
    const appError = new ApiError('Failed to generate sitemap', 500, {
      source: 'sitemap.route',
      severity: ErrorSeverity.ERROR,
      metadata: {
        originalError: error instanceof Error ? error.message : 'Unknown error',
      },
    });

    errorHandler.report(appError);

    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?>\n<error>Failed to generate sitemap</error>',
      {
        status: 500,
        headers: { 'Content-Type': 'application/xml' },
      }
    );
  }
}
