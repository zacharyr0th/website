import pino from 'pino';
import { memoize } from './utils';

// Generate a unique ID using timestamp and random numbers
const generateId = memoize((length: number = 16): string => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  const combined = timestamp + randomPart;
  return combined.slice(0, length);
});

// Log levels with semantic meanings
export enum LogLevel {
  TRACE = 'trace',
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal',
}

// Performance monitoring thresholds
const PERFORMANCE_THRESHOLDS = {
  API: {
    WARNING: 1000, // 1 second
    ERROR: 3000, // 3 seconds
  },
  STATIC: {
    WARNING: 200, // 200ms
    ERROR: 1000, // 1 second
  },
} as const;

// Log categories for better organization
export enum LogCategory {
  SECURITY = 'security',
  PERFORMANCE = 'performance',
  BUSINESS = 'business',
  SYSTEM = 'system',
  API = 'api',
  DATABASE = 'database',
  CACHE = 'cache',
  AUTH = 'auth',
  APPLICATION = 'application',
}

export interface LogContext {
  requestId?: string;
  userId?: string;
  sessionId?: string;
  traceId?: string;
  spanId?: string;
  component?: string;
  category?: LogCategory;
  tags?: readonly string[];
  [key: string]: unknown;
}

export interface LogOptions {
  level?: LogLevel;
  context?: LogContext;
  error?: Error;
  timestamp?: string;
  duration?: number;
  threshold?: number;
  sensitive?: boolean;
  category?: LogCategory;
  metadata?: Readonly<{
    [key: string]: string | number | boolean | null | undefined;
  }>;
}

interface ExtendedError extends Error {
  code?: string | number;
  status?: number;
  statusCode?: number;
}

// Cached environment checks
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
const logLevel = process.env.LOG_LEVEL || 'info';

