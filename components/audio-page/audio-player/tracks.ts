import { audioErrorHandler } from './utils/error-handlers';

// Core types and interfaces
export interface Track {
  id: string;
  title: string;
  artist: string;
  composer?: string;
  duration: string;
  coverArt: string;
  getSignedUrl: () => Promise<string>;
  type: 'audio/mp3' | 'audio/mp4' | 'audio/mpeg' | 'audio/webm' | 'audio/ogg' | 'audio/aac';
  genre?: string;
  priority?: boolean;
  instrument: 'Piano' | 'Pianos' | 'Guitar' | 'Guitars' | 'Band';
}

// LRU Cache implementation
class LRUCache<K, V> {
  private cache: Map<K, V>;
  private readonly maxSize: number;
  private readonly onEvict: ((key: K, value: V) => void) | undefined;

  constructor(maxSize: number, onEvict?: (key: K, value: V) => void) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.onEvict = onEvict;
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (value) {
      // Move to end (most recently used)
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      const entries = Array.from(this.cache.entries());
      if (entries.length > 0) {
        const firstEntry = entries[0];
        if (firstEntry) {
          const [firstKey, firstValue] = firstEntry;
          this.cache.delete(firstKey);
          this.onEvict?.(firstKey, firstValue);
        }
      }
    }
    this.cache.set(key, value);
  }

  clear(): void {
    if (this.onEvict) {
      for (const [key, value] of this.cache.entries()) {
        this.onEvict(key, value);
      }
    }
    this.cache.clear();
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }
}

// Consolidated configuration with explicit types
const CONFIG = {
  AUDIO: {
    CACHE_SIZE: 3,
    MAX_RETRIES: 2,
    RETRY_DELAY: 1000,
    FORMATS: ['audio/mp4', 'audio/mpeg', 'audio/webm'] as const,
    URL_CACHE_DURATION: 3600000, // 1 hour
  },
  PRELOAD: {
    DELAY: 300, // Reduce from 1000ms to 300ms for faster initial load
    CONCURRENT_LIMIT: 2,
    METADATA_ONLY_FIRST: true, // Only load metadata for first pass
  },
} as const;

// Optimized URL cache using LRU
const urlCache = new LRUCache<string, { url: string; expires: number }>(10);

