import type { MetadataRoute } from 'next';
import { getArticles } from './writing/lib/articles';

export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate daily

const BASE_URL = 'https://www.zacharyr0th.com';

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  {
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  },
  {
    url: `${BASE_URL}/writing`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/projects`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/bio`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/audio`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Get all articles with error handling
    const articles = await getArticles().catch((error) => {
      console.error('Error fetching articles for sitemap:', error);
      return [];
    });

    // Generate article URLs with proper typing
    const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
      url: `${BASE_URL}/writing/${article.slug}`,
      lastModified: article.date ? new Date(article.date) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    return [...STATIC_ROUTES, ...articleUrls];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static routes if article fetching fails
    return STATIC_ROUTES;
  }
}
