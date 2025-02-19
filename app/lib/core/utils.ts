import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string or Date object to a localized string
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  // Force UTC interpretation by using the Date UTC methods
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    }
  );
}

type MemoizeFunction = <T extends (length?: number) => unknown>(fn: T) => T;

/**
 * Creates a memoized version of a function
 * @param fn The function to memoize
 * @returns Memoized function
 */
export const memoize: MemoizeFunction = <T extends (length?: number) => unknown>(fn: T) => {
  const cache = new Map();

  return function (this: unknown, length?: number) {
    const key = JSON.stringify(length);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.call(this, length);
    cache.set(key, result);
    return result;
  } as T;
};

/**
 * Safely access nested object properties
 */
export function get<T>(obj: unknown, path: string, defaultValue: T): T {
  if (!path || typeof path !== 'string') return defaultValue;

  const properties = path
    .split('.')
    .flatMap((p) => p.split(/[\[\]]/))
    .filter((p) => p !== '');

  if (!properties.length) return defaultValue;

  // Validate property names
  if (!properties.every((prop) => /^[a-zA-Z0-9_$]+$/.test(prop))) {
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
}

/**
 * Debounces a function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}

/**
 * Creates a throttled function that only invokes the provided function at most once per every wait milliseconds
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  let lastFn: ReturnType<typeof setTimeout>;
  let lastTime: number;

  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      fn.apply(this, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(
        () => {
          if (Date.now() - lastTime >= wait) {
            fn.apply(this, args);
            lastTime = Date.now();
          }
        },
        Math.max(wait - (Date.now() - lastTime), 0)
      );
    }
  };
}

/**
 * Type-safe object keys
 */
export const keys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

/**
 * Type-safe object entries
 */
export const entries = Object.entries as <T extends object>(obj: T) => Array<[keyof T, T[keyof T]]>;

/**
 * Creates an array of numbers progressing from start up to end
 */
export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
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
