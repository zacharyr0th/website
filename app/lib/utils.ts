/**
 * Core utility functions with optimized performance and type safety
 *
 * This file contains reusable utility functions for the application,
 * optimized for performance, type safety, and maintainability.
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ===== TYPE DEFINITIONS =====

// Base Types
export type ID = string;
export type DateString = string;
export type URLString = string;
export type Primitive = string | number | boolean | null | undefined;
export type JSONValue = Primitive | JSONObject | JSONArray;
export interface JSONObject {
  [key: string]: JSONValue;
}
export interface JSONArray extends Array<JSONValue> {}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
  disabled?: boolean;
  children?: NavItem[];
}

export type NavItems = NavItem[];

// Writing Types
export interface WritingProject {
  id: ID;
  title: string;
  description: string;
  link: URLString;
  publishedAt?: DateString;
  updatedAt?: DateString;
  author?: string;
  tags?: string[];
  category?: string;
  status?: 'draft' | 'published' | 'archived';
  metadata?: Record<string, JSONValue>;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
  message?: string;
  timestamp: DateString;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

// Error Types
export interface AppError extends Error {
  code?: string;
  status?: number;
  metadata?: Record<string, JSONValue>;
}

// Config Types
export interface AppConfig {
  environment: 'development' | 'production';
  api: {
    baseUrl: string;
  };
}

// Logging context
export interface LogContext {
  [key: string]: string | number | boolean | undefined | unknown;
  component?: string;
}

// Component Props Types
export interface BaseProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  style?: React.CSSProperties;
}

export interface ButtonProps extends BaseProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'select' | 'textarea';
  required?: boolean;
  placeholder?: string;
  value?: string;
}

// ===== LOGGER =====

export enum LogCategory {
  APPLICATION = 'application',
  API = 'api',
  SECURITY = 'security',
}

export interface Logger {
  debug(message: string, context?: LogContext): void;
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, error?: Error, context?: LogContext): void;
}

/**
 * Simple logger factory
 */
export function createLogger(component: string, options: { category?: LogCategory } = {}): Logger {
  const { category } = options;
  const prefix = category ? `[${category}:${component}]` : `[${component}]`;

  return {
    debug(message: string, context = {}) {
      if (process.env.NODE_ENV !== 'production') {
        console.debug(prefix, message, context);
      }
    },

    info(message: string, context = {}) {
      console.log(prefix, message, context);
    },

    warn(message: string, context = {}) {
      console.warn(prefix, message, context);
    },

    error(message: string, error?: Error, context = {}) {
      console.error(prefix, message, error, context);
    },
  };
}

// ===== UI UTILITIES =====

/**
 * Enhanced className utility with Tailwind support
 * Combines and deduplicates class names
 *
 * @param inputs - Class names or conditional objects
 * @returns Merged and deduplicated class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs));
}

// ===== STRING UTILITIES =====

/**
 * Truncates text to a specified length with ellipsis
 *
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @param ellipsis - Custom ellipsis string (default: '...')
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number, ellipsis = '...'): string {
  if (!text || text.length <= maxLength) return text;

  // Find the last space within the limit to avoid cutting words
  const lastSpace = text.lastIndexOf(' ', maxLength);
  const truncateIndex = lastSpace > maxLength / 2 ? lastSpace : maxLength;

  return text.slice(0, truncateIndex) + ellipsis;
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
  const dateStr = typeof date === 'string' ? date : date instanceof Date ? date.toISOString() : String(date);
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

/**
 * Validates a URL
 *
 * @param url - URL to validate
 * @param requireHttps - Whether to require HTTPS
 * @returns Whether the URL is valid
 */
export function isValidUrl(url: string, requireHttps = false): boolean {
  if (!url) return false;

  try {
    const parsedUrl = new URL(url);
    return requireHttps ? parsedUrl.protocol === 'https:' : true;
  } catch {
    return false;
  }
}

// ===== EXPORT TYPES =====

// Export type utilities for better type inference
export type { ClassValue };

// ===== TOUCH & DEVICE UTILITIES =====

/**
 * Detects if the current device supports touch events
 * @returns {boolean} True if the device supports touch events
 */
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
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
