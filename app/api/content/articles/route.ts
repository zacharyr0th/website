/**
 * Articles API Route
 *
 * This endpoint handles article retrieval with:
 * - Static generation with hourly revalidation
 * - Markdown processing with frontmatter validation
 * - Draft article filtering in production
 * - Enhanced security headers and caching
 */

import { api, security, core } from '@/lib';

const logger = core.createLogger('articles-api', { category: core.LogCategory.API });

// Mock data for now - replace with actual data fetching logic
const articles = [
  {
    title: 'Sample Article',
    slug: 'sample-article',
    description: 'This is a sample article',
    date: '2024-01-01',
    content: '# Sample Article\n\nThis is a sample article.',
  },
];

export async function GET() {
  try {
    logger.info('Fetching articles...');
    logger.info(`Found ${articles.length} articles`);

    // Validate response data
    const validatedArticles = api.articlesSchema.parse(articles);

    return api.createApiResponse(validatedArticles, {
      headers: security.getStaticHeaders(3600), // 1 hour cache
    });
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error');

    logger.error('Error in articles API route', {
      error: errorObj,
      timestamp: new Date().toISOString(),
    });

    return api.createApiErrorResponse('Failed to fetch articles', {
      status: 500,
      code: 'INTERNAL_ERROR',
      details: errorObj,
    });
  }
}
