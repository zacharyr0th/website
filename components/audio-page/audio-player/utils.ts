import type { AudioError, AudioErrorHandler } from './types';
export { formatTime } from './utils/format';

interface ErrorWithCode extends Error {
  code?: number;
}

// Artist name formatting
export const formatArtistName = (name: string | undefined): string => {
  if (!name) return '';
  const names = name.split(' ');
  return name.length > 15 && names.length > 1 ? names[names.length - 1] || '' : name;
};

// Progress calculation
export const safeProgress = (val: number) => (isNaN(val) ? 0 : val);

// Error handling
export const createAudioError = (error: Error): AudioError => ({
  message: error.message,
  name: error.name,
  code: (error as ErrorWithCode).code,
});

export const audioErrorHandler: AudioErrorHandler = {
  handleError: (error: Error | null, context: string, metadata?: Record<string, unknown>) => {
    if (!error) {
      console.error(`Unknown error in ${context}`);
      return;
    }
    const errorObj: Record<string, unknown> = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      ...metadata,
    };
    console.error(`Audio error in ${context}:`, errorObj);
  },
  logDebug: (message: string, metadata?: Record<string, unknown>) => {
    console.debug(`[Audio Debug] ${message}`, metadata);
  },
};

// Constants
export const AUDIO_CONFIG = {
  CACHE_SIZE: 3,
  MAX_RETRIES: 2,
  RETRY_DELAY: 1000,
  FORMATS: ['audio/mp4', 'audio/mpeg', 'audio/webm'] as const,
  URL_CACHE_DURATION: 3600000, // 1 hour
  PRELOAD: {
    DELAY: 1000,
    CONCURRENT_LIMIT: 2,
  },
  UPDATE_INTERVAL: 16, // ~60fps
} as const;

// CSS styles constants
export const STYLES = {
  base: 'flex items-center p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-200 ease-in-out touch-manipulation active:scale-[0.99]',
  active:
    'bg-[var(--color-primary)] bg-opacity-10 border border-[var(--color-primary)] border-opacity-20',
  inactive:
    'hover:bg-[var(--color-border)] hover:bg-opacity-50 hover:shadow-sm border border-transparent hover:border-[var(--color-border)] hover:border-opacity-50',
  title: 'font-sans font-medium text-[var(--color-text-primary)] break-words sm:truncate',
  duration: 'font-sans text-sm text-[var(--color-text-secondary)] whitespace-nowrap ml-auto pl-4',
  artist: 'font-sans text-[var(--color-text-secondary)] truncate',
  composer: 'font-sans text-[var(--color-text-secondary)] opacity-75 truncate ml-1',
  metadata: 'font-sans text-[var(--color-text-secondary)] opacity-75',
  genre:
    'font-sans text-xs px-2 py-0.5 rounded-full bg-[var(--color-border)] text-[var(--color-text-secondary)]',
  container: {
    willChange: 'transform',
    contain: 'layout style paint',
  },
  loading: 'animate-pulse',
} as const;

// Animation constants
export const ANIMATIONS = {
  hover: {
    scale: 1.02,
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
} as const;
