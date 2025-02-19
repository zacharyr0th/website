import { createLogger, LogCategory } from '@/lib/core';
import { createErrorResponse } from './error-handling';
import { ErrorType } from './types';
import { getRateLimitHeaders } from './headers';
import { RATE_LIMIT_CONFIG } from './constants';

const logger = createLogger('security:rate-limiting');

interface RateLimitEntry {
  count: number;
  reset: number;
  pattern: string;
  lastAttempt: number;
  consecutiveFailures: number;
}

export class RateLimiter {
  private store: Map<string, RateLimitEntry>;
  private readonly logger = createLogger('security:rate-limiter', {
    category: LogCategory.SECURITY,
  });

  constructor() {
    this.store = new Map();
  }

  public increment(key: string, pattern: string): void {
    const now = Date.now();
    const entry = this.store.get(key) || {
      count: 0,
      reset: now + 15 * 60 * 1000, // 15 minutes from RATE_LIMIT_CONFIG.STANDARD.duration
      pattern,
      lastAttempt: now,
      consecutiveFailures: 0,
    };

    // Reset if window has expired
    if (now > entry.reset) {
      entry.count = 0;
      entry.reset = now + 15 * 60 * 1000; // 15 minutes from RATE_LIMIT_CONFIG.STANDARD.duration
      entry.consecutiveFailures = 0;
    }

    entry.count++;
    entry.lastAttempt = now;
    entry.pattern = pattern; // Ensure pattern is always set
    this.store.set(key, entry);
  }

  public get(key: string): RateLimitEntry | undefined {
    return this.store.get(key);
  }

  public isRateLimited(key: string, pattern: string): boolean {
    const entry = this.get(key);
    if (!entry) return false;

    const now = Date.now();
    if (now > entry.reset) return false;

    const isLimited = entry.count > RATE_LIMIT_CONFIG.STANDARD.requests;
    if (isLimited) {
      this.logger.warn('Rate limit exceeded', {
        context: {
          key,
          pattern,
          count: entry.count,
          reset: new Date(entry.reset).toISOString(),
        },
      });
    }

    return isLimited;
  }

  public clear(key: string): void {
    this.store.delete(key);
  }

  public clearAll(): void {
    this.store.clear();
  }
}

// Enhanced memory store with Redis-like features
class RateLimitStore {
  private store: Map<string, RateLimitEntry>;
  private patterns: Map<string, { count: number; timestamp: number }>;

  constructor() {
    this.store = new Map();
    this.patterns = new Map();
    this.startCleanupInterval();
  }

  private startCleanupInterval(): void {
    setInterval(() => {
      const now = Date.now();
      // Cleanup expired entries
      for (const [key, value] of this.store.entries()) {
        if (value.reset < now) {
          this.store.delete(key);
        }
      }
      // Cleanup old patterns
      for (const [pattern, data] of this.patterns.entries()) {
        if (now - data.timestamp > 3600000) {
          // 1 hour
          this.patterns.delete(pattern);
        }
      }
    }, 60000); // Every minute
  }

  public increment(key: string, windowMs: number, pattern: string): void {
    const now = Date.now();
    const entry = this.store.get(key) || {
      count: 0,
      reset: now + windowMs,
      pattern,
      lastAttempt: now,
      consecutiveFailures: 0,
    };

    // Update pattern tracking
    if (pattern) {
      const patternData = this.patterns.get(pattern) || { count: 0, timestamp: now };
      patternData.count++;
      patternData.timestamp = now;
      this.patterns.set(pattern, patternData);
    }

    entry.count++;
    entry.lastAttempt = now;
    this.store.set(key, entry);
  }

  public get(key: string): RateLimitEntry | undefined {
    return this.store.get(key);
  }

  public getPatternCount(pattern: string): number {
    return this.patterns.get(pattern)?.count || 0;
  }

  public recordFailure(key: string): void {
    const entry = this.store.get(key);
    if (entry) {
      entry.consecutiveFailures++;
      this.store.set(key, entry);
    }
  }

  public resetFailures(key: string): void {
    const entry = this.store.get(key);
    if (entry) {
      entry.consecutiveFailures = 0;
      this.store.set(key, entry);
    }
  }
}

const store = new RateLimitStore();

// Adaptive rate limiting state with enhanced monitoring
const adaptiveState = {
  currentMultiplier: 1,
  errorCount: 0,
  lastUpdate: Date.now(),
  cooldownPeriod: 300000, // 5 minutes
  patterns: new Map<
    string,
    {
      count: number;
      lastUpdate: number;
      multiplier: number;
    }
  >(),
};