async function getAudioUrl(filename: string, format: string | undefined): Promise<string> {
  const cacheKey = `${filename}:${format}`;
  const cached = urlCache.get(cacheKey);

  if (cached && cached.expires > Date.now()) {
    return cached.url;
  }

  const baseUrl =
    typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : '';

  try {
    const formatMap = {
      'audio/mp4': 'm4a',
      'audio/mpeg': 'mp3',
      'audio/webm': 'webm',
    } as const;

    const formatExtension =
      format && Object.prototype.hasOwnProperty.call(formatMap, format)
        ? formatMap[format as keyof typeof formatMap]
        : 'm4a';

    const normalizedFilename = filename
      .replace(/\.(m4a|mp3|webm)$/, '')
      .replace(/^\/+|\/+$/g, '')
      .replace(/[^a-zA-Z0-9-_/]/g, '_');

    const params = new URLSearchParams({
      key: normalizedFilename,
      format: formatExtension,
    });

    const requestUrl = `${baseUrl}/api/audio/sign-url?${params}`;
    const response = await fetch(requestUrl);

    if (!response.ok) {
      throw new Error(`Failed to load audio: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.url || typeof data.url !== 'string') {
      throw new Error('Invalid response: missing URL');
    }

    urlCache.set(cacheKey, {
      url: data.url,
      expires: Date.now() + CONFIG.AUDIO.URL_CACHE_DURATION,
    });

    return data.url;
  } catch (error) {
    const err = error instanceof Error ? error : new Error('URL request failed');
    audioErrorHandler.handleError(err, 'getAudioUrl', {
      filename,
      format,
      origin: typeof window !== 'undefined' ? window.location.origin : 'unknown',
    });
    throw err;
  }
}

// Optimized AudioManager with LRU cache
export class AudioManager {
  private static instance: AudioManager;
  private currentAudio: HTMLAudioElement | null = null;
  private cache: LRUCache<string, HTMLAudioElement>;
  private loadingTracks = new Set<string>();
  private abortControllers = new Map<string, AbortController>();
  private preloadedUrls = new Map<string, string>();
  private activeRequests = 0;
  private readonly MAX_CONCURRENT_REQUESTS = 2;
  private requestQueue: Array<{
    trackId: string;
    resolve: (audio: HTMLAudioElement) => void;
    reject: (error: Error) => void;
  }> = [];

  private constructor() {
    this.cache = new LRUCache(CONFIG.AUDIO.CACHE_SIZE, (_, audio) => {
      audio.pause();
      audio.src = '';
      audio.load();
    });
  }

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  private processQueue(): void {
    if (this.requestQueue.length === 0 || this.activeRequests >= this.MAX_CONCURRENT_REQUESTS) {
      return;
    }

    while (this.requestQueue.length > 0 && this.activeRequests < this.MAX_CONCURRENT_REQUESTS) {
      const nextRequest = this.requestQueue.shift();
      if (!nextRequest) break;

      const { trackId, resolve, reject } = nextRequest;
      this.activeRequests++;

      // Get the track info from TRACKS array
      const track = TRACKS.find((t) => t.id === trackId);
      if (!track) {
        this.activeRequests--;
        reject(new Error(`Track not found: ${trackId}`));
        this.processQueue();
        continue;
      }

      // Process the actual load
      void this._loadTrack(track)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.activeRequests--;
          this.processQueue();
        });
    }
  }

  private async _loadTrack(track: Track, retryCount = 0): Promise<HTMLAudioElement> {
    if (this.loadingTracks.has(track.id)) {
      throw new Error('Track is already loading');
    }

    const cached = this.cache.get(track.id);
    if (cached) {
      return cached;
    }

    this.loadingTracks.add(track.id);
    const controller = new AbortController();
    this.abortControllers.set(track.id, controller);

    try {
      // Use preloaded URL if available
      let url = this.preloadedUrls.get(track.id);
      if (!url) {
        url = await track.getSignedUrl();
        this.preloadedUrls.set(track.id, url);
      }

      const audio = new Audio();
      audio.src = url;
      audio.preload = 'metadata'; // Only load metadata initially

      await new Promise<void>((resolve, reject) => {
        const cleanup = () => {
          audio.removeEventListener('loadedmetadata', handleLoad);
          audio.removeEventListener('error', handleError);
        };

        const handleLoad = () => {
          cleanup();
          resolve();
        };

        const handleError = () => {
          cleanup();
          this.preloadedUrls.delete(track.id); // Clear failed URL
          reject(new Error('Failed to load audio metadata'));
        };

        audio.addEventListener('loadedmetadata', handleLoad, { once: true });
        audio.addEventListener('error', handleError, { once: true });

        // Handle abort
        controller.signal.addEventListener('abort', () => {
          cleanup();
          reject(new Error('Loading aborted'));
        });
      });

      this.cache.set(track.id, audio);
      return audio;
    } catch (error) {
      if (retryCount < CONFIG.AUDIO.MAX_RETRIES && !controller.signal.aborted) {
        await new Promise((resolve) => setTimeout(resolve, CONFIG.AUDIO.RETRY_DELAY));
        return this._loadTrack(track, retryCount + 1);
      }
      throw error;
    } finally {
      this.loadingTracks.delete(track.id);
      this.abortControllers.delete(track.id);
    }
  }

  async loadTrack(track: Track): Promise<HTMLAudioElement> {
    const cached = this.cache.get(track.id);
    if (cached) {
      return cached;
    }

    // Check if already loading
    if (this.loadingTracks.has(track.id)) {
      return new Promise((resolve, reject) => {
        this.requestQueue.push({ trackId: track.id, resolve, reject });
      });
    }

    // Check if we can start loading immediately or need to queue
    if (this.activeRequests < this.MAX_CONCURRENT_REQUESTS) {
      this.activeRequests++;
      try {
        return await this._loadTrack(track);
      } finally {
        this.activeRequests--;
        this.processQueue();
      }
    } else {
      // Queue the request
      return new Promise((resolve, reject) => {
        this.requestQueue.push({ trackId: track.id, resolve, reject });
        this.processQueue();
      });
    }
  }

  // Preload just the URL - don't create Audio object yet
  async preloadTrackMetadata(track: Track): Promise<void> {
    if (
      this.preloadedUrls.has(track.id) ||
      this.cache.has(track.id) ||
      this.loadingTracks.has(track.id)
    ) {
      return; // Already loaded or loading
    }

    try {
      // Don't add to active requests count since we're just getting URL
      const url = await track.getSignedUrl();
      this.preloadedUrls.set(track.id, url);
    } catch (error) {
      audioErrorHandler.handleError(
        error instanceof Error ? error : new Error('Failed to preload track URL'),
        'preloadTrackMetadata',
        { trackId: track.id }
      );
    }
  }

  setCurrentAudio(audio: HTMLAudioElement | null): void {
    if (this.currentAudio && this.currentAudio !== audio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }
    this.currentAudio = audio;
  }

  getCurrentAudio(): HTMLAudioElement | null {
    return this.currentAudio;
  }

  abortLoading(trackId: string): void {
    const controller = this.abortControllers.get(trackId);
    if (controller) {
      controller.abort();
      this.abortControllers.delete(trackId);
    }

    // Also remove from queue if present
    const queueIndex = this.requestQueue.findIndex((req) => req.trackId === trackId);
    if (queueIndex !== -1) {
      const request = this.requestQueue.splice(queueIndex, 1)[0];
      if (request) {
        request.reject(new Error('Loading aborted'));
      }
    }
  }

  cleanup(): void {
    // Abort all pending loads
    for (const [trackId, controller] of this.abortControllers.entries()) {
      controller.abort();
      this.abortControllers.delete(trackId);
    }

    // Reject all queued requests
    for (const request of this.requestQueue) {
      request.reject(new Error('AudioManager cleanup'));
    }
    this.requestQueue = [];
    this.activeRequests = 0;

    // Clear all caches
    this.cache.clear();
    this.loadingTracks.clear();
    this.preloadedUrls.clear();
    this.currentAudio = null;
  }
}

// Track manager improvements
class TrackManager {
  private currentId: string | null = null;
  private preloadQueue = new Set<string>();
  private preloadTimeout: NodeJS.Timeout | null = null;
  private isPreloadingMetadata = true; // Start with metadata-only mode

  constructor(private readonly tracks: readonly Track[]) {
    this.setupPreloading();
  }

  private setupPreloading(): void {
    if (typeof window === 'undefined') return;

    // First phase: quickly preload metadata for all tracks
    // This helps the UI display track info immediately
    this.preloadTimeout = setTimeout(() => {
      // First prefetch initial track metadata
      const initialTrack = this.tracks[0];
      if (initialTrack) {
        void audioManager.preloadTrackMetadata(initialTrack);
      }

      // Then queue up priority tracks in order
      const priorityTracks = this.tracks.filter((track) => track.priority);
      for (const track of priorityTracks) {
        void this.preloadMetadataOnly(track.id);
      }

      // Schedule the second phase of preloading (full audio for priority tracks)
      setTimeout(() => {
        this.isPreloadingMetadata = false;
        // Preload first and next track audio data
        if (this.tracks.length > 0) {
          void this.preload(this.tracks[0]!.id);
          if (this.tracks.length > 1) {
            void this.preload(this.tracks[1]!.id);
          }
        }
      }, 2000); // 2 seconds later, start preloading full audio
    }, CONFIG.PRELOAD.DELAY);

    window.addEventListener('unload', () => this.cleanup(), { once: true });
  }

  // New method to just preload track metadata quickly
  async preloadMetadataOnly(id: string): Promise<void> {
    if (this.preloadQueue.has(id)) return;

    const track = this.getById(id);
    if (!track) return;

    this.preloadQueue.add(id);
    try {
      await audioManager.preloadTrackMetadata(track);
    } catch (error) {
      audioErrorHandler.handleError(
        error instanceof Error ? error : new Error('Failed to preload track metadata'),
        'preloadMetadata',
        { trackId: id }
      );
    } finally {
      this.preloadQueue.delete(id);
    }
  }

  async preload(id: string): Promise<void> {
    if (this.preloadQueue.has(id)) return;

    const track = this.getById(id);
    if (!track) return;

    // If still in metadata-only phase and not the current track, just load metadata
    if (this.isPreloadingMetadata && id !== this.currentId) {
      return this.preloadMetadataOnly(id);
    }

    this.preloadQueue.add(id);
    try {
      await audioManager.loadTrack(track);
    } catch (error) {
      audioErrorHandler.handleError(
        error instanceof Error ? error : new Error('Failed to preload track'),
        'preload',
        { trackId: id }
      );
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
      // When setting current track, prioritize preloading the next track
      const currentIndex = this.tracks.findIndex((t) => t.id === id);
      if (currentIndex >= 0 && currentIndex < this.tracks.length - 1) {
        void this.preload(this.tracks[currentIndex + 1]!.id);
      }
    }
  }

  getCurrent(): Track | null {
    return this.currentId ? (this.getById(this.currentId) ?? null) : null;
  }

  cleanup(): void {
    if (this.preloadTimeout) clearTimeout(this.preloadTimeout);
    this.preloadQueue.clear();
    audioManager.cleanup();
  }
}

export const audioManager = AudioManager.getInstance();

// Export track data with optimized URL generation
export const TRACKS = [
  {
    id: '11',
    title: 'Nocturne No. 1 in B♭ Minor',
    artist: 'Zachary Roth',
    composer: 'Frédéric Chopin',
    duration: '5:28',
    genre: 'Classical',
    type: 'audio/mp4',
    coverArt: '/audio/covers/nocturne-1.jpg',
    getSignedUrl: () => getAudioUrl('piano/nocturne-1', 'audio/mp4'),
    instrument: 'Piano',
  },
  {
    id: 'midnight-the-stars-and-you',
    title: 'Midnight, the Stars and You',
    artist: 'Zachary Roth',
    composer: 'Harry Woods',
    duration: '4:54',
    genre: 'Jazz',
    type: 'audio/mp4',
    coverArt: '/audio/covers/midnight-the-stars-and-you.jpg',
    getSignedUrl: () => getAudioUrl('piano/midnight-the-stars-and-you', 'audio/mp4'),
    instrument: 'Piano',
    priority: true,
  },
  {
    id: '8',
    title: 'Christmas Time Is Here',
    artist: 'Zachary Roth',
    composer: 'Vince Guaraldi',
    duration: '6:48',
    genre: 'Jazz',
    type: 'audio/mp4',
    coverArt: '/audio/covers/christmas-time-is-here.jpg',
    getSignedUrl: () => getAudioUrl('piano/christmas-time-is-here', 'audio/mp4'),
    instrument: 'Piano',
    priority: true,
  },
  {
    id: '7',
    title: 'Arabesque No. 1',
    artist: 'Zachary Roth',
    composer: 'Claude Debussy',
    duration: '5:36',
    genre: 'Classical',
    type: 'audio/mp4',
    coverArt: '/audio/covers/arabesque.jpg',
    getSignedUrl: () => getAudioUrl('piano/arabesque-1', 'audio/mp4'),
    instrument: 'Piano',
    priority: true,
  },
  {
    id: '14',
    title: 'The Entertainer',
    artist: 'Zachary Roth',
    composer: 'Scott Joplin',
    duration: '2:23',
    genre: 'Ragtime',
    type: 'audio/mp4',
    coverArt: '/audio/covers/entertainer.jpg',
    getSignedUrl: () => getAudioUrl('piano/the_entertainer', 'audio/mp4'),
    instrument: 'Piano',
  },
] as const;

// Export simplified interface
const manager = new TrackManager(TRACKS);
export const getTrackById = (id: string | null) => manager.getById(id);
export const getNextTrack = (id: string | null) => manager.getNext(id);
export const getPreviousTrack = (id: string | null) => manager.getPrevious(id);
export const getCurrentTrack = () => manager.getCurrent();
export const setCurrentTrack = (id: string | null) => manager.setCurrent(id);
export const cleanup = () => manager.cleanup();
