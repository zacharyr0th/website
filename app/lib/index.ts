/**
 * Core library exports with optimized bundling and type safety
 */

// Base utilities with tree-shaking support
export { cn, get, clone, toKebabCase, formatDate, formatFileSize } from './utils';

// Core functionality
export * as core from './core';
export { createLogger, LogCategory, type Logger } from './core';

// API functionality
export * as api from './api';

// Security functionality
export * as security from './security';

// Type exports for enhanced type safety
export type { ClassValue, DeepPartial } from './utils';

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
  BaseProps,
  ButtonProps,
  FormField,
  RecursivePartial,
  ValueOf,
  AsyncReturnType,
  LogContext,
} from './core';

// Feature modules with lazy loading support
export const config = async () => import('./config');
