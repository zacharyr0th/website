import type { Article } from '../types';

/**
 * Transforms raw article data into the expected format
 * @param slug Article slug
 * @param article Raw article data
 * @returns Transformed article data
 */
export function transformArticleData(slug: string, article: Article): Article {
  return {
    ...article,
    slug,
    link: `/writing/${slug}`,
    content: article.content || '',
    description: article.description || '',
    category: article.category || 'tech',
    tags: article.tags || [],
    image: article.image || { src: '', alt: '' },
    featured: article.featured || false,
    draft: article.draft || false,
    takeaways: article.takeaways || [],
  };
}

export * from './date';
