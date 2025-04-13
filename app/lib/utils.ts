/**
 * Core utility functions with optimized performance and type safety
 *
 * This file contains reusable utility functions for the application,
 * optimized for performance, type safety, and maintainability.
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ===== CONSTANTS =====
const MAX_CACHE_SIZE = 1000;

// ===== TYPE DEFINITIONS =====

// Base Types
export type ID = `${string}-${string}-${string}-${string}-${string}`; // UUID format
export type DateString = `${number}-${number}-${number}T${number}:${number}:${number}Z`; // ISO date format
export type URLString = `${'http' | 'https'}://${string}`; // URL format
export type Primitive = string | number | boolean | null | undefined;
export type JSONValue = Primitive | JSONObject | JSONArray;
export interface JSONObject {
  [key: string]: JSONValue;
}
export type JSONArray = JSONValue[];

// Navigation Types with stricter typing
export interface NavItem {
  label: string;
  href: URLString | `/${string}`;
  icon?: string;
  external?: boolean;
  disabled?: boolean;
  children?: readonly NavItem[];
}

export type NavItems = readonly NavItem[];

// Writing Types with required fields
export interface WritingProject {
  readonly id: ID;
  readonly title: string;
  readonly description: string;
  readonly link: URLString;
  readonly publishedAt?: DateString;
  readonly updatedAt?: DateString;
  readonly author?: string;
  readonly tags?: readonly string[];
  readonly category?: string;
  readonly status: 'draft' | 'published' | 'archived';
  readonly metadata?: Readonly<Record<string, JSONValue>>;
}

// API Response Types with better error handling
export interface ApiResponse<T> {
  readonly data: T;
  readonly error?: string;
  readonly status: number;
  readonly message?: string;
  readonly timestamp: DateString;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly hasMore: boolean;
}

// Error Types with better typing
export interface AppError extends Error {
  readonly code?: `ERR_${string}`;
  readonly status?: number;
  readonly metadata?: Readonly<Record<string, JSONValue>>;
}

// Config Types with environment validation
export interface AppConfig {
  readonly environment: 'development' | 'production' | 'test';
  readonly api: {
    readonly baseUrl: URLString;
    readonly timeout?: number;
    readonly retries?: number;
  };
}

// Logging Types
export interface LogContext extends Record<string, unknown> {
  readonly component?: string;
  readonly timestamp?: DateString;
}

// Component Props Types with better defaults
export interface BaseProps extends Omit<React.HTMLAttributes<HTMLElement>, 'className'> {
  readonly className?: string;
  readonly style?: Readonly<React.CSSProperties>;
}

export interface ButtonProps extends BaseProps {
  readonly variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly loading?: boolean;
  readonly disabled?: boolean;
  readonly onClick?: () => void | Promise<void>;
}

// Form Types with validation
export interface FormField {
  readonly name: string;
  readonly label: string;
  readonly type: 'text' | 'number' | 'email' | 'password' | 'select' | 'textarea';
  readonly required?: boolean;
  readonly placeholder?: string;
  readonly value?: string;
  readonly validation?: RegExp;
}

// ===== LOGGER =====

export enum LogCategory {
  APPLICATION = 'application',
  API = 'api',
  SECURITY = 'security',
  PERFORMANCE = 'performance',
}

export interface Logger {
  readonly debug: (message: string, context?: LogContext) => void;
  readonly info: (message: string, context?: LogContext) => void;
  readonly warn: (message: string, context?: LogContext) => void;
  readonly error: (message: string, error?: Error, context?: LogContext) => void;
}

// Memoized logger instances
const loggerInstances = new Map<string, Logger>();

/**
 * Enhanced logger factory with memoization
 */
export function createLogger(component: string, options: { category?: LogCategory } = {}): Logger {
  const key = `${component}:${options.category || ''}`;

  if (loggerInstances.has(key)) {
    return loggerInstances.get(key)!;
  }

  const { category } = options;
  const prefix = category ? `[${category}:${component}]` : `[${component}]`;
  const timestamp = () => new Date().toISOString();

  const logger: Logger = {
    debug(message: string, context = {}) {
      if (process.env.NODE_ENV !== 'production') {
        console.debug(prefix, message, { ...context, timestamp: timestamp() });
      }
    },

    info(message: string, context = {}) {
      console.log(prefix, message, { ...context, timestamp: timestamp() });
    },

    warn(message: string, context = {}) {
      console.warn(prefix, message, { ...context, timestamp: timestamp() });
    },

    error(message: string, error?: Error, context = {}) {
      console.error(prefix, message, error, { ...context, timestamp: timestamp() });
    },
  };

  loggerInstances.set(key, logger);
  return logger;
}

// ===== UI UTILITIES =====

