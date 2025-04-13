import { AppError, ErrorCategory, type ErrorContext, ErrorSeverity } from './types';

export interface ErrorHandler {
  handle(error: Error | AppError, context?: Partial<ErrorContext>): void;
  report(error: Error | AppError, context?: Partial<ErrorContext>): void;
}

interface ErrorReporter {
  report(error: Error | AppError, context: ErrorContext): void;
}

/**
 * Console error reporter for development
 */
class ConsoleErrorReporter implements ErrorReporter {
  report(error: Error | AppError, context: ErrorContext): void {
    const errorObject = {
      timestamp: context.timestamp?.toISOString(),
      severity: context.severity,
      category: context.category,
      source: context.source,
      message: error.message,
      stack: error.stack,
      metadata: context.metadata,
    };

    switch (context.severity) {
      case ErrorSeverity.INFO:
        console.info('[Error Handler]', errorObject);
        break;
      case ErrorSeverity.WARNING:
        console.warn('[Error Handler]', errorObject);
        break;
      case ErrorSeverity.ERROR:
      case ErrorSeverity.CRITICAL:
        console.error('[Error Handler]', errorObject);
        break;
    }
  }
}

/**
 * Main error handler service
 */
export class ErrorHandlerService implements ErrorHandler {
  private static instance: ErrorHandlerService;
  private reporters: ErrorReporter[] = [];

  private constructor() {
    // Add console reporter by default in development
    if (process.env.NODE_ENV === 'development') {
      this.reporters.push(new ConsoleErrorReporter());
    }

    // Add additional reporters here (e.g., Sentry, LogRocket, etc.)
    // this.reporters.push(new SentryReporter());
  }

  public static getInstance(): ErrorHandlerService {
    if (!ErrorHandlerService.instance) {
      ErrorHandlerService.instance = new ErrorHandlerService();
    }
    return ErrorHandlerService.instance;
  }

  /**
   * Add a new error reporter
   */
  public addReporter(reporter: ErrorReporter): void {
    this.reporters.push(reporter);
  }

  /**
   * Handle an error with optional context
   */
  public handle(error: Error | AppError, context?: Partial<ErrorContext>): void {
    // First report the error
    this.report(error, context);

    // Then handle based on severity and category
    const errorContext = this.normalizeContext(error, context);

    switch (errorContext.severity) {
      case ErrorSeverity.CRITICAL:
        // For critical errors, we might want to:
        // - Show a full-screen error message
        // - Attempt to recover application state
        // - Force a page reload
        break;

      case ErrorSeverity.ERROR:
        // For regular errors:
        // - Show error notification
        // - Log to monitoring service
        break;

      case ErrorSeverity.WARNING:
        // For warnings:
        // - Show warning notification
        // - Continue execution
        break;

      case ErrorSeverity.INFO:
        // For info:
        // - Log for debugging
        // - No user notification
        break;
    }
  }

  /**
   * Report an error to all registered reporters
   */
  public report(error: Error | AppError, context?: Partial<ErrorContext>): void {
    const errorContext = this.normalizeContext(error, context);

    for (const reporter of this.reporters) {
      try {
        reporter.report(error, errorContext);
      } catch (reporterError) {
        // If a reporter fails, log to console as fallback
        console.error('[Error Handler] Reporter failed:', reporterError);
      }
    }
  }

  /**
   * Normalize error context
   */
  private normalizeContext(error: Error | AppError, context?: Partial<ErrorContext>): ErrorContext {
    if (error instanceof AppError) {
      return {
        ...error.context,
        ...context,
      };
    }

    return {
      source: context?.source || 'unknown',
      category: context?.category || ErrorCategory.UNKNOWN,
      severity: context?.severity || ErrorSeverity.ERROR,
      metadata: {
        ...context?.metadata,
        originalError: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      },
      timestamp: context?.timestamp || new Date(),
    };
  }
}

// Export singleton instance
export const errorHandler = ErrorHandlerService.getInstance();
