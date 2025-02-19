'use client';

// React
import { useEffect, useCallback, memo } from 'react';
import { ErrorType } from '@/lib/security/types';
import { createErrorResponse, sanitizeErrorMessage } from '@/lib/security/error-handling';

interface AntiClickjackProps {
  onViolation?: (details: {
    type: 'framing' | 'loading' | 'internal';
    message: string;
    timestamp: string;
    details?: unknown;
  }) => void;
}

/**
 * Core anti-clickjacking protection component
 * @internal Use ClientAntiClickjack for public API
 */
function AntiClickjack({ onViolation }: AntiClickjackProps) {
  const detectFrame = useCallback((): { isFramed: boolean; ancestorOrigin: string | null } => {
    try {
      // Multiple frame detection techniques
      const isFramed =
        window !== window.top || window !== window.parent || window.self !== window.top;

      // Get ancestor origin if available
      const ancestorOrigin = window.location.ancestorOrigins?.[0] || null;

      return { isFramed, ancestorOrigin };
    } catch (error) {
      // If we can't access parent/top, we're definitely framed
      return { isFramed: true, ancestorOrigin: null };
    }
  }, []);

  const applyProtection = useCallback(() => {
    try {
      const { isFramed, ancestorOrigin } = detectFrame();

      if (isFramed) {
        // Notify parent of violation
        onViolation?.({
          type: 'framing',
          message: `Framing attempt from origin: ${ancestorOrigin || 'unknown'}`,
          timestamp: new Date().toISOString(),
          details: { ancestorOrigin },
        });

        // Log the violation
        console.warn(
          createErrorResponse(
            ErrorType.AUTHORIZATION_ERROR,
            403,
            'Framing attempt detected',
            sanitizeErrorMessage(new Error(`Framing attempt from ${ancestorOrigin}`))
          )
        );

        // Multiple breaking-out techniques
        if (window.top) {
          window.top.location = window.self.location;
        } else {
          window.location.href = window.location.href;
        }

        // Fallback: make content unreadable
        const style = document.createElement('style');
        style.id = 'antiClickjack';
        style.textContent = `
          html { display: none !important; }
          body { display: none !important; }
        `;
        document.head.appendChild(style);

        // Additional defensive measures
        window.document.body.textContent = '';
        window.document.body.style.display = 'none';
      } else {
        // We're not framed - remove any existing protection
        requestAnimationFrame(() => {
          const antiClickjack = document.getElementById('antiClickjack');
          if (antiClickjack) {
            antiClickjack.remove();
          }
        });
      }
    } catch (error) {
      console.error(
        createErrorResponse(
          ErrorType.INTERNAL_ERROR,
          500,
          'Anti-clickjacking protection failed',
          sanitizeErrorMessage(error as Error)
        )
      );
    }
  }, [detectFrame, onViolation]);

  useEffect(() => {
    // Initial protection
    applyProtection();

    // Monitor for dynamic framing attempts
    const observer = new MutationObserver(() => {
      applyProtection();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    // Cleanup
    return () => {
      observer.disconnect();
      const antiClickjack = document.getElementById('antiClickjack');
      if (antiClickjack) {
        antiClickjack.remove();
      }
    };
  }, [applyProtection]);

  return null;
}

// Memoize for performance
const MemoizedAntiClickjack = memo(AntiClickjack);
export default MemoizedAntiClickjack;
