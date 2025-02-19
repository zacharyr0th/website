// Import selectOptimalFormat from AudioPlayer
import { selectOptimalFormat } from './utils/format-selection';
import { createLogger, LogCategory } from '@/lib/core/logger';

// Create logger instance for audio player
const logger = createLogger('audio-player', { category: LogCategory.APPLICATION });

// Core types and interfaces
export interface Track {
  id: string;
  title: string;
  artist: string;
  composer?: string;
  isOriginal: boolean;
  duration: string;
  coverArt: string;
  audioUrl: string;
  getSignedUrl: () => Promise<string>;
  type: 'audio/mp3' | 'audio/mp4' | 'audio/mpeg' | 'audio/webm' | 'audio/ogg' | 'audio/aac';
  genre?: string;
  waveform?: number[];
  priority?: boolean;
  instrument: 'guitar' | 'piano' | 'guitar/piano';
}

// Consolidated configuration
const CONFIG = {
  AUDIO: {
    CACHE_SIZE: 5,
    CHUNK_SIZE: 1024 * 1024, // 1MB chunks
    FORMATS: [
      'audio/webm;codecs=opus',
      'audio/mpeg',
      'audio/mp4',
      'audio/aac',
      'audio/ogg;codecs=opus',
    ] as const,
    MAX_MEMORY: 100 * 1024 * 1024, // 100MB
  },
  PRELOAD: {
    CHUNK_SIZE: 2,
    DELAY: 100,
    THRESHOLD: 0.1,
    RETRY: {
      ATTEMPTS: 3,
      DELAY: 1000,
    },
    STRATEGY: {
      VISIBLE_THRESHOLD: 0.75,
      CONCURRENT_LIMIT: 3,
      WEIGHTS: {
        userHistory: 0.4,
        similarity: 0.3,
        popularity: 0.3,
      },
    },
  },
  WAVEFORM: {
    LENGTH: 100,
  },
} as const;

// Add at the beginning of the file, after imports
const getAudioUrl = async (filename: string, format: string | undefined): Promise<string> => {
  const baseUrl =
    typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : '';

  try {
    // Convert MIME type to file extension
    const formatMap = {
      'audio/mp4': 'm4a',
      'audio/mpeg': 'mp3',
      'audio/wav': 'wav',
      'audio/webm': 'webm',
      'audio/ogg': 'ogg',
      'audio/aac': 'm4a',
      // Add direct mappings for file extensions
      m4a: 'm4a',
      mp3: 'mp3',
      wav: 'wav',
    } as const;

    // Get format extension, defaulting to m4a if not found
    const formatExtension = format && typeof format === 'string' && Object.prototype.hasOwnProperty.call(formatMap, format)
      ? formatMap[format as keyof typeof formatMap]
      : 'm4a';

    // Normalize the filename but preserve underscores
    const normalizedFilename = filename
      .replace(/\.(m4a|mp3|wav|webm|ogg|aac)$/, '')
      .replace(/^\/+|\/+$/g, '')
      .replace(/[^a-zA-Z0-9-_/]/g, '_');

    // Build query parameters
    const params = new URLSearchParams();
    params.set('key', normalizedFilename);
    params.set('format', formatExtension);

    const requestUrl = `${baseUrl}/api/audio/sign-url?${params.toString()}`;
    logger.debug('Requesting audio URL', { 
      context: { 
        id: filename 
      } 
    });

    const response = await fetch(requestUrl);
    if (!response.ok) {
      throw new Error('Failed to load audio');
    }

    const data = await response.json();
    if (!data.url) {
      throw new Error('Failed to load audio');
    }

    logger.debug('Audio URL request successful', { 
      context: { 
        id: filename 
      } 
    });
    return data.url;
  } catch (error) {
    logger.error('Error getting audio URL', {
      error: new Error('URL request failed'),
      context: { id: filename },
    });
    throw new Error('Failed to load audio');
  }
};

const generateInitialWaveform = (length: number = CONFIG.WAVEFORM.LENGTH): number[] =>
  Array.from({ length }, () => Math.random() * 2 - 1);

// Unified error handling
class AudioError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'AudioError';
  }

  static create(code: string, message: string, details?: unknown): AudioError {
    return new AudioError(message, code, details);
  }
}

