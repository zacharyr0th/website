import { NextRequest } from 'next/server';
import { createLogger, LogCategory } from '@/lib/core';
import { createErrorResponse } from './error-handling';
import { ErrorType } from './types';
import { getErrorHeaders } from './headers';
import { PERFORMANCE_CONFIG } from './constants';

const logger = createLogger('security:performance');

// Metrics collection
const metricsState = {
  requestCount: 0,
  errorCount: 0,
  highLoadCount: 0,
  lastResetTime: Date.now(),
  sampledRequests: new Map<string, number>(),
  lastCheckTime: Date.now(),
  currentLag: 0,
};

export interface PerformanceMetrics {
  startTime: number;
  path: string;
  isApiRoute: boolean;
  isSensitiveRoute: boolean;
}

// Circuit breaker state
const circuitBreaker = {
  failures: 0,
  lastFailureTime: 0,
  state: 'CLOSED' as 'CLOSED' | 'OPEN' | 'HALF_OPEN',
  successfulProbes: 0,
};

function shouldSampleRequest(): boolean {
  return Math.random() < PERFORMANCE_CONFIG.SAMPLING_RATE;
}

function resetCircuitBreaker(): void {
  circuitBreaker.failures = 0;
  circuitBreaker.lastFailureTime = 0;
  circuitBreaker.state = 'CLOSED';
  circuitBreaker.successfulProbes = 0;
}

function updateCircuitBreaker(isError: boolean): void {
  const now = Date.now();

  if (isError) {
    circuitBreaker.failures++;
    circuitBreaker.lastFailureTime = now;

    if (circuitBreaker.failures >= PERFORMANCE_CONFIG.CIRCUIT_BREAKER.FAILURE_THRESHOLD) {
      circuitBreaker.state = 'OPEN';
      logger.warn('Circuit breaker opened', {
        context: {
          failures: circuitBreaker.failures,
          threshold: PERFORMANCE_CONFIG.CIRCUIT_BREAKER.FAILURE_THRESHOLD,
        },
        category: LogCategory.SECURITY,
      });
    }
  } else if (circuitBreaker.state === 'HALF_OPEN') {
    circuitBreaker.successfulProbes++;
    if (circuitBreaker.successfulProbes >= PERFORMANCE_CONFIG.CIRCUIT_BREAKER.HALF_OPEN_REQUESTS) {
      resetCircuitBreaker();
      logger.info('Circuit breaker reset', {
        context: {
          successfulProbes: circuitBreaker.successfulProbes,
        },
        category: LogCategory.SECURITY,
      });
    }
  }
}

// Simple lag calculation based on event loop
function calculateLag(): number {
  const now = Date.now();
  const timeSinceLastCheck = now - metricsState.lastCheckTime;
  metricsState.lastCheckTime = now;

  // If more time has passed than our interval, we're lagging
  const lag = Math.max(0, timeSinceLastCheck - PERFORMANCE_CONFIG.CHECK_INTERVAL);
  metricsState.currentLag = lag;
  return lag;
}

export function initializePerformanceMonitoring(): void {
  if (typeof window !== 'undefined') return; // Skip on client side

  // Reset metrics periodically
  setInterval(() => {
    const now = Date.now();
    logger.info('Performance metrics reset', {
      context: {
        requestCount: metricsState.requestCount,
        errorCount: metricsState.errorCount,
        highLoadCount: metricsState.highLoadCount,
        uptime: now - metricsState.lastResetTime,
        sampledPaths: Array.from(metricsState.sampledRequests.entries()),
      },
      category: LogCategory.PERFORMANCE,
    });

    metricsState.requestCount = 0;
    metricsState.errorCount = 0;
    metricsState.highLoadCount = 0;
    metricsState.lastResetTime = now;
    metricsState.sampledRequests.clear();
  }, 60000); // Reset every minute

  // Check lag periodically
  setInterval(() => {
    calculateLag();
  }, PERFORMANCE_CONFIG.CHECK_INTERVAL);
}

export function checkServerLoad(request: NextRequest): Response | null {
  if (typeof window !== 'undefined') return null; // Skip on client side

  metricsState.requestCount++;
  const currentLag = calculateLag();
  const isHighLoad =
    currentLag >= PERFORMANCE_CONFIG.MAX_LAG * PERFORMANCE_CONFIG.HIGH_LOAD_THRESHOLD;

  if (isHighLoad) {
    metricsState.highLoadCount++;
  }

  // Check circuit breaker state
  const now = Date.now();
  if (circuitBreaker.state === 'OPEN') {
    if (now - circuitBreaker.lastFailureTime >= PERFORMANCE_CONFIG.CIRCUIT_BREAKER.RESET_TIMEOUT) {
      circuitBreaker.state = 'HALF_OPEN';
      logger.info('Circuit breaker entering half-open state');
    } else {
      metricsState.errorCount++;
      return createServerBusyResponse(request, currentLag);
    }
  }

  if (isHighLoad) {
    metricsState.errorCount++;
    updateCircuitBreaker(true);
    return createServerBusyResponse(request, currentLag);
  }

  updateCircuitBreaker(false);
  return null;
}

function createServerBusyResponse(request: NextRequest, lag: number): Response {
  const error = createErrorResponse(
    ErrorType.INTERNAL_ERROR,
    503,
    'Server Too Busy',
    `The server is currently experiencing high load (${lag}ms lag)`,
    'SERVER_BUSY',
    request.url
  );

  logger.warn('Server too busy', {
    context: {
      lag,
      circuitBreakerState: circuitBreaker.state,
    },
    category: LogCategory.PERFORMANCE,
  });

  return new Response(error.body, {
    status: error.status,
    headers: {
      ...error.headers,
      ...getErrorHeaders(undefined, undefined, 30),
    },
  });
}

export function logPerformanceMetrics(metrics: PerformanceMetrics): void {
  const duration = Date.now() - metrics.startTime;

  // Sample only a percentage of requests for detailed logging
  if (shouldSampleRequest()) {
    const currentCount = metricsState.sampledRequests.get(metrics.path) || 0;
    metricsState.sampledRequests.set(metrics.path, currentCount + 1);

    logger.info('Request completed', {
      context: {
        duration,
        path: metrics.path,
        isApiRoute: metrics.isApiRoute,
        isSensitiveRoute: metrics.isSensitiveRoute,
      },
      category: LogCategory.PERFORMANCE,
    });
  }
}
