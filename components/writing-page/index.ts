/**
 * Writing Components
 * Barrel file for the writing section
 */

// Component exports
export { ArticleCard } from './ArticleCard';
export { ArticleContent } from './ArticleContent';
export { MDXContent } from './MDXContent';
export { WritingNav } from './WritingNav';
export { WritingPageClient } from './WritingPageClient';

// Type exports
export type {
  Article,
  ArticleCache,
  ArticleCategory,
  ArticleFrontmatter,
  ArticleImage,
  ArticleTag,
  FetchArticlesOptions,
  AnimationVariants,
} from './types';

// Constant exports
export { ARTICLE_CONFIG, CATEGORIES, CATEGORY_DISPLAY_NAMES, TAGS } from './types';
