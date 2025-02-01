export interface Track {
  id: string;
  title: string;
  artist: string;
  composer?: string;
  isOriginal: boolean;
  duration: string;
  coverArt: string;
  audioUrl: string;
  type: 'audio/mp3' | 'audio/mp4' | 'audio/x-m4a';
  genre?: string;
  waveform?: number[];
  priority?: boolean;
  instrument: 'guitar' | 'piano' | 'guitar/piano';
}

// Add preloading and caching utilities with memory management
const CACHE_SIZE_LIMIT = 5;
const PRELOAD_CHUNK_SIZE = 2;
const PRELOAD_DELAY = 100;

interface CacheEntry {
  audio: HTMLAudioElement;
  lastAccessed: number;
  loaded: boolean;
}

// Use a more efficient cache implementation with Map
const preloadPromises = new Map<string, Promise<void>>();

// Implement LRU cache with better memory management
class LRUCache {
  private readonly maxSize: number;
  private readonly cache: Map<string, CacheEntry>;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
    this.cache = new Map();
  }

  get(key: string): CacheEntry | undefined {
    const entry = this.cache.get(key);
    if (entry) {
      // Update last accessed time
      entry.lastAccessed = Date.now();
      // Move to end (most recently used)
      this.cache.delete(key);
      this.cache.set(key, entry);
    }
    return entry;
  }

  set(key: string, entry: CacheEntry): void {
    if (this.cache.size >= this.maxSize) {
      // Remove least recently used entry
      const entries = Array.from(this.cache.entries());
      const [oldestKey] = entries[0] || [];
      if (oldestKey) {
        this.remove(oldestKey);
      }
    }
    this.cache.set(key, entry);
  }

  remove(key: string): void {
    const entry = this.cache.get(key);
    if (entry) {
      const { audio } = entry;
      // Clean up audio element
      audio.pause();
      audio.src = '';
      audio.load();
      URL.revokeObjectURL(audio.src);
      this.cache.delete(key);
    }
  }

  clear(): void {
    for (const key of this.cache.keys()) {
      this.remove(key);
    }
  }
}

const cache = new LRUCache(CACHE_SIZE_LIMIT);

// Optimize preloading with better error handling and memory management
export const preloadTrack = async (track: Track): Promise<void> => {
  // Check cache first
  const cached = cache.get(track.id);
  if (cached?.loaded) {
    return Promise.resolve();
  }

  // Return existing promise if already preloading
  if (preloadPromises.has(track.id)) {
    return preloadPromises.get(track.id)!;
  }

  const promise = new Promise<void>((resolve, reject) => {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.crossOrigin = 'anonymous';

    const cleanup = () => {
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('error', handleError);
      preloadPromises.delete(track.id);
    };

    const handleCanPlayThrough = () => {
      cleanup();
      cache.set(track.id, {
        audio,
        lastAccessed: Date.now(),
        loaded: true
      });
      resolve();
    };

    const handleError = (e: ErrorEvent) => {
      cleanup();
      const error = new Error(`Failed to preload track: ${track.id}`);
      console.error(error, e);
      reject(error);
    };

    audio.addEventListener('canplaythrough', handleCanPlayThrough, { once: true });
    audio.addEventListener('error', handleError, { once: true });

    // Start loading
    audio.src = track.audioUrl;
    audio.load();

    // Add to cache immediately but mark as not loaded
    cache.set(track.id, {
      audio,
      lastAccessed: Date.now(),
      loaded: false
    });
  });

  preloadPromises.set(track.id, promise);
  return promise;
};

// Optimize batch preloading with chunking and delays
export const preloadNextTracks = async (currentId: string, count: number = PRELOAD_CHUNK_SIZE): Promise<void> => {
  const currentIndex = TRACKS.findIndex(t => t.id === currentId);
  const tracksToPreload = Array.from({ length: count }, (_, i) => {
    const nextIndex = (currentIndex + i + 1) % TRACKS.length;
    return TRACKS[nextIndex]!;
  });

  // Preload in chunks with delays to prevent overwhelming the browser
  for (let i = 0; i < tracksToPreload.length; i++) {
    const track = tracksToPreload[i]!;
    try {
      await preloadTrack(track);
      // Add delay between preloads
      if (i < tracksToPreload.length - 1) {
        await new Promise(resolve => setTimeout(resolve, PRELOAD_DELAY));
      }
    } catch (error) {
      console.warn(`Failed to preload track ${track.id}:`, error);
    }
  }
};

export const getCachedAudio = (trackId: string): HTMLAudioElement | undefined => {
  const cached = cache.get(trackId);
  return cached?.loaded ? cached.audio : undefined;
};

