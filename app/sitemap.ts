import type { MetadataRoute } from 'next';
import { getArticles } from './writing/[slug]/articles';

/**
 * Type definitions for sitemap configuration
 */
type ChangeFrequency = 'daily' | 'weekly' | 'monthly';

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
const ROUTE_CONFIGS: readonly RouteConfig[] = [
  { path: '', changeFrequency: 'daily', priority: 1.0 },
  { path: '/writing', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/projects', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/bio', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/audio', changeFrequency: 'monthly', priority: 0.6 },
] as const;

export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate daily

/**
 * Generates static route entries for the sitemap
 */
const generateStaticRoutes = (config: SitemapConfig): MetadataRoute.Sitemap =>
  ROUTE_CONFIGS.map(({ path, changeFrequency, priority }) => ({
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
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error generating article routes:', error);
    return [];
  }
};

/**
 * Generates the complete sitemap for the website
 * @returns Promise<MetadataRoute.Sitemap> - The complete sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [staticRoutes, articleRoutes] = await Promise.all([
    generateStaticRoutes(SITEMAP_CONFIG),
    generateArticleRoutes(SITEMAP_CONFIG),
  ]);

  return [...staticRoutes, ...articleRoutes];
}
