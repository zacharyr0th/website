/**
 * Application Initialization
 * 
 * This module handles the initialization of various application-wide services
 * and configurations. It ensures that critical features are properly set up
 * before the application starts running.
 */

// Feature detection interface
interface BrowserFeatures {
  webp: boolean;
  avif: boolean;
  touchScreen: boolean;
  prefersReducedMotion: boolean;
  connection: 'slow' | 'medium' | 'fast' | undefined;
}

/**
 * Detects browser features and capabilities
 */
const detectBrowserFeatures = async (): Promise<BrowserFeatures> => {
  const features: BrowserFeatures = {
    webp: false,
    avif: false,
    touchScreen: false,
    prefersReducedMotion: false,
    connection: undefined,
  };

  if (typeof window !== 'undefined') {
    // Check WebP support
    const webpImage = new Image();
    webpImage.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
    features.webp = await new Promise(resolve => {
      webpImage.onload = () => resolve(true);
      webpImage.onerror = () => resolve(false);
    });

    // Check AVIF support
    const avifImage = new Image();
    avifImage.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    features.avif = await new Promise(resolve => {
      avifImage.onload = () => resolve(true);
      avifImage.onerror = () => resolve(false);
    });

    // Check touch screen support
    features.touchScreen = 'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      ((navigator as Navigator & { msMaxTouchPoints?: number }).msMaxTouchPoints ?? 0) > 0;

    // Check reduced motion preference
    features.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check connection speed
    if ('connection' in navigator) {
      const conn = (navigator as Navigator & { connection?: { 
        saveData: boolean;
        effectiveType: string;
      } }).connection;
      if (conn) {
        if (conn.saveData) {
          features.connection = 'slow';
        } else if (conn.effectiveType === '4g') {
          features.connection = 'fast';
        } else if (['3g', '2g'].includes(conn.effectiveType)) {
          features.connection = 'medium';
        } else {
          features.connection = 'slow';
        }
      }
    }
  }

  return features;
};

/**
 * Initializes performance monitoring
 */
const initializePerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Record time to first byte
    performance.mark('ttfb');
    
    // Record first contentful paint
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log FCP for analytics
        console.debug('First Contentful Paint:', entry.startTime);
      }
    });
    
    observer.observe({ entryTypes: ['paint'] });

    // Monitor long tasks
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) { // Tasks longer than 50ms
          console.debug('Long Task detected:', {
            duration: entry.duration,
            startTime: entry.startTime,
            name: entry.name
          });
        }
      }
    });

    longTaskObserver.observe({ entryTypes: ['longtask'] });
  }
};

import { initializeSWR } from './swr-config';

/**
 * Initializes all application-wide services and configurations.
 * This should be called once when the application starts.
 */
export async function initializeApp(): Promise<void> {
  // Only initialize client-side services in the browser
  if (typeof window !== 'undefined') {
    // Detect browser features
    const features = await detectBrowserFeatures();
    window.__BROWSER_FEATURES__ = features;

    // Initialize performance monitoring
    initializePerformance();

    // Initialize SWR configuration
    initializeSWR();

    // Initialize Framer Motion preferences based on user's motion preferences
    if (features.prefersReducedMotion) {
      document.documentElement.style.setProperty('--motion-reduce', '1');
    }

    // Add connection-speed class to body for adaptive loading
    if (features.connection) {
      document.body.classList.add(`connection-${features.connection}`);
    }

    // Log initialization completion in development
    if (process.env.NODE_ENV === 'development') {
      console.debug('App initialized with features:', features);
    }
  }
}

// Add type declaration for browser features
declare global {
  interface Window {
    __BROWSER_FEATURES__?: BrowserFeatures;
  }
} 