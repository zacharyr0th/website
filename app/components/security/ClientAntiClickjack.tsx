'use client';

// React
import { Suspense, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { ErrorType } from '@/lib/security/types';
import { createErrorResponse, sanitizeErrorMessage } from '@/lib/security/error-handling';

// Constants
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

interface SecurityViolation {
  type: 'framing' | 'loading' | 'internal';
  message: string;
  timestamp: string;
  details?: unknown;
}

// Utility to report security violations
async function reportSecurityViolation(violation: SecurityViolation) {
  try {
    const report = {
      'csp-report': {
        'document-uri': window.location.href,
        'violated-directive': 'frame-ancestors',
        'blocked-uri': violation.type === 'framing' ? document.referrer : 'dynamic-import',
        disposition: 'enforce',
        'source-file': window.location.href,
        'status-code': violation.type === 'framing' ? 403 : 500,
        'script-sample': '',
        'line-number': 0,
        'column-number': 0,
        'effective-directive': 'frame-ancestors',
      },
      metadata: {
        clientIP: 'client',
        userAgent: window.navigator.userAgent,
        reportSource: window.location.href,
        type: violation.type,
        details: violation.details,
      },
      message: violation.message,
      timestamp: violation.timestamp,
    };

    await fetch('/api/security/csp-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/csp-report',
        'User-Agent': window.navigator.userAgent,
      },
      body: JSON.stringify(report),
    });
  } catch (error) {
    console.error(
      createErrorResponse(
        ErrorType.INTERNAL_ERROR,
        500,
        'Failed to report security violation',
        sanitizeErrorMessage(error as Error)
      )
    );
  }
}

/**
 * Dynamic import with retries and performance monitoring
 * @internal
 */
const AntiClickjack = dynamic(
  () => {
    let retries = 0;
    const startTime = performance.now();

    const loadComponent = async () => {
      try {
        const { AntiClickjack } = await import('@/components/security');

        // Log performance metrics
        const loadTime = performance.now() - startTime;
        if (loadTime > 1000) {
          // Alert if load time > 1s
          console.warn(
            createErrorResponse(
              ErrorType.INTERNAL_ERROR,
              200,
              'Anti-clickjack protection loaded slowly',
              `Load time: ${loadTime.toFixed(2)}ms`
            )
          );
        }

        return AntiClickjack;
      } catch (error) {
        if (retries < MAX_RETRIES) {
          retries++;
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY * retries));
          return loadComponent();
        }

        // Report loading failure
        await reportSecurityViolation({
          type: 'loading',
          message: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString(),
          details: error,
        });

        console.error(
          createErrorResponse(
            ErrorType.INTERNAL_ERROR,
            500,
            'Failed to load anti-clickjacking protection',
            sanitizeErrorMessage(error as Error)
          )
        );

        return () => null;
      }
    };

    return loadComponent();
  },
  {
    ssr: false,
    loading: () => null,
  }
);

/**
 * Client-side anti-clickjacking protection with CSP reporting
 * @public
 */
export default function ClientAntiClickjack() {
  const handleViolation = useCallback((violation: SecurityViolation) => {
    reportSecurityViolation(violation);
  }, []);

  return (
    <Suspense fallback={null}>
      <AntiClickjack onViolation={handleViolation} />
    </Suspense>
  );
}
