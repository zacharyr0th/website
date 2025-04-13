/**
 * Base error types for the application
 */

export enum ErrorSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

export enum ErrorCategory {
  VALIDATION = 'validation',
  NETWORK = 'network',
  AUTH = 'auth',
  API = 'api',
  DATABASE = 'database',
  RUNTIME = 'runtime',
  BOUNDARY = 'boundary',
  AUDIO = 'audio',
  UNKNOWN = 'unknown',
}

export interface ErrorMetadata {
  [key: string]: unknown;
}

export interface ErrorContext {
  source: string;
  category: ErrorCategory;
  severity: ErrorSeverity;
  metadata?: ErrorMetadata;
  timestamp?: Date;
}

/**
 * Base application error class
 */
export class AppError extends Error {
  public readonly context: ErrorContext;

  constructor(message: string, context: Partial<ErrorContext>) {
    super(message);
    this.name = this.constructor.name;

    // Ensure all required context fields are present
    this.context = {
      source: context.source || 'unknown',
      category: context.category || ErrorCategory.UNKNOWN,
      severity: context.severity || ErrorSeverity.ERROR,
      metadata: context.metadata || {},
      timestamp: context.timestamp || new Date(),
    };

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Create a standardized error object for logging or API responses
   */
  public toJSON() {
    return {
      name: this.name,
      message: this.message,
      context: this.context,
      stack: process.env.NODE_ENV === 'development' ? this.stack : undefined,
    };
  }
}

/**
 * Network-related errors
 */
export class NetworkError extends AppError {
  constructor(message: string, context: Partial<ErrorContext> = {}) {
    super(message, {
      ...context,
      category: ErrorCategory.NETWORK,
    });
  }
}

/**
 * API-related errors
 */
export class ApiError extends AppError {
  constructor(
    message: string,
    public readonly statusCode: number,
    context: Partial<ErrorContext> = {}
  ) {
    super(message, {
      ...context,
      category: ErrorCategory.API,
    });
  }
}

/**
 * Validation errors
 */
export class ValidationError extends AppError {
  constructor(
    message: string,
    public readonly validationErrors: Record<string, string[]>,
    context: Partial<ErrorContext> = {}
  ) {
    super(message, {
      ...context,
      category: ErrorCategory.VALIDATION,
      severity: ErrorSeverity.WARNING,
    });
  }
}

/**
 * Authentication/Authorization errors
 */
export class AuthError extends AppError {
  constructor(message: string, context: Partial<ErrorContext> = {}) {
    super(message, {
      ...context,
      category: ErrorCategory.AUTH,
    });
  }
}

/**
 * Database errors
 */
export class DatabaseError extends AppError {
  constructor(message: string, context: Partial<ErrorContext> = {}) {
    super(message, {
      ...context,
      category: ErrorCategory.DATABASE,
    });
  }
}
