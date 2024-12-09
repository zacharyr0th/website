type LogLevel = 'info' | 'warn' | 'error';

interface LogMessage {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
}

function sanitizeError(error: unknown): string {
  if (error instanceof Error) {
    // Only return the message, not the stack trace
    return error.message;
  }
  return String(error);
}

function sanitizeData(data: unknown): unknown {
  if (typeof data === 'object' && data !== null) {
    return JSON.parse(
      JSON.stringify(data, (key, value) => {
        // Remove sensitive keys
        if (
          key.toLowerCase().includes('password') ||
          key.toLowerCase().includes('token') ||
          key.toLowerCase().includes('secret') ||
          key.toLowerCase().includes('key')
        ) {
          return '[REDACTED]';
        }
        return value;
      })
    );
  }
  return data;
}

export function logger(level: LogLevel, message: string, data?: unknown) {
  const logMessage: LogMessage = {
    level,
    message,
    timestamp: new Date().toISOString(),
    data: data ? sanitizeData(data) : undefined,
  };

  // In production, you might want to send this to a logging service
  if (process.env.NODE_ENV === 'production') {
    // TODO: Implement production logging service
    console[level](JSON.stringify(logMessage));
  } else {
    console[level](message, data ? sanitizeData(data) : '');
  }
}

export function logError(error: unknown, context?: string) {
  const sanitizedError = sanitizeError(error);
  logger('error', `${context ? `${context}: ` : ''}${sanitizedError}`);
}
