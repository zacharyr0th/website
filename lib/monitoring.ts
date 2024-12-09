import { logger } from './logger';

// Custom error tracking
export function trackError(error: unknown, context?: string) {
  // Log locally
  logger('error', context || 'Unhandled error occurred', { error });
}

// Performance monitoring
export function trackPerformance(name: string, duration: number, data?: Record<string, unknown>) {
  logger('info', `Performance: ${name}`, { duration, ...data });
}

// API monitoring
export async function withMonitoring<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const start = performance.now();
  try {
    const result = await fn();
    const duration = performance.now() - start;
    trackPerformance(name, duration);
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    trackError(error, `Error in ${name} (duration: ${duration}ms)`);
    throw error;
  }
}
