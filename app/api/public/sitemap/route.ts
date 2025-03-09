/**
 * Dynamic Sitemap.xml Generator
 *
 * This API route dynamically generates the sitemap.xml file with values from the site configuration.
 * It uses the same logic as the app/sitemap.ts file but serves it as an XML response.
 */

import { NextResponse } from 'next/server';
import { getArticles } from '@/writing/lib';
import { PROJECTS, PROJECT_STATUS } from '@/projects/data/projects';
import { ROUTES, SECURITY } from '@/lib';
import type { RouteConfig } from '@/lib/routes';
import type { Article } from '@/writing/types';

// Force static generation with revalidation
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

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

export async function GET() {
  try {
    // Get base URL from environment or use default
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zacharyr0th.com';

    // Get all articles
    const articles = await getArticles();

    // Generate static route entries
    const staticRoutes = ROUTES.static
      .map((config: RouteConfig) => createSitemapEntry(baseUrl, config))
      .filter((entry: SitemapEntry | null): entry is SitemapEntry => entry !== null);

    // Generate article route entries, excluding drafts
    const articleRoutes = articles
      .filter((article: Article) => !article.frontmatter.draft)
      .map((article: Article) => ({
        url: `${baseUrl}/writing/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: 'weekly',
        priority: article.frontmatter.featured ? 0.9 : 0.6,
      }));

    // Generate project route entries, excluding work in progress projects
    const projectRoutes = PROJECTS.filter((project) => project.status !== PROJECT_STATUS.WIP).map(
      (project) => ({
        url: `${baseUrl}/projects/${project.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    );

    // Generate resource route entries
    const resourceRoutes = ROUTES.resources
      .map((config: RouteConfig) => createSitemapEntry(baseUrl, config))
      .filter((entry: SitemapEntry | null): entry is SitemapEntry => entry !== null);

    // Combine all routes, sort by priority, and ensure no sensitive routes are included
    const allRoutes = [...staticRoutes, ...articleRoutes, ...projectRoutes, ...resourceRoutes].sort(
      (a, b) => b.priority - a.priority
    );

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(
      (route) => `<url>
    <loc>${route.url}</loc>
    <lastmod>${new Date(route.lastModified).toISOString()}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('\n  ')}
</urlset>`;

    // Return XML response
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