/**
 * Enhanced className utility with Tailwind support and memoization
 */
const classNameCache = new Map<string, string>();

export function cn(...inputs: ClassValue[]): string {
  const key = JSON.stringify(inputs);

  if (classNameCache.has(key)) {
    return classNameCache.get(key)!;
  }

  const result = twMerge(clsx(...inputs));

  if (classNameCache.size >= MAX_CACHE_SIZE) {
    const firstKey = classNameCache.keys().next().value;
    if (firstKey) classNameCache.delete(firstKey);
  }

  classNameCache.set(key, result);
  return result;
}

// ===== STRING UTILITIES =====

const textCache = new Map<string, string>();

/**
 * Optimized text truncation with caching
 */
export function truncateText(text: string, maxLength: number, ellipsis = '...'): string {
  if (!text || text.length <= maxLength) return text;

  const cacheKey = `${text}:${maxLength}:${ellipsis}`;
  if (textCache.has(cacheKey)) {
    return textCache.get(cacheKey)!;
  }

  const lastSpace = text.lastIndexOf(' ', maxLength);
  const truncateIndex = lastSpace > maxLength / 2 ? lastSpace : maxLength;
  const result = text.slice(0, truncateIndex) + ellipsis;

  if (textCache.size >= MAX_CACHE_SIZE) {
    const firstKey = textCache.keys().next().value;
    if (firstKey) textCache.delete(firstKey);
  }

  textCache.set(cacheKey, result);
  return result;
}

/**
 * Slugifies a string for URL-friendly format
 *
 * @param text - Text to slugify
 * @returns URL-friendly slug
 */
export function slugify(text: string): string {
  if (!text) return '';

  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_]+/g, '-') // Replace spaces, underscores, and hyphens with a single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Optimized URL validation with type guard
 */
export function isValidUrl(url: string | undefined, requireHttps = false): url is URLString {
  if (!url) return false;

  try {
    const parsedUrl = new URL(url);
    return requireHttps ? parsedUrl.protocol === 'https:' : true;
  } catch {
    return false;
  }
}

// ===== DATE & FORMATTING UTILITIES =====

// Create a memoization cache for formatted dates to ensure stability
const dateFormatCache = new Map<string, string>();

/**
 * Internationalized date formatter
 *
 * Modified to ensure consistent output between server and client rendering
 * by using memoization and ensuring stable timezone
 *
 * @param date - Date to format
 * @param options - DateTimeFormat options
 * @param locale - Optional locale string
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  },
  locale: string = 'en-US'
): string {
  // For server/client stability, create a cache key
  const dateStr =
    typeof date === 'string' ? date : date instanceof Date ? date.toISOString() : String(date);
  const optionsKey = JSON.stringify(options);
  const cacheKey = `${dateStr}|${optionsKey}|${locale}`;

  // Check if we already have a formatted version
  if (dateFormatCache.has(cacheKey)) {
    return dateFormatCache.get(cacheKey)!;
  }

  try {
    // Always use UTC timezone to ensure consistent output
    const formatterOptions = {
      ...options,
      timeZone: 'UTC',
    };

    const formatter = new Intl.DateTimeFormat(locale, formatterOptions);
    const result = formatter.format(new Date(date));

    // Cache the result
    dateFormatCache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.warn('Error formatting date:', error);
    const fallback = new Date(date).toLocaleDateString(locale, { timeZone: 'UTC' });
    dateFormatCache.set(cacheKey, fallback);
    return fallback;
  }
}

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, or empty object)
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

// ===== EXPORT TYPES =====

// Export type utilities for better type inference
export type { ClassValue };

// ===== TOUCH & DEVICE UTILITIES =====

let touchDeviceResult: boolean | null = null;

/**
 * Memoized touch device detection
 */
export const isTouchDevice = (): boolean => {
  if (touchDeviceResult !== null) return touchDeviceResult;
  if (typeof window === 'undefined') return false;

  touchDeviceResult = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  return touchDeviceResult;
};

/**
 * CSS class to apply only on devices that support hover
 * Use with Tailwind's @media queries
 */
export const HOVER_MEDIA_CLASS = '@media (hover: hover)';

/**
 * Returns appropriate event handlers based on device type
 * @param {Object} handlers - Event handlers for different interaction types
 * @returns {Object} - The appropriate event handlers for the current device
 */
export const getDeviceAppropriateHandlers = ({
  onClick,
  onTouchStart,
  onTouchEnd,
  onMouseEnter,
  onMouseLeave,
}: {
  onClick?: () => void;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) => {
  const isTouch = isTouchDevice();

  return {
    onClick,
    ...(isTouch ? { onTouchStart, onTouchEnd } : { onMouseEnter, onMouseLeave }),
  };
};