// Unified audio element management
class AudioManager {
  private static async getUrlWithRetry(track: Track, retries = 3): Promise<string> {
    logger.debug('Starting URL retry process', {
      context: { trackId: track.id, remainingRetries: retries },
    });

    for (let i = 0; i < retries; i++) {
      try {
        logger.debug('Attempting to get URL', {
          context: { trackId: track.id, attempt: i + 1, totalAttempts: retries },
        });

        const url = await track.getSignedUrl();

        if (!url) {
          logger.debug('Empty URL received', {
            context: { trackId: track.id, attempt: i + 1 },
          });
          throw new Error('Failed to load audio');
        }

        logger.debug('URL request successful', {
          context: { trackId: track.id, attempt: i + 1 },
        });
        return url;
      } catch (error) {
        // Only log as warning if it's the last retry
        if (i === retries - 1) {
          logger.warn('URL request attempt failed', {
            error: new Error('Failed to load audio'),
            context: {
              trackId: track.id,
              attempt: i + 1,
              remainingRetries: retries - i - 1,
            },
          });
        } else {
          logger.debug('URL request attempt failed, retrying', {
            context: {
              trackId: track.id,
              attempt: i + 1,
              remainingRetries: retries - i - 1,
            },
          });
        }

        if (i < retries - 1) {
          const delay = 1000 * (i + 1);
          logger.debug('Retrying after delay', {
            context: { trackId: track.id, delay },
          });
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    // Only log as error if all retries failed
    logger.error('All retry attempts failed', {
      error: new Error('Failed to load audio'),
      context: { trackId: track.id },
    });
    throw new Error('Failed to load audio');
  }

  static async cleanup(audio: HTMLAudioElement): Promise<void> {
    try {
      if (audio.src) {
        logger.debug('Cleaning up audio element');
        audio.pause();
        audio.currentTime = 0;
        audio.src = '';
        audio.removeAttribute('src');
        audio.load();

        const events = [
          'canplay',
          'canplaythrough',
          'error',
          'ended',
          'loadeddata',
          'loadedmetadata',
          'pause',
          'play',
          'timeupdate',
          'waiting',
        ];
        events.forEach((event) => {
          audio.removeEventListener(event, () => {});
        });
      }
    } catch (error) {
      logger.warn('Error cleaning up audio', {
        error: new Error('Cleanup failed'),
      });
    }
  }

  static async create(track: Track, options: { format?: string } = {}): Promise<HTMLAudioElement> {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.crossOrigin = 'anonymous';

    try {
      const format = options.format || (await selectOptimalFormat(navigator.userAgent));
      if (!format) {
        throw new AudioError('FORMAT_ERROR', 'No supported audio format found');
      }

      // Get URL with retry mechanism
      const url = await this.getUrlWithRetry(track);

      // Set up error handling before setting src
      const errorPromise = new Promise<never>((_, reject) => {
        const errorHandler = () => {
          const error = new AudioError('LOAD_ERROR', 'Failed to load audio');
          reject(error);
          audio.removeEventListener('error', errorHandler);
        };
        audio.addEventListener('error', errorHandler);
      });

      // Set up success handling
      const loadPromise = new Promise<HTMLAudioElement>((resolve) => {
        const loadHandler = () => {
          resolve(audio);
          audio.removeEventListener('canplaythrough', loadHandler);
        };
        audio.addEventListener('canplaythrough', loadHandler);
      });

      // Set the source and begin loading
      audio.src = url;
      audio.load();

      // Wait for either success or failure
      return Promise.race([loadPromise, errorPromise]);
    } catch (error) {
      await AudioManager.cleanup(audio);
      throw error instanceof AudioError
        ? error
        : new AudioError('AUDIO_ERROR', 'Failed to create audio element');
    }
  }
}

// Unified cache management
class AudioCache {
  private cache = new Map<
    string,
    {
      audio: HTMLAudioElement;
      lastAccessed: number;
      size: number;
    }
  >();
  private memoryUsage = 0;

  constructor(
    private maxSize: number = CONFIG.AUDIO.CACHE_SIZE,
    private maxMemory: number = CONFIG.AUDIO.MAX_MEMORY
  ) {}

  async set(id: string, audio: HTMLAudioElement): Promise<void> {
    const size = await this.estimateSize(audio);

    if (this.memoryUsage + size > this.maxMemory) {
      this.evictOldest();
    }

    if (this.cache.size >= this.maxSize) {
      this.evictOldest();
    }

    this.cache.set(id, {
      audio,
      lastAccessed: Date.now(),
      size,
    });
    this.memoryUsage += size;
  }

  get(id: string): HTMLAudioElement | undefined {
    const entry = this.cache.get(id);
    if (entry) {
      entry.lastAccessed = Date.now();
      return entry.audio;
    }
    return undefined;
  }

  private async estimateSize(audio: HTMLAudioElement): Promise<number> {
    return audio.duration ? Math.ceil((audio.duration * 128 * 1024) / 8) : 1024 * 1024;
  }

  private evictOldest(): void {
    const oldest = Array.from(this.cache.entries()).sort(
      ([, a], [, b]) => a.lastAccessed - b.lastAccessed
    )[0];

    if (oldest) {
      const [id, entry] = oldest;
      AudioManager.cleanup(entry.audio);
      this.cache.delete(id);
      this.memoryUsage -= entry.size;
    }
  }

  clear(): void {
    this.cache.forEach((entry) => AudioManager.cleanup(entry.audio));
    this.cache.clear();
    this.memoryUsage = 0;
  }
}

// Track management
class TrackManager {
  private cache = new AudioCache();
  private playHistory = new Map<string, { count: number; lastPlayed: number }>();
  private currentId: string | null = null;
  private preloadQueue = new Set<string>();

  constructor(private tracks: readonly Track[]) {
    this.setupPreloading();
  }

  private setupPreloading(): void {
    if (typeof window === 'undefined') return;

    // Preload priority tracks
    setTimeout(() => {
      this.tracks.filter((track) => track.priority).forEach((track) => this.preload(track.id));
    }, 1000);

    // Cleanup on unload
    window.addEventListener('unload', () => this.cleanup(), { once: true });
  }

  async preload(id: string): Promise<void> {
    if (this.preloadQueue.has(id) || this.cache.get(id)) return;

    this.preloadQueue.add(id);
    const track = this.getById(id);
    if (!track) return;

    try {
      const audio = await AudioManager.create(track);
      await this.cache.set(id, audio);
    } catch (error) {
      logger.warn('Failed to preload track', {
        error: error as Error,
        context: { trackId: id },
      });
    } finally {
      this.preloadQueue.delete(id);
    }
  }

  getById(id: string | null): Track | undefined {
    return id ? this.tracks.find((t) => t.id === id) : undefined;
  }

  getNext(currentId: string | null): Track {
    const index = this.tracks.findIndex((t) => t.id === currentId);
    const next = this.tracks[(index + 1) % this.tracks.length]!;
    void this.preload(next.id);
    return next;
  }

  getPrevious(currentId: string | null): Track {
    const index = this.tracks.findIndex((t) => t.id === currentId);
    const prev = this.tracks[index === 0 ? this.tracks.length - 1 : index - 1]!;
    void this.preload(prev.id);
    return prev;
  }

  setCurrent(id: string | null): void {
    this.currentId = id;
    if (id) {
      this.updateHistory(id);
      this.preloadSimilar(id);
    }
  }

  getCurrent(): Track | null {
    return this.currentId ? (this.getById(this.currentId) ?? null) : null;
  }

  private updateHistory(id: string): void {
    const history = this.playHistory.get(id) || { count: 0, lastPlayed: 0 };
    this.playHistory.set(id, {
      count: history.count + 1,
      lastPlayed: Date.now(),
    });
  }

  private preloadSimilar(id: string): void {
    const current = this.getById(id);
    if (!current) return;

    this.tracks
      .filter((t) => t.id !== id)
      .map((track) => ({
        track,
        similarity: this.calculateSimilarity(track, current),
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, CONFIG.PRELOAD.STRATEGY.CONCURRENT_LIMIT)
      .forEach(({ track }) => this.preload(track.id));
  }

  private calculateSimilarity(a: Track, b: Track): number {
    let score = 0;
    if (a.genre && b.genre && a.genre === b.genre) score += 0.4;
    if (a.artist === b.artist) score += 0.3;
    if (a.composer && b.composer && a.composer === b.composer) score += 0.2;
    if (a.instrument === b.instrument) score += 0.1;
    return score;
  }

  cleanup(): void {
    this.cache.clear();
    this.playHistory.clear();
    this.preloadQueue.clear();
  }
}

// Export track data and manager
export const TRACKS = [
  {
    id: 'midnight-the-stars-and-you',
    title: 'Midnight, the Stars and You',
    artist: 'Zachary Roth',
    composer: 'Harry M. Woods',
    isOriginal: false,
    duration: '3:15',
    genre: 'Jazz',
    type: 'audio/mp4',
    coverArt: '/audio/covers/midnight-the-stars-and-you.jpg',
    audioUrl: '', // This will be populated with the signed URL
    getSignedUrl: async () => {
      const format = await selectOptimalFormat(navigator.userAgent);
      return getAudioUrl('piano/midnight-the-stars-and-you', format);
    },
    waveform: generateInitialWaveform(),
    instrument: 'piano',
    priority: true,
  },
  {
    id: '8',
    title: 'Christmas Time Is Here',
    artist: 'Zachary Roth',
    composer: 'Vince Guaraldi',
    isOriginal: false,
    duration: '3:45',
    genre: 'Jazz',
    type: 'audio/mp4',
    coverArt: '/audio/covers/christmas-time-is-here.jpg',
    audioUrl: '', // This will be populated with the signed URL
    getSignedUrl: async () => {
      const format = await selectOptimalFormat(navigator.userAgent);
      return getAudioUrl('piano/christmas-time-is-here', format);
    },
    waveform: generateInitialWaveform(),
    instrument: 'piano',
    priority: true,
  },
  {
    id: '11',
    title: 'Nocturne No. 1 in B♭ Minor',
    artist: 'Zachary Roth',
    composer: 'Frédéric Chopin',
    isOriginal: false,
    duration: '5:28',
    genre: 'Classical',
    type: 'audio/mp4',
    coverArt: '/audio/covers/nocturne-1.jpg',
    audioUrl: '', // This will be populated with the signed URL
    getSignedUrl: async () => {
      const format = await selectOptimalFormat(navigator.userAgent);
      return getAudioUrl('piano/nocturne-1', format);
    },
    waveform: generateInitialWaveform(),
    instrument: 'piano',
  },
  {
    id: '7',
    title: 'Arabesque No. 1',
    artist: 'Zachary Roth',
    composer: 'Claude Debussy',
    isOriginal: false,
    duration: '5:36',
    genre: 'Classical',
    type: 'audio/mp4',
    coverArt: '/audio/covers/arabesque.jpg',
    audioUrl: '', // This will be populated with the signed URL
    getSignedUrl: async () => {
      const format = await selectOptimalFormat(navigator.userAgent);
      return getAudioUrl('piano/arabesque-1', format);
    },
    waveform: generateInitialWaveform(),
    instrument: 'piano',
    priority: true,
  },
  {
    id: '14',
    title: 'The Entertainer',
    artist: 'Zachary Roth',
    composer: 'Scott Joplin',
    isOriginal: false,
    duration: '2:23',
    genre: 'Ragtime',
    type: 'audio/mp4',
    coverArt: '/audio/covers/entertainer.jpg',
    audioUrl: '',
    getSignedUrl: async () => {
      const format = await selectOptimalFormat(navigator.userAgent);
      return getAudioUrl('piano/the_entertainer', format);
    },
    waveform: generateInitialWaveform(),
    instrument: 'piano',
  },
] as const;

const manager = new TrackManager(TRACKS);

// Export simplified interface with null-safe types
export const getTrackById = (id: string | null) => manager.getById(id);
export const getNextTrack = (id: string | null) => manager.getNext(id);
export const getPreviousTrack = (id: string | null) => manager.getPrevious(id);
export const getCurrentTrack = () => manager.getCurrent();
export const setCurrentTrack = (id: string | null) => manager.setCurrent(id);
export const cleanup = () => manager.cleanup();