// Optimize waveform generation with Web Workers and caching
const generateWaveform = (() => {
  const waveformCache = new Map<string, number[]>();
  let worker: Worker | undefined;

  // Create worker only if supported
  if (typeof Worker !== 'undefined') {
    try {
      const workerCode = `
        self.onmessage = function(e) {
          const { id, length } = e.data;
          const waveform = Array.from({ length }, () => Math.random());
          self.postMessage({ id, waveform });
        };
      `;
      const blob = new Blob([workerCode], { type: 'application/javascript' });
      worker = new Worker(URL.createObjectURL(blob));
    } catch (e) {
      console.warn('Web Workers not supported, falling back to main thread');
    }
  }

  return (id: string, length: number = 100): number[] => {
    if (waveformCache.has(id)) {
      return waveformCache.get(id)!;
    }

    const waveform = Array.from({ length }, () => Math.random());
    waveformCache.set(id, waveform);

    if (worker) {
      worker.postMessage({ id, length });
      worker.onmessage = (e) => {
        if (e.data.id === id) {
          waveformCache.set(id, e.data.waveform);
        }
      };
    }

    return waveform;
  };
})();

// Helper function to get audio URL
const getAudioUrl = (filename: string): string => {
  if (typeof window === 'undefined') return `/audio/${filename}`;
  return new URL(`/audio/${filename}`, window.location.origin).href;
};

export const TRACKS: readonly Track[] = [
  {
    id: '8',
    title: 'Christmas Time Is Here',
    artist: 'Zachary Roth',
    composer: 'Vince Guaraldi',
    isOriginal: false,
    duration: '3:45',
    genre: 'Jazz',
    type: 'audio/x-m4a',
    coverArt: '/audio/covers/christmas-time-is-here.jpg',
    audioUrl: getAudioUrl('piano_christmas-time-is-here.m4a'),
    waveform: generateWaveform('8'),
    instrument: 'piano',
    priority: true,
  },
  {
    id: '12',
    title: 'Nocturne No. 20 in C♯ Minor',
    artist: 'Zachary Roth',
    composer: 'Frédéric Chopin',
    isOriginal: false,
    duration: '3:39',
    genre: 'Classical',
    type: 'audio/x-m4a',
    coverArt: '/audio/covers/nocturne-20.jpg',
    audioUrl: '/audio/piano_nocturne-20.m4a',
    waveform: generateWaveform('12'),
    instrument: 'piano',
    priority: true,
  },
  {
    id: '7',
    title: 'Arabesque No. 1',
    artist: 'Zachary Roth',
    composer: 'Claude Debussy',
    isOriginal: false,
    duration: '5:36',
    genre: 'Classical',
    type: 'audio/x-m4a',
    coverArt: '/audio/covers/arabesque.jpg',
    audioUrl: '/audio/piano_arabesque-1.m4a',
    waveform: generateWaveform('7'),
    instrument: 'piano',
    priority: true,
  },
  {
    id: '1',
    title: 'Canción de Cuna',
    artist: 'Zachary Roth',
    composer: 'Leo Brouwer',
    isOriginal: false,
    duration: '2:30',
    genre: 'Classical',
    type: 'audio/x-m4a',
    coverArt: '/audio/covers/cancion-de-cuna.jpg',
    audioUrl: '/audio/guitar_cancion_de_cuna.m4a',
    waveform: generateWaveform('1'),
    instrument: 'guitar',
  },
  {
    id: '2',
    title: 'Étude in A Major',
    artist: 'Zachary Roth',
    composer: 'Napoléon Coste',
    isOriginal: false,
    duration: '3:00',
    genre: 'Classical',
    type: 'audio/x-m4a',
    coverArt: '/audio/covers/etude-a-major.jpg',
    audioUrl: '/audio/guitar_etude-en-la-majeur.m4a',
    waveform: generateWaveform('2'),
    instrument: 'guitar',
  },
  {
    id: '3',
    title: 'The Godfather Theme',
    artist: 'Zachary Roth',
    composer: 'Nino Rota',
    isOriginal: false,
    duration: '1:47',
    genre: 'Film Score',
    type: 'audio/x-m4a',
    coverArt: '/audio/covers/godfather.jpg',
    audioUrl: '/audio/guitar_godfather-theme.m4a',
    waveform: generateWaveform('3'),
    instrument: 'guitar',
  },
  {
    id: '4',
    title: 'Habanera from Carmen',
    artist: 'Zachary Roth',
    composer: 'Georges Bizet',
    isOriginal: false,
    duration: '2:26',
    genre: 'Classical',
    type: 'audio/x-m4a',
    coverArt: '/audio/covers/habanera.jpg',
    audioUrl: '/audio/guitar_habenera-de-carmen.m4a',
    waveform: generateWaveform('4'),
    instrument: 'guitar',
  },
  {
    id: '5',
    title: 'How Deep is Your Love',
    artist: 'Zachary Roth',
    composer: 'Bee Gees',
    isOriginal: false,
    duration: '2:36',
    genre: 'Pop',
    type: 'audio/x-m4a',
    coverArt: '/audio/covers/how-deep-is-your-love.jpg',
    audioUrl: '/audio/guitar_how-deep-is-your-love.m4a',
    waveform: generateWaveform('5'),
    instrument: 'guitar',
  },
  {
    id: '6',
    title: 'Violin Partita No. 3 in E Major',
    artist: 'Zachary Roth',
    composer: 'Johann Sebastian Bach',
    isOriginal: false,
    duration: '6:29',
    genre: 'Classical',
    type: 'audio/x-m4a',
    coverArt: '/audio/covers/violin-partita.jpg',
    audioUrl: '/audio/guitar_violin-partita-3.m4a',
    waveform: generateWaveform('6'),
    instrument: 'guitar',
  },
  {
    id: '9',
    title: 'Minuet in G Major',
    artist: 'Zachary Roth',
    composer: 'Johann Sebastian Bach',
    isOriginal: false,
    duration: '0:54',
    genre: 'Classical',
    type: 'audio/x-m4a',
    coverArt: '/audio/covers/minuet.jpg',
    audioUrl: '/audio/piano_minuet-in-G-major.m4a',
    waveform: generateWaveform('9'),
    instrument: 'piano',
  },
  {
    id: '10',
    title: 'Moonlight Sonata',
    artist: 'Zachary Roth',
    composer: 'Ludwig van Beethoven',
    isOriginal: false,
    duration: '5:37',
    genre: 'Classical',
    type: 'audio/x-m4a',
    coverArt: '/audio/covers/moonlight-sonata.jpg',
    audioUrl: '/audio/piano_moonlight-sonata.m4a',
    waveform: generateWaveform('10'),
    instrument: 'piano',
  },
  {
    id: '11',
    title: 'Nocturne No. 1 in B♭ minor',
    artist: 'Zachary Roth',
    composer: 'Frédéric Chopin',
    isOriginal: false,
    duration: '5:28',
    genre: 'Classical',
    type: 'audio/x-m4a',
    coverArt: '/audio/covers/nocturne-1.jpg',
    audioUrl: '/audio/piano_nocturne-1.m4a',
    waveform: generateWaveform('11'),
    instrument: 'piano',
  },
  {
    id: '13',
    title: 'Prelude in C Major',
    artist: 'Zachary Roth',
    composer: 'Johann Sebastian Bach',
    isOriginal: false,
    duration: '2:15',
    genre: 'Classical',
    type: 'audio/x-m4a',
    coverArt: '/audio/covers/prelude-c.jpg',
    audioUrl: '/audio/piano_prelude-c.m4a',
    waveform: generateWaveform('13'),
    instrument: 'piano',
  },
  {
    id: '14',
    title: 'The Entertainer',
    artist: 'Zachary Roth',
    composer: 'Scott Joplin',
    isOriginal: false,
    duration: '2:23',
    genre: 'Ragtime',
    type: 'audio/x-m4a',
    coverArt: '/audio/covers/entertainer.jpg',
    audioUrl: '/audio/piano_the_entertainer.m4a',
    waveform: generateWaveform('14'),
    instrument: 'piano',
  }
] as const;

