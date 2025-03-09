/**
 * Library Index
 * 
 * Central export point for all library modules.
 * This file makes imports cleaner by allowing imports from '@/lib' instead of specific files.
 */

// =========================================
// Import all exports from library files
// =========================================

// Article exports
import {
  getArticles,
  getArticleBySlug,
  getAdjacentArticles,
  processArticleContent,
  formatArticleDate
} from '../writing/lib';

// Utility exports
import {
  cn,
  createLogger,
  LogCategory,
  formatDate,
  truncateText,
  slugify,
  isEmpty,
  isValidUrl,
  isTouchDevice,
  getDeviceAppropriateHandlers
} from './utils';

// Metadata exports
import { SECTION_METADATA, SITE_INFO, PROFILE_IMAGE } from './metadata';

// Social exports
import { SOCIAL_LINKS } from './social';

// Security exports
import { SECURITY } from './security';

// Routes exports
import { ROUTES } from './routes';

// =========================================
// Re-export all types
// =========================================

// Article types
export type {
  Article,
  ArticleCategory,
  ArticleTag,
  ArticleFrontmatter,
  ArticleImage,
  FetchArticlesOptions
} from '../writing/types';

// Social types
export type { SocialLink } from './social';

// =========================================
// Re-export all constants
// =========================================

// Section metadata
export { SECTION_METADATA, SITE_INFO, PROFILE_IMAGE };

// Social links
export { SOCIAL_LINKS };

// Security
export { SECURITY };

// Routes
export { ROUTES };

// =========================================
// Re-export all functions
// =========================================

// Article functions
export {
  getArticles,
  getArticleBySlug as getArticle,
  getAdjacentArticles,
  processArticleContent,
  formatArticleDate as articleFormatDate
};

// Utility functions
export {
  cn,
  createLogger,
  LogCategory,
  formatDate,
  truncateText,
  slugify,
  isEmpty,
  isValidUrl,
  isTouchDevice,
  getDeviceAppropriateHandlers
}; 