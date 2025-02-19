import type { SWRConfiguration } from 'swr';

// Cache configuration for articles
export const ARTICLE_CACHE_CONFIG = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 60000, // 1 minute
  refreshInterval: 300000, // 5 minutes
  errorRetryCount: 3,
} as const satisfies SWRConfiguration;

// Cache configuration for projects
export const PROJECT_CACHE_CONFIG = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 60000, // 1 minute
  refreshInterval: 300000, // 5 minutes
  errorRetryCount: 3,
} as const satisfies SWRConfiguration;

// Cache configuration for static data
export const STATIC_CACHE_CONFIG = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 3600000, // 1 hour
  refreshInterval: 3600000, // 1 hour
  errorRetryCount: 3,
} as const satisfies SWRConfiguration;