function updateAdaptiveRateLimit(error: boolean, pattern?: string): void {
  const now = Date.now();

  // Update pattern-specific state
  if (pattern) {
    const patternState = adaptiveState.patterns.get(pattern) || {
      count: 0,
      lastUpdate: now,
      multiplier: 1,
    };

    if (error) {
      patternState.count++;
      if (patternState.count > 5) {
        patternState.multiplier = Math.max(0.1, patternState.multiplier * 0.5);
        patternState.count = 0;
      }
    } else {
      patternState.multiplier = Math.min(1, patternState.multiplier * 1.2);
      patternState.count = Math.max(0, patternState.count - 1);
    }

    patternState.lastUpdate = now;
    adaptiveState.patterns.set(pattern, patternState);
  }

  // Global state update
  if (now - adaptiveState.lastUpdate >= adaptiveState.cooldownPeriod) {
    adaptiveState.currentMultiplier = 1;
    adaptiveState.errorCount = 0;
    adaptiveState.lastUpdate = now;
    return;
  }

  if (error) {
    adaptiveState.errorCount++;
    if (adaptiveState.errorCount > 10) {
      adaptiveState.currentMultiplier = Math.max(0.5, adaptiveState.currentMultiplier * 0.75);
      adaptiveState.errorCount = 0;
    }
  } else {
    adaptiveState.currentMultiplier = Math.min(1, adaptiveState.currentMultiplier * 1.1);
  }

  adaptiveState.lastUpdate = now;
}

export interface RateLimitResult {
  headers: Record<string, string>;
  error?: Response;
}

export async function checkRateLimit(
  request: Request,
  config: {
    windowMs?: number;
    max?: number;
    pattern?: string;
  } = {}
): Promise<RateLimitResult> {
  try {
    const key = generateRateLimitKey(request);
    const pattern = config.pattern || detectRequestPattern(request);
    const windowMs = config.windowMs || 60000; // 1 minute default
    const maxRequests = config.max || RATE_LIMIT_CONFIG.STANDARD.requests;

    store.increment(key, windowMs, pattern);
    const entry = store.get(key);

    if (!entry) {
      throw new Error('Rate limit entry not found');
    }

    // Get pattern-specific multiplier
    const patternState = adaptiveState.patterns.get(pattern);
    const patternMultiplier = patternState?.multiplier || 1;

    // Calculate effective limit using both global and pattern multipliers
    const effectiveLimit = Math.floor(
      maxRequests * adaptiveState.currentMultiplier * patternMultiplier
    );

    if (entry.count > effectiveLimit) {
      const error = createErrorResponse(
        ErrorType.RATE_LIMIT_ERROR,
        429,
        'Too Many Requests',
        `Rate limit exceeded for ${pattern || 'default'} pattern`,
        request.url
      );

      logger.warn('Rate limit exceeded', {
        context: {
          key,
          pattern,
          count: entry.count,
          limit: effectiveLimit,
          globalMultiplier: adaptiveState.currentMultiplier,
          patternMultiplier,
        },
        category: LogCategory.SECURITY,
      });

      updateAdaptiveRateLimit(true, pattern);
      store.recordFailure(key);

      return {
        headers: getRateLimitHeaders(
          effectiveLimit,
          Math.max(0, effectiveLimit - entry.count),
          Math.ceil(entry.reset / 1000)
        ),
        error: new Response(JSON.stringify(error), {
          status: 429,
          headers: {
            'Content-Type': 'application/problem+json',
            'Cache-Control': 'no-store',
            'Retry-After': Math.ceil((entry.reset - Date.now()) / 1000).toString(),
          },
        }),
      };
    }

    updateAdaptiveRateLimit(false, pattern);
    store.resetFailures(key);

    return {
      headers: getRateLimitHeaders(
        effectiveLimit,
        Math.max(0, effectiveLimit - entry.count),
        Math.ceil(entry.reset / 1000)
      ),
    };
  } catch (err) {
    logger.error('Rate limiting error', {
      error: err instanceof Error ? err : new Error('Unknown error'),
      context: { path: request.url },
      category: LogCategory.SECURITY,
    });

    // Fail open with reduced limits
    return {
      headers: getRateLimitHeaders(
        Math.floor(RATE_LIMIT_CONFIG.STANDARD.requests * 0.5),
        RATE_LIMIT_CONFIG.STANDARD.requests - 1,
        Math.ceil(Date.now() / 1000) + 60
      ),
    };
  }
}

function generateRateLimitKey(request: Request): string {
  const ip =
    request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const path = new URL(request.url).pathname;
  return `${ip}:${path}`;
}

function detectRequestPattern(request: Request): string {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path.startsWith('/api/auth')) return 'auth';
  if (path.startsWith('/api/admin')) return 'admin';
  if (path.startsWith('/api/protected')) return 'protected';
  if (path.match(/\.(jpg|jpeg|png|gif|webp|css|js)$/)) return 'static';

  return 'default';
}
