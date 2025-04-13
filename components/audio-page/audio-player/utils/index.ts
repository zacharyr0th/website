// Re-export formatting utilities
export * from './format';

// Constants
export const AUDIO_CONFIG = {
  UPDATE_INTERVAL: 16, // ~60fps
};

/**
 * Ensure progress value is between 0 and 100
 */
export const safeProgress = (progress: number): number => {
  return Math.min(100, Math.max(0, progress));
};