// Optimize track utilities with memoization and type optimization
const trackMap = new Map(TRACKS.map(track => [track.id, track]));

export const getTrackById = (id: string): Track | undefined => trackMap.get(id);

export const getNextTrack = (currentId: string): Track => {
  const currentIndex = TRACKS.findIndex(t => t.id === currentId);
  const nextTrack = TRACKS[(currentIndex + 1) % TRACKS.length]!;
  // Preload next track in the background
  preloadTrack(nextTrack).catch(console.error);
  return nextTrack;
};

export const getPreviousTrack = (currentId: string): Track => {
  const currentIndex = TRACKS.findIndex(t => t.id === currentId);
  const prevTrack = TRACKS[currentIndex === 0 ? TRACKS.length - 1 : currentIndex - 1]!;
  // Preload previous track in the background
  preloadTrack(prevTrack).catch(console.error);
  return prevTrack;
};

// Initialize preloading of high priority tracks with better error handling and chunking
if (typeof window !== 'undefined') {
  const priorityTracks = TRACKS.filter(track => track.priority);
  
  const preloadWithChunking = async () => {
    for (let i = 0; i < priorityTracks.length; i++) {
      try {
        await preloadTrack(priorityTracks[i]!);
        // Add delay between preloads
        if (i < priorityTracks.length - 1) {
          await new Promise(resolve => setTimeout(resolve, PRELOAD_DELAY));
        }
      } catch (error) {
        console.error(`Failed to preload priority track ${priorityTracks[i]!.id}:`, error);
      }
    }
  };

  // Start preloading after a short delay to not block initial page load
  setTimeout(() => {
    preloadWithChunking().catch(console.error);
  }, 1000);
}

// Clean up resources on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('unload', () => {
    cache.clear();
    preloadPromises.clear();
  });
} 