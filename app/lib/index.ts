/**
 * Library Index
 *
 * Central export point for all library modules.
 * Organized by domain for better code organization and maintainability.
 * Uses explicit exports to ensure proper tree-shaking.
 */

// =========================================
// Type Exports
// =========================================

// Core Types
export type {
  ID,
  DateString,
  URLString,
  Primitive,
  JSONValue,
  JSONObject,
  JSONArray,
  NavItem,
  NavItems,
  WritingProject,
  ApiResponse,
  PaginatedResponse,
  AppError,
  AppConfig,
  LogContext,
  BaseProps,
  ButtonProps,
  FormField,
} from './utils';

// Animation Types
export type {
  MotionProps,
  AnimationVariant,
  AnimationOptions,
  ViewportOptions,
} from './animations';

// Social Types
export type { SocialLink, SocialPlatform } from './social';

// Article Types
export type {
  Article,
  ArticleCategory,
  ArticleTag,
  ArticleFrontmatter,
  ArticleImage,
  FetchArticlesOptions,
} from '../../components/writing-page/types';

// =========================================
// Constants & Configuration
// =========================================

// Site Configuration
export { SECTION_METADATA, metadata } from './config/seo.config';
export { SITE_INFO, PROFILE_IMAGE } from './config/site.config';
export { viewport } from './config/viewport.config';

// Social Media Configuration
export { SOCIAL_LINKS, SocialPlatforms, PRIMARY_SOCIAL_PLATFORMS } from './social';

// Security & API Configuration
export { SECURITY } from './api/security';
export { ROUTES } from './api/routes';
export {
  BOT_CONFIG,
  ALLOWED_ORIGINS,
  createApiResponse,
  createApiErrorResponse,
  getStaticHeaders,
} from './api/api';

// Animation Configuration
export { DEFAULT_ANIMATION_CONFIG, DEFAULT_VIEWPORT_OPTIONS } from './animations';

// =========================================
// Function Exports
// =========================================

// Core Utilities
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
  getDeviceAppropriateHandlers,
  HOVER_MEDIA_CLASS,
} from './utils';

// Animation Utilities
export { createAnimation, animations, useScrollAnimation } from './animations';

// Social Media Utilities
export {
  getActiveSocialLinks,
  getPrimarySocialLinks,
  getSharingPlatforms,
  formatSocialUsername,
  clearSocialCaches,
} from './social';

// Article Utilities
export { getArticles, getArticleBySlug as getArticle, getAdjacentArticles } from '../writing/lib';

// =========================================
// Error Handling
// =========================================

export { ErrorBoundary } from './errors/ErrorBoundary';

export {
  useErrorHandling,
  useAsyncErrorHandler,
  useApiErrorHandler,
  useValidationErrorHandler,
} from './errors/hooks';

export { errorHandler, ErrorHandlerService, type ErrorHandler } from './errors/handler';

// =========================================
// Server-only Exports
// These exports are only available in server components
// =========================================
export type {
  FileStats,
  FileStreamData,
  Result,
  FileStatsResult,
  FileStreamResult,
} from './server';

// Do not export server-side functions directly
// They should be imported from './server' in server components only
