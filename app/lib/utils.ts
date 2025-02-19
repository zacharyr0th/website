import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and tailwind-merge for optimal class merging
 * @memoized for repeated class combinations
 */
export const cn = (() => {
  const cache = new Map<string, string>();

  return (...inputs: ClassValue[]): string => {
    const key = JSON.stringify(inputs);
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    const result = twMerge(clsx(inputs));
    cache.set(key, result);
    return result;
  };
})();

/**
 * Formats a date string into a human-readable format
 * @throws {Error} If the date is invalid
 */
export function formatDate(date: string | Date | null | undefined): string {
  if (!date) {
    throw new Error('Date is required');
  }

  const dateObj = new Date(date);
  if (!isValidDate(dateObj)) {
    throw new Error('Invalid date provided');
  }

  try {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
}

/**
 * Debounce function with proper cleanup and type safety
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
} {
  let timeout: NodeJS.Timeout | undefined;
  let lastArgs: Parameters<T> | undefined;

  function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = undefined;
      if (options.trailing !== false && lastArgs) {
        func(...lastArgs);
        lastArgs = undefined;
      }
    };

    if (timeout) {
      clearTimeout(timeout);
    }

    if (options.leading && !timeout) {
      func(...args);
    } else {
      lastArgs = args;
    }

    timeout = setTimeout(later, wait);
  }

  executedFunction.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
      lastArgs = undefined;
    }
  };

  return executedFunction;
}

/**
 * Throttle function with proper cleanup and type safety
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
} {
  let timeout: NodeJS.Timeout | undefined;
  let lastArgs: Parameters<T> | undefined;
  let lastRan: number;

  function executedFunction(...args: Parameters<T>) {
    const now = Date.now();

    if (!lastRan && options.leading === false) {
      lastRan = now;
    }

    const remaining = limit - (now - (lastRan || 0));

    if (remaining <= 0 || remaining > limit) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = undefined;
      }
      lastRan = now;
      func(...args);
      lastArgs = undefined;
    } else if (!timeout && options.trailing !== false) {
      lastArgs = args;
      timeout = setTimeout(() => {
        lastRan = options.leading === false ? 0 : Date.now();
        timeout = undefined;
        func(...lastArgs!);
        lastArgs = undefined;
      }, remaining);
    }
  }

  executedFunction.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
      lastArgs = undefined;
    }
  };

  return executedFunction;
}

// Constants for better performance
const IS_CLIENT = typeof window !== 'undefined';
const IS_SERVER = !IS_CLIENT;

export { IS_CLIENT as isClient, IS_SERVER as isServer };

/**
 * Type-safe deep object property accessor
 */
export function get<T, D = T>(
  obj: Record<string, unknown> | null | undefined,
  path: string,
  defaultValue: D
): T | D {
  if (!obj || !path) return defaultValue;

  try {
    const segments = path.split('.');
    if (!segments.every((key) => /^\w+$/.test(key))) {
      return defaultValue;
    }

    let current: unknown = obj;
    for (const key of segments) {
      if (current == null || typeof current !== 'object') {
        return defaultValue;
      }
      if (!Object.prototype.hasOwnProperty.call(current, key)) {
        return defaultValue;
      }
      current = Reflect.get(current as object, key);
    }

    return current === undefined || current === null ? defaultValue : (current as T);
  } catch {
    return defaultValue;
  }
}

/**
 * Optimized string truncation with proper UTF-8 handling
 */
export function truncate(str: string, length: number, ending: string = '...'): string {
  if (!str || length <= 0) return '';
  if (str.length <= length) return str;

  // Handle UTF-16 surrogate pairs correctly
  const truncated = str.slice(0, length - ending.length);
  const lastChar = truncated.charAt(truncated.length - 1);
  const isHighSurrogate = lastChar.charCodeAt(0) >= 0xd800 && lastChar.charCodeAt(0) <= 0xdbff;

  return (isHighSurrogate ? truncated.slice(0, -1) : truncated) + ending;
}

// Cryptographically secure random string generation
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Generates a cryptographically secure random string
 */
export function randomString(length: number): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((byte) => CHARS[byte % CHARS.length])
    .join('');
}

/**
 * Optimized string capitalization with input validation
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Memoized number formatter for better performance
const numberFormatter = new Intl.NumberFormat('en-US');

/**
 * Formats a number with proper error handling
 */
export function formatNumber(num: number): string {
  if (!Number.isFinite(num)) {
    throw new Error('Invalid number provided');
  }
  return numberFormatter.format(num);
}

/**
 * Type-safe empty check
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Optimized array range generation
 */
export function range(start: number, end: number): number[] {
  if (!Number.isInteger(start) || !Number.isInteger(end)) {
    throw new Error('Range bounds must be integers');
  }
  if (start > end) {
    throw new Error('Start must be less than or equal to end');
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/**
 * Optimized Fisher-Yates shuffle with proper randomization
 */
export function shuffle<T>(array: readonly T[]): T[] {
  if (!array.length) return [];

  const result = [...array];
  const swap = (arr: T[], pos1: number, pos2: number): void => {
    const temp = arr.at(pos1);
    if (temp === undefined) return;
    const val2 = arr.at(pos2);
    if (val2 === undefined) return;
    arr.splice(pos1, 1, val2);
    arr.splice(pos2, 1, temp);
  };

  let currentIndex = result.length;
  while (currentIndex > 1) {
    currentIndex--;
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    swap(result, currentIndex, randomIndex);
  }

  return result;
}

/**
 * Optimized unique array with type safety
 */
export function unique<T>(array: readonly T[]): T[] {
  return Array.from(new Set(array));
}

/**
 * Type-safe array grouping
 */
export function groupBy<T extends Record<string, unknown>, K extends keyof T>(
  array: readonly T[],
  key: K
): Map<string, T[]> {
  return array.reduce((acc, item) => {
    const groupKey = String(Reflect.get(item, key));
    const group = acc.get(groupKey) || [];
    group.push(item);
    acc.set(groupKey, group);
    return acc;
  }, new Map<string, T[]>());
}

/**
 * Optimized date validation
 */
export function isValidDate(date: unknown): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}

// Memoized regex patterns for string transformations
const KEBAB_REGEX = /([a-z])([A-Z])/g;
const SPACE_REGEX = /[\s_]+/g;
const CAMEL_REGEX = /(?:^\w|[A-Z]|\b\w)/g;

/**
 * Optimized kebab case conversion
 */
export function toKebabCase(str: string): string {
  if (!str) return '';
  return str.replace(KEBAB_REGEX, '$1-$2').replace(SPACE_REGEX, '-').toLowerCase();
}

/**
 * Optimized camel case conversion
 */
export function toCamelCase(str: string): string {
  if (!str) return '';
  return str
    .replace(CAMEL_REGEX, (letter, index) =>
      index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    )
    .replace(SPACE_REGEX, '');
}

/**
 * Type-safe property check
 */
export function hasProperty<T extends object>(obj: T, prop: PropertyKey): prop is keyof T {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * Optimized deep clone with proper type handling
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj) as unknown as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as unknown as T;
  }

  if (obj instanceof Set) {
    return new Set([...obj].map((item) => deepClone(item))) as unknown as T;
  }

  if (obj instanceof Map) {
    const clonedEntries = [...obj].map(([k, v]) => {
      const clonedValue = v !== null && typeof v === 'object' ? deepClone(v) : v;
      return [k, clonedValue] as [typeof k, typeof clonedValue];
    });
    return new Map(clonedEntries) as unknown as T;
  }

  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, deepClone(v)])) as unknown as T;
}