// Base logger configuration with optimized settings
const baseLogger = pino({
  level: logLevel,
  redact: {
    paths: [
      'password',
      'secret',
      'token',
      'authorization',
      'cookie',
      '*.password',
      '*.secret',
      '*.token',
      '*.authorization',
      '*.cookie',
      'headers.authorization',
      'headers.cookie',
    ],
    remove: true,
  },
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
    bindings: (bindings) => ({
      pid: bindings.pid,
      hostname: bindings.hostname,
      environment: process.env.NODE_ENV,
    }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  ...(isProduction && {
    serializers: pino.stdSerializers,
    crlf: false,
    sync: false,
  }),
});

// Optimized key validation regex (compiled once)
const validKeyRegex = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
const MAX_KEY_LENGTH = 64;

class StructuredLogger {
  private readonly logger: typeof baseLogger;
  private readonly context: Readonly<LogContext>;

  constructor(component: string, context: LogContext = {}) {
    this.logger = baseLogger.child({ component });
    this.context = Object.freeze({
      ...context,
      component,
    });
  }

  private formatMessage(message: string, options: LogOptions = {}): object {
    const timestamp = options.timestamp || new Date().toISOString();
    const requestId = options.context?.requestId || generateId(8);

    // Sanitize error information
    const errorInfo = options.error
      ? {
          error: {
            name: options.error.name,
            message: options.error.message,
            code: (options.error as ExtendedError).code,
            status:
              (options.error as ExtendedError).status ||
              (options.error as ExtendedError).statusCode,
            ...(!isProduction && options.error.stack && { stack: options.error.stack }),
          },
        }
      : {};

    // Optimized metadata sanitization
    const sanitizedMetadata = options.metadata
      ? Object.fromEntries(
          Object.entries(options.metadata).filter(
            ([key, value]) =>
              (value === null ||
                ['string', 'number', 'boolean', 'undefined'].includes(typeof value)) &&
              validKeyRegex.test(key) &&
              key.length <= MAX_KEY_LENGTH
          )
        )
      : {};

    return Object.freeze({
      message,
      timestamp,
      requestId,
      ...this.context,
      ...options.context,
      ...(options.duration && { duration: `${options.duration}ms` }),
      ...errorInfo,
      ...(Object.keys(sanitizedMetadata).length > 0 && { metadata: sanitizedMetadata }),
    });
  }

  trace(message: string, options: LogOptions = {}) {
    this.logger.trace(this.formatMessage(message, { ...options, level: LogLevel.TRACE }));
  }

  debug(message: string, options: LogOptions = {}) {
    this.logger.debug(this.formatMessage(message, { ...options, level: LogLevel.DEBUG }));
  }

  info(message: string, options: LogOptions = {}) {
    this.logger.info(this.formatMessage(message, { ...options, level: LogLevel.INFO }));
  }

  warn(message: string, options: LogOptions = {}) {
    this.logger.warn(this.formatMessage(message, { ...options, level: LogLevel.WARN }));
  }

  error(message: string, options: LogOptions = {}) {
    this.logger.error(this.formatMessage(message, { ...options, level: LogLevel.ERROR }));
  }

  fatal(message: string, options: LogOptions = {}) {
    this.logger.fatal(this.formatMessage(message, { ...options, level: LogLevel.FATAL }));
  }

  // Optimized performance monitoring
  async withPerformanceLogging<T>(
    operation: string,
    fn: () => Promise<T>,
    context: LogContext = {}
  ): Promise<T> {
    const start = performance.now();
    try {
      const result = await fn();
      const duration = performance.now() - start;

      const threshold =
        context.category === LogCategory.API
          ? PERFORMANCE_THRESHOLDS.API
          : PERFORMANCE_THRESHOLDS.STATIC;

      if (duration > threshold.ERROR) {
        this.error(`${operation} exceeded error threshold`, {
          context: { ...context, category: LogCategory.PERFORMANCE },
          duration,
          threshold: threshold.ERROR,
        });
      } else if (duration > threshold.WARNING) {
        this.warn(`${operation} exceeded warning threshold`, {
          context: { ...context, category: LogCategory.PERFORMANCE },
          duration,
          threshold: threshold.WARNING,
        });
      } else if (isDevelopment) {
        this.info(`${operation} completed`, {
          context: { ...context, category: LogCategory.PERFORMANCE },
          duration,
        });
      }

      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.error(`${operation} failed`, {
        context: { ...context, category: LogCategory.PERFORMANCE },
        error: error as Error,
        duration,
      });
      throw error;
    }
  }

  // Security event logging
  logSecurityEvent(
    event: string,
    context: LogContext & {
      outcome: 'success' | 'failure';
      severity: 'low' | 'medium' | 'high' | 'critical';
    }
  ) {
    this.info(event, {
      context: {
        ...context,
        category: LogCategory.SECURITY,
        timestamp: new Date().toISOString(),
      },
    });
  }

  // Business event logging
  logBusinessEvent(
    event: string,
    context: LogContext & {
      action: string;
      status: 'success' | 'failure';
      metadata?: Record<string, unknown>;
    }
  ) {
    this.info(event, {
      context: {
        ...context,
        category: LogCategory.BUSINESS,
        timestamp: new Date().toISOString(),
      },
    });
  }

  // Create a child logger with additional context
  child(context: LogContext): StructuredLogger {
    return new StructuredLogger(this.context.component as string, {
      ...this.context,
      ...context,
    });
  }
}

// Singleton instance with proper typing
export const globalLogger: Readonly<StructuredLogger> = Object.freeze(
  new StructuredLogger('global')
);

export function createLogger(
  component: string,
  context: LogContext = {}
): Readonly<StructuredLogger> {
  return Object.freeze(new StructuredLogger(component, context));
}

export interface Logger {
  trace(message: string, options?: LogOptions): void;
  debug(message: string, options?: LogOptions): void;
  info(message: string, options?: LogOptions): void;
  warn(message: string, options?: LogOptions): void;
  error(message: string, options?: LogOptions): void;
  fatal(message: string, options?: LogOptions): void;
  child(metadata: Record<string, string | number | boolean | null | undefined>): Logger;
  withPerformanceLogging<T>(
    operation: string,
    fn: () => Promise<T>,
    context?: LogContext
  ): Promise<T>;
}
