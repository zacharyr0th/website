import { type LogContext } from './types';

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
