/**
 * Writing section utilities
 * Re-exports from the article module with better organization
 */

// Core article handling
export { getArticles, getArticleBySlug, getAdjacentArticles, getArticleFiles } from './articles';

// Content processing
export { parseArticleFile, processFrontmatter } from './articles';

// Helper functions
export { formatDate } from './articles';
