/**
 * Core utility functions with optimized performance and type safety
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Type definitions for enhanced type safety
type Primitive = string | number | boolean | null | undefined;
type DeepPartial<T> = T extends Primitive
  ? T
  : T extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : T extends Map<infer K, infer V>
        ? Map<DeepPartial<K>, DeepPartial<V>>
        : T extends ReadonlyMap<infer K, infer V>
          ? ReadonlyMap<DeepPartial<K>, DeepPartial<V>>
          : T extends Set<infer U>
            ? Set<DeepPartial<U>>
            : T extends ReadonlySet<infer U>
              ? ReadonlySet<DeepPartial<U>>
              : T extends object
                ? { [K in keyof T]?: DeepPartial<T[K]> }
                : T;

/**
 * Memoized class name utility for optimal performance
 * Uses a WeakMap to cache results while allowing garbage collection
 */
const classNameCache = new WeakMap<ClassValue[], string>();

/**
 * Enhanced className utility with memoization and type safety
 * @param inputs - Class names or conditional objects
 * @returns Merged and deduplicated class string
 */
export function cn(...inputs: ClassValue[]): string {
  // Fast path for empty or single inputs
  if (inputs.length === 0) return '';
  if (inputs.length === 1) return twMerge(clsx(inputs[0]));

  // Check cache for existing result
  const cached = classNameCache.get(inputs);
  if (cached) return cached;

  // Compute and cache new result
  const result = twMerge(clsx(inputs));
  classNameCache.set(inputs, result);
  return result;
}

/**
 * Type-safe object property accessor with path validation and error handling
 * @param obj - Source object
 * @param path - Dot notation path
 * @param defaultValue - Fallback value
 * @returns Retrieved value or default
 */
export function get<T, D = T>(obj: unknown, path: string, defaultValue: D): T | D {
  if (!path || typeof path !== 'string') return defaultValue;

  try {
    // Optimize path splitting
    const properties = path
      .split('.')
      .flatMap((p) => p.split(/[\[\]]/))
      .filter(Boolean);

    if (!properties.length) return defaultValue;

    // Validate property names for security
    if (!properties.every((prop) => /^[a-zA-Z0-9_$]+$/.test(prop))) {
      console.warn('Invalid property name in path:', path);
      return defaultValue;
    }

    let result: unknown = obj;
    for (const prop of properties) {
      if (result == null || typeof result !== 'object') return defaultValue;

      const target = result as Record<string, unknown>;
      const descriptor = Object.getOwnPropertyDescriptor(target, prop);
      if (!descriptor) return defaultValue;

      result = descriptor.value;
    }

    return (result as T) ?? defaultValue;
  } catch (error) {
    console.warn('Error accessing object path:', error);
    return defaultValue;
  }
}

/**
 * Enhanced deep clone with circular reference handling and type preservation
 * @param obj - Object to clone
 * @returns Deep cloned object
 */
export function clone<T>(obj: T): T {
  if (!obj || typeof obj !== 'object') return obj;

  const seen = new WeakMap();

  function cloneInternal<T>(item: T): T {
    if (!item || typeof item !== 'object') return item;
    if (seen.has(item as object)) return seen.get(item as object) as T;

    if (item instanceof Date) return new Date(item.getTime()) as unknown as T;
    if (item instanceof RegExp) return new RegExp(item.source, item.flags) as unknown as T;
    if (item instanceof Map) {
      const mapClone = new Map();
      seen.set(item as object, mapClone);
      (item as Map<unknown, unknown>).forEach((value, key) =>
        mapClone.set(cloneInternal(key), cloneInternal(value))
      );
      return mapClone as unknown as T;
    }
    if (item instanceof Set) {
      const setClone = new Set();
      seen.set(item as object, setClone);
      (item as Set<unknown>).forEach((value) => setClone.add(cloneInternal(value)));
      return setClone as unknown as T;
    }

    const objClone = Array.isArray(item) ? [] : {};
    seen.set(item as object, objClone);

    const safeEntries = Object.entries(Object(item))
      .filter(([key]) => Object.prototype.hasOwnProperty.call(item, key))
      .map(([key, value]) => [key, cloneInternal(value)]);

    return Object.assign(objClone, Object.fromEntries(safeEntries)) as T;
  }

  return cloneInternal(obj);
}

/**
 * Optimized string case converter with caching
 * @param str - Input string
 * @returns Kebab case string
 */
const kebabCache = new Map<string, string>();
export function toKebabCase(str: string): string {
  if (!str) return '';

  const cached = kebabCache.get(str);
  if (cached) return cached;

  const result = str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

  if (kebabCache.size > 1000) {
    // Prevent unbounded cache growth
    kebabCache.clear();
  }
  kebabCache.set(str, result);
  return result;
}

/**
 * Internationalized date formatter with caching
 * @param date - Date to format
 * @param locale - Optional locale string
 * @returns Formatted date string
 */
const dateFormatters = new Map<string, Intl.DateTimeFormat>();
export function formatDate(date: Date | string | number, locale: string = 'en-US'): string {
  try {
    const formatter =
      dateFormatters.get(locale) ??
      dateFormatters
        .set(
          locale,
          new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC',
          })
        )
        .get(locale)!;

    return formatter.format(new Date(date));
  } catch (error) {
    console.warn('Error formatting date:', error);
    return new Date(date).toLocaleDateString();
  }
}

/**
 * Enhanced file size formatter with unit conversion and localization
 * @param bytes - Size in bytes
 * @param locale - Optional locale string
 * @returns Formatted size string
 */
const sizeFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
});

export function formatFileSize(bytes: number, locale?: string): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '0 B';

  const formatter = locale
    ? new Intl.NumberFormat(locale, { maximumFractionDigits: 1 })
    : sizeFormatter;

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] as const;
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const size = bytes / Math.pow(1024, exponent);
  const unit = units[exponent as keyof typeof units];

  return `${formatter.format(size)} ${unit}`;
}

// Export type utilities for better type inference
export type { ClassValue, DeepPartial };
