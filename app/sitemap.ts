import type { MetadataRoute } from 'next';
import { getArticles } from '@/writing/components/articles/articles';
import { PROJECTS } from '@/projects/data/projects';

// Force static generation for better performance
export const dynamic = 'force-static';

// Define types for route configurations
type RouteConfig = {
  route: string;
  priority: number;
  changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency'];
  isSecure?: boolean;
};

// Define static route configurations
const STATIC_ROUTES: RouteConfig[] = [
  { route: '', priority: 1.0, changeFrequency: 'daily', isSecure: false },
  { route: '/writing', priority: 0.9, changeFrequency: 'daily', isSecure: false },
  { route: '/projects', priority: 0.8, changeFrequency: 'daily', isSecure: false },
  { route: '/audio', priority: 0.8, changeFrequency: 'daily', isSecure: false },
  { route: '/audio/archive', priority: 0.7, changeFrequency: 'weekly', isSecure: false },
] as const;

// Only include public API routes
const API_ROUTES: RouteConfig[] = [
  { route: '/api/public/articles', priority: 0.6, changeFrequency: 'hourly', isSecure: false },
  { route: '/api/public/projects', priority: 0.6, changeFrequency: 'hourly', isSecure: false },
] as const;

const RESOURCE_ROUTES: RouteConfig[] = [
  { route: '/manifest.json', priority: 0.4, changeFrequency: 'monthly', isSecure: false },
  { route: '/robots.txt', priority: 0.4, changeFrequency: 'monthly', isSecure: false },
  { route: '/sitemap.xml', priority: 0.4, changeFrequency: 'monthly', isSecure: false },
  {
    route: '/.well-known/security.txt',
    priority: 0.4,
    changeFrequency: 'monthly',
    isSecure: false,
  },
] as const;

// Security patterns from middleware
const SENSITIVE_ROUTE_PATTERN = /^\/api\/(auth|admin|protected|private|internal|analytics|draft)/;

// Helper function to create sitemap entries
function createSitemapEntry(
  baseUrl: string,
  { route, priority, changeFrequency, isSecure }: RouteConfig,
  lastModified: Date = new Date()
): MetadataRoute.Sitemap[number] | null {
  // Skip sensitive routes
  if (isSecure || SENSITIVE_ROUTE_PATTERN.test(route)) {
    return null;
  }

  return {
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: changeFrequency || 'daily',
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    `http://${process.env.DEVELOPMENT_HOST || 'localhost'}:${process.env.DEVELOPMENT_PORT || '3000'}`;

  // Fetch dynamic data in parallel
  const [articles, projects] = await Promise.all([
    getArticles(),
    Promise.resolve(PROJECTS), // Wrap in Promise for consistency
  ]);

  // Generate static route entries
  const staticRoutes = STATIC_ROUTES.map((config) => createSitemapEntry(baseUrl, config)).filter(
    (entry): entry is MetadataRoute.Sitemap[number] => entry !== null
  );

  // Generate article route entries, excluding drafts
  const articleRoutes = articles
    .filter((article) => !article.draft)
    .map((article) => ({
      url: `${baseUrl}/writing/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: 'weekly' as const,
      priority: article.featured ? 0.9 : 0.6,
    }));

  // Generate project route entries, excluding work in progress projects
  const projectRoutes = projects
    .filter((project) => project.status === 'completed' || project.status === 'Functional')
    .map((project) => ({
      url: `${baseUrl}/projects/${project.id}`,
      lastModified: project.publishDate ? new Date(project.publishDate) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  // Generate API route entries
  const apiRoutes = API_ROUTES.map((config) => createSitemapEntry(baseUrl, config)).filter(
    (entry): entry is MetadataRoute.Sitemap[number] => entry !== null
  );

  // Generate resource route entries
  const resourceRoutes = RESOURCE_ROUTES.map((config) =>
    createSitemapEntry(baseUrl, config)
  ).filter((entry): entry is MetadataRoute.Sitemap[number] => entry !== null);

  // Combine all routes, sort by priority, and ensure no sensitive routes are included
  return [...staticRoutes, ...articleRoutes, ...projectRoutes, ...apiRoutes, ...resourceRoutes]
    .filter((route) => !SENSITIVE_ROUTE_PATTERN.test(route.url))
    .sort((a, b) => (b.priority || 0) - (a.priority || 0));
}
