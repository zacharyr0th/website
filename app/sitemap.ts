import type { MetadataRoute } from 'next';
import { getArticles } from './writing/[slug]/articles';
import { PROJECTS } from './projects/projects';

/**
 * Type definitions for sitemap configuration
 */
type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

interface SitemapConfig {
  readonly baseUrl: string;
  readonly defaultLastModified: Date;
}

interface RouteConfig {
  readonly path: string;
  readonly changeFrequency: ChangeFrequency;
  readonly priority: number;
}

/**
 * Sitemap configuration constants
 */
const SITEMAP_CONFIG: SitemapConfig = {
  baseUrl: 'https://www.zacharyr0th.com',
  defaultLastModified: new Date(),
} as const;

/**
 * Static route configurations
 */
const ROUTE_CONFIGS: Record<string, RouteConfig[]> = {
  main: [
    { path: '', changeFrequency: 'daily', priority: 1.0 },
    { path: '/writing', changeFrequency: 'daily', priority: 0.9 },
    { path: '/projects', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/bio', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/audio', changeFrequency: 'weekly', priority: 0.7 },
  ],
  api: [
    { path: '/api/articles', changeFrequency: 'hourly', priority: 0.6 },
    { path: '/api/projects', changeFrequency: 'daily', priority: 0.6 },
  ],
  resources: [
    { path: '/manifest.json', changeFrequency: 'monthly', priority: 0.4 },
    { path: '/robots.txt', changeFrequency: 'monthly', priority: 0.4 },
    { path: '/sitemap.xml', changeFrequency: 'daily', priority: 0.4 },
  ],
} as const;

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate hourly

/**
 * Generates static route entries for the sitemap
 */
const generateStaticRoutes = (config: SitemapConfig): MetadataRoute.Sitemap =>
  Object.values(ROUTE_CONFIGS)
    .flat()
    .map(({ path, changeFrequency, priority }) => ({
      url: `${config.baseUrl}${path}`,
      lastModified: config.defaultLastModified,
      changeFrequency,
      priority,
    }));

/**
 * Generates article route entries for the sitemap
 */
const generateArticleRoutes = async (
  config: SitemapConfig,
): Promise<MetadataRoute.Sitemap> => {
  try {
    const articles = await getArticles();
    
    return articles.map((article) => ({
      url: `${config.baseUrl}/writing/${article.slug}`,
      lastModified: article.date ? new Date(article.date) : config.defaultLastModified,
      changeFrequency: 'weekly' as const,
      priority: article.frontmatter.featured ? 0.9 : 0.7,
    }));
  } catch (error) {
    console.error('Error generating article routes:', error);
    return [];
  }
};

/**
 * Generates project route entries for the sitemap
 */
const generateProjectRoutes = (config: SitemapConfig): MetadataRoute.Sitemap => {
  return PROJECTS.map((project) => ({
    url: `${config.baseUrl}/projects/${project.id}`,
    lastModified: project.publishDate ? new Date(project.publishDate) : config.defaultLastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
};

/**
 * Generates the complete sitemap for the website
 * @returns Promise<MetadataRoute.Sitemap> - The complete sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [staticRoutes, articleRoutes, projectRoutes] = await Promise.all([
    generateStaticRoutes(SITEMAP_CONFIG),
    generateArticleRoutes(SITEMAP_CONFIG),
    generateProjectRoutes(SITEMAP_CONFIG),
  ]);

  return [...staticRoutes, ...articleRoutes, ...projectRoutes];
}
