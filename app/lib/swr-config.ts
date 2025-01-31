/**
 * Centralized SWR Configuration
 * 
 * This file contains the global SWR configuration used across the application.
 * It provides consistent caching and revalidation strategies.
 */

export const SWR_CONFIG = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 0,
  dedupingInterval: 3600000, // 1 hour
  errorRetryCount: 3,
  errorRetryInterval: 5000, // 5 seconds
} as const;

// Article-specific cache configuration
export const ARTICLE_CACHE_CONFIG = {
  ...SWR_CONFIG,
  dedupingInterval: 3600000, // 1 hour
  staleWhileRevalidate: 86400000, // 24 hours
} as const; 