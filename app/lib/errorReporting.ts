interface ErrorDetails {
  message: string;
  stack?: string;
  componentStack?: string;
  additionalInfo?: Record<string, unknown>;
}

class ErrorReporting {
  private static instance: ErrorReporting;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): ErrorReporting {
    if (!ErrorReporting.instance) {
      ErrorReporting.instance = new ErrorReporting();
    }
    return ErrorReporting.instance;
  }

  initialize() {
    if (this.isInitialized) return;

    // Add global error handler
    window.addEventListener('error', (event) => {
      this.logError({
        message: event.message,
        stack: event.error?.stack,
        additionalInfo: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      });
    });

    // Add unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        message: event.reason?.message || 'Unhandled Promise Rejection',
        stack: event.reason?.stack,
        additionalInfo: {
          reason: event.reason,
        },
      });
    });

    this.isInitialized = true;
  }

  logError(error: ErrorDetails) {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error logged:', error);
      return;
    }

    // In production, you would send this to your error reporting service
    // Example with a hypothetical error reporting service:
    // await errorReportingService.report({
    //   message: error.message,
    //   stack: error.stack,
    //   componentStack: error.componentStack,
    //   metadata: {
    //     environment: process.env.NODE_ENV,
    //     timestamp: new Date().toISOString(),
    //     url: window.location.href,
    //     userAgent: navigator.userAgent,
    //     ...error.additionalInfo,
    //   },
    // });
  }

  logInfo(message: string, data?: Record<string, unknown>) {
    if (process.env.NODE_ENV === 'development') {
      console.info(message, data);
    }
    // In production, you might want to log this to your monitoring service
  }

  logWarning(message: string, data?: Record<string, unknown>) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(message, data);
    }
    // In production, you might want to log this to your monitoring service
  }
}

export const errorReporting = ErrorReporting.getInstance(); 