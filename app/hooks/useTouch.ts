'use client';

/**
 * Touch interaction hooks for React components
 *
 * This file provides React hooks for handling touch interactions with improved mobile experience.
 */

import { useState, useCallback, useEffect } from 'react';
import { isTouchDevice } from '@/lib/utils';

/**
 * Hook to detect if the current device is primarily touch-based
 * @returns {boolean} True if the device is primarily touch-based
 */
export const useIsTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;

  // Check for touch support
  const touchSupported = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Additional check for mobile devices
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  return touchSupported && isMobileDevice;
};

interface TouchInteractionOptions {
  /**
   * Callback to run on touch/click
   */
  onInteraction?: () => void;

  /**
   * Callback to run on touch start
   */
  onTouchStart?: () => void;

  /**
   * Callback to run on touch end
   */
  onTouchEnd?: () => void;

  /**
   * Whether to disable hover effects on touch devices
   */
  disableHoverOnTouch?: boolean;

  /**
   * Whether to add a delay before registering touch end (helps prevent accidental double taps)
   */
  touchEndDelay?: number;
}

interface TouchInteractionResult {
  /**
   * Whether the element is currently being touched
   */
  isTouched: boolean;

  /**
   * Whether the device supports touch
   */
  isTouch: boolean;

  /**
   * Event handlers to spread onto the interactive element
   */
  handlers: {
    onClick: () => void;
    onTouchStart: () => void;
    onTouchEnd: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  };

  /**
   * CSS classes to apply for touch states
   */
  touchStateClasses: string;
}

/**
 * Hook for handling touch interactions with improved mobile experience
 */
export function useTouchInteraction({
  onInteraction,
  onTouchStart,
  onTouchEnd,
  disableHoverOnTouch = true,
  touchEndDelay = 100,
}: TouchInteractionOptions = {}): TouchInteractionResult {
  const [isTouched, setIsTouched] = useState(false);
  const isTouch = isTouchDevice();

  // Reset touch state when component unmounts
  useEffect(() => {
    return () => {
      setIsTouched(false);
    };
  }, []);

  // Handle click/tap
  const handleClick = useCallback(() => {
    onInteraction?.();
  }, [onInteraction]);

  // Handle touch start
  const handleTouchStart = useCallback(() => {
    setIsTouched(true);
    onTouchStart?.();
  }, [onTouchStart]);

  // Handle touch end with optional delay
  const handleTouchEnd = useCallback(() => {
    if (touchEndDelay > 0) {
      setTimeout(() => {
        setIsTouched(false);
        onTouchEnd?.();
      }, touchEndDelay);
    } else {
      setIsTouched(false);
      onTouchEnd?.();
    }
  }, [onTouchEnd, touchEndDelay]);

  // Mouse enter/leave handlers (only used on non-touch devices)
  const handleMouseEnter = useCallback(() => {
    if (!isTouch || !disableHoverOnTouch) {
      setIsTouched(true);
    }
  }, [isTouch, disableHoverOnTouch]);

  const handleMouseLeave = useCallback(() => {
    if (!isTouch || !disableHoverOnTouch) {
      setIsTouched(false);
    }
  }, [isTouch, disableHoverOnTouch]);

  // Generate CSS classes based on touch state
  const touchStateClasses = isTouched ? 'touch-active' : '';

  return {
    isTouched,
    isTouch,
    handlers: {
      onClick: handleClick,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      ...(disableHoverOnTouch && isTouch
        ? {}
        : { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }),
    },
    touchStateClasses,
  };
}
