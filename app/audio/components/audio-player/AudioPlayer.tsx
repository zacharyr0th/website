import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  memo,
  lazy,
  Suspense,
  useMemo,
} from 'react';
import { motion } from 'framer-motion';
import type { Track } from './tracks';
import { TRACKS, getNextTrack, getPreviousTrack } from './tracks';
import { createLogger, LogCategory } from '@/lib/core/logger';

const logger = createLogger('audio-player', { category: LogCategory.APPLICATION });

// Lazy load heavy components with error boundaries
const PlaylistItem = lazy(() => import('./PlaylistItem'));
const ProgressBar = lazy(() => import('./ProgressBar'));

// Constants for common styles and animations
const BUTTON_BASE_STYLES = 'touch-manipulation transition-colors font-mono';
const BUTTON_HOVER_ANIMATION = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Types for consolidated event handlers
type AudioEventHandlers = {
  onTimeUpdate?: () => void;
  onLoadedMetadata?: () => void;
  onEnd?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onWaiting?: () => void;
  onCanPlay?: () => void;
};

const useAudioEventHandlers = (audio: HTMLAudioElement | null, handlers: AudioEventHandlers) => {
  useEffect(() => {
    if (!audio) return;

    const eventMap = {
      timeupdate: handlers.onTimeUpdate,
      loadedmetadata: handlers.onLoadedMetadata,
      ended: handlers.onEnd,
      play: handlers.onPlay,
      pause: handlers.onPause,
      waiting: handlers.onWaiting,
      canplay: handlers.onCanPlay,
    };

    Object.entries(eventMap).forEach(([event, handler]) => {
      if (handler) {
        audio.addEventListener(event, handler, { passive: true });
      }
    });

    return () => {
      Object.entries(eventMap).forEach(([event, handler]) => {
        if (handler) {
          audio.removeEventListener(event, handler);
        }
      });
    };
  }, [audio, handlers]);
};

const getMediaErrorType = (error: MediaError): string => {
  const code = error.code as 1 | 2 | 3 | 4;
  const errorTypes = new Map<1 | 2 | 3 | 4, string>([
    [MediaError.MEDIA_ERR_ABORTED, 'Playback aborted'],
    [MediaError.MEDIA_ERR_NETWORK, 'Network error occurred'],
    [MediaError.MEDIA_ERR_DECODE, 'Audio decoding failed'],
    [MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED, 'Audio format not supported'],
  ]);
  return errorTypes.get(code) || 'Unknown playback error';
};

// Replace console.error with logger
const handleSignedUrlError = () => {
  const err = new Error('Audio URL error');
  logger.error('Failed to get audio URL', err);
};

// Replace handleAudioError with more specific error handling
const handleAudioError = (error: Error | MediaError | null, isTrackChange = false) => {
  // If it's a track change, only log as debug
  if (isTrackChange) {
    logger.debug('Audio state change during track switch', { type: 'track_change' });
    return;
  }

  // For media errors, provide more specific error information
  if (error instanceof MediaError) {
    const err = new Error(getMediaErrorType(error));
    logger.error('Audio playback error', err, { code: String(error.code) });
    return;
  }

  // For other errors, log with available information
  const err = error || new Error('Unknown playback error');
  logger.error('Audio element error', err);
};

// Replace console.log with logger.debug
const handleAudioLoaded = (track: Track) => {
  logger.debug('Audio loaded successfully', { id: track.id });
};

// Replace console.error with logger
const handleLoadError = (track: Track) => {
  const err = new Error('Load error');
  logger.error('Failed to load audio', err, { id: track.id });
};

// Replace console.log with logger.debug
const handleNewAudioElement = (track: Track) => {
  logger.debug('Creating new audio element', { id: track.id });
};

// Replace playback logging
const handlePlaybackStart = () => {
  logger.debug('Playback started');
};

const handlePlaybackPause = () => {
  logger.debug('Playback paused');
};

const handlePlaybackResume = () => {
  logger.debug('Playback resumed');
};

// Replace playback logging
const handlePlaybackError = () => {
  const err = new Error('Playback failed');
  logger.error('Playback error', err);
};

// Replace track change logging
const handleTrackChange = (track: Track) => {
  logger.info('Now playing', { id: track.id });
};

// Define function types
type PlayTrackFunction = (track: Track) => Promise<void>;
type PlayNextTrackFunction = () => void;
type PlayPreviousTrackFunction = () => void;

// Extract audio state management into a custom hook with optimizations
const useAudioPlayer = (initialTrack: Track) => {
  const [currentTrack, setCurrentTrack] = useState<Track>(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout>();

  // Track user interaction
  useEffect(() => {
    const handleInteraction = () => {
      setHasUserInteracted(true);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  // Memoize state setters
  const setPlayingState = useCallback((state: boolean) => setIsPlaying(state), []);
  const setLoadingState = useCallback((state: boolean) => setIsLoading(state), []);
  const setBufferingState = useCallback((state: boolean) => setIsBuffering(state), []);
  const updateCurrentTrack = useCallback((track: Track) => setCurrentTrack(track), []);

  // Enhanced cleanup with better error handling
  const cleanup = useCallback(async () => {
    try {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }

      if (audioRef.current) {
        const audio = audioRef.current;

        // Ensure playback is stopped first
        try {
          audio.pause();
          audio.currentTime = 0;
          setIsPlaying(false);
        } catch (e) {
          // Ignore pause errors
        }

        // Properly remove all event listeners
        const events = [
          'timeupdate',
          'loadedmetadata',
          'ended',
          'play',
          'pause',
          'waiting',
          'canplay',
          'error',
          'stalled',
          'suspend',
        ];

        events.forEach((event) => {
          audio.removeEventListener(event, () => {});
        });

        // Reset audio state and clear source
        audio.src = '';
        audio.load();

        // Clear the reference
        audioRef.current = null;
      }

      // Reset all state
      setCurrentTime(0);
      setDuration(0);
      setIsPlaying(false);
      setIsLoading(false);
      setIsBuffering(false);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Cleanup failed');
      logger.warn('Error during cleanup', { error: err.message });
    }
  }, []);

  // Add component unmount cleanup
  useEffect(() => {
    return () => {
      void cleanup();
    };
  }, [cleanup]);

  // Enhanced audio creation with retry mechanism and better error handling
  const createNewAudio = useCallback(async (track: Track, retryCount = 0) => {
    if (!track) {
      throw new Error('Invalid track');
    }

    try {
      // Get URL with retries
      let url: string | undefined;
      for (let i = 0; i < 3; i++) {
        try {
          url = await track.getSignedUrl();
          if (url) break;
        } catch (error) {
          handleSignedUrlError();
          if (i < 2) {
            await new Promise((resolve) =>
              setTimeout(resolve, Math.min(1000 * Math.pow(2, i), 5000))
            );
          }
        }
      }

      if (!url) {
        throw new Error('Failed to load audio URL after retries');
      }

      // Create new audio element
      const audio = new Audio();
      audio.preload = 'auto';
      audio.crossOrigin = 'anonymous';
      audio.src = url;

      // Return a promise that resolves when the audio is ready
      return new Promise<HTMLAudioElement>((resolve, reject) => {
        const handleCanPlay = () => {
          cleanup();
          handleAudioLoaded(track);
          resolve(audio);
        };

        const handleError = () => {
          cleanup();
          handleLoadError(track);
          reject(new Error('Failed to load audio'));
        };

        const cleanup = () => {
          audio.removeEventListener('canplaythrough', handleCanPlay);
          audio.removeEventListener('error', handleError);
        };

        audio.addEventListener('canplaythrough', handleCanPlay);
        audio.addEventListener('error', handleError);

        // Start loading
        audio.load();
      });
    } catch (error) {
      // Implement retry logic for recoverable errors
      if (retryCount < 2) {
        const retryDelay = Math.min(1000 * Math.pow(2, retryCount), 5000);
        logger.warn('Retrying audio creation', {
          trackId: track.id,
          attempt: retryCount + 1,
          error: error instanceof Error ? error.message : 'Unknown error',
        });

        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return createNewAudio(track, retryCount + 1);
      }

      logger.error(
        'Failed to create audio after all retries',
        error instanceof Error ? error : new Error('Unknown error'),
        {
          trackId: track.id,
          retryCount,
        }
      );
      throw error;
    }
  }, []);

  // Helper to check audio format support
  const checkAudioSupport = useCallback(async (track: Track) => {
    const audio = document.createElement('audio');

    try {
      const url = await track.getSignedUrl();
      const response = await fetch(url, { method: 'HEAD' });
      const contentType = response.headers.get('content-type');
      const canPlay = audio.canPlayType(contentType || 'audio/mpeg');
      return canPlay !== '';
    } catch (error) {
      return false;
    } finally {
      audio.remove();
    }
  }, []);

  // Enhance togglePlay with better pause handling
  const togglePlay = useCallback(async () => {
    if (!hasUserInteracted) {
      logger.debug('Waiting for user interaction before playing audio');
      return;
    }

    try {
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        setPlayingState(false);
        handlePlaybackPause();
        return;
      }

      setLoadingState(true);

      if (!audioRef.current || !audioRef.current.src) {
        handleNewAudioElement(currentTrack);
        const audio = await createNewAudio(currentTrack);
        audioRef.current = audio;

        try {
          await audio.play();
          handlePlaybackStart();
          setPlayingState(true);
        } catch (playError) {
          if (playError instanceof Error && playError.name === 'NotAllowedError') {
            logger.warn('Playback not allowed - waiting for user interaction');
            setPlayingState(false);
          } else {
            handlePlaybackError();
            setPlayingState(false);
            throw playError;
          }
        }
      } else {
        if (isPlaying) {
          handlePlaybackPause();
          audioRef.current.pause();
          setPlayingState(false);
        } else {
          try {
            await audioRef.current.play();
            handlePlaybackResume();
            setPlayingState(true);
          } catch (playError) {
            if (playError instanceof Error && playError.name === 'NotAllowedError') {
              logger.warn('Playback not allowed - waiting for user interaction');
              setPlayingState(false);
            } else {
              handlePlaybackError();
              setPlayingState(false);
              throw playError;
            }
          }
        }
      }
    } catch (error) {
      handlePlaybackError();
      setPlayingState(false);
    } finally {
      setLoadingState(false);
    }
  }, [
    isPlaying,
    currentTrack,
    createNewAudio,
    setPlayingState,
    setLoadingState,
    hasUserInteracted,
  ]);

  // Modify playTrack to be more subtle
  const playTrack: PlayTrackFunction = useCallback(
    async (track) => {
      if (!hasUserInteracted) {
        logger.debug('Waiting for user interaction before playing audio');
        updateCurrentTrack(track);
        // Set initial duration from track metadata
        const [minutesStr, secondsStr] = track.duration.split(':');
        const minutes = parseInt(minutesStr || '0', 10);
        const seconds = parseInt(secondsStr || '0', 10);
        const initialDuration = minutes * 60 + seconds;
        setDuration(initialDuration);
        return;
      }

      // Check format support first
      const isSupported = await checkAudioSupport(track);
      if (!isSupported) {
        logger.warn('Audio format not supported', { track: track.id });
        updateCurrentTrack(track);
        // Set duration even if format is not supported
        const [minutesStr, secondsStr] = track.duration.split(':');
        const minutes = parseInt(minutesStr || '0', 10);
        const seconds = parseInt(secondsStr || '0', 10);
        const initialDuration = minutes * 60 + seconds;
        setDuration(initialDuration);
        setIsPlaying(false);
        return;
      }

      handleTrackChange(track);
      let newAudio: HTMLAudioElement | null = null;
      let removeListeners: (() => void) | undefined;

      try {
        setLoadingState(true);
        setBufferingState(true);

        // Update UI first for better responsiveness
        updateCurrentTrack(track);

        // Set initial duration from track metadata
        const [minutesStr, secondsStr] = track.duration.split(':');
        const minutes = parseInt(minutesStr || '0', 10);
        const seconds = parseInt(secondsStr || '0', 10);
        const initialDuration = minutes * 60 + seconds;
        setDuration(initialDuration);

        // Clean up existing audio before switching tracks
        await cleanup();

        // Create and set up new audio
        newAudio = await createNewAudio(track);
        if (!newAudio) {
          throw new Error('Failed to create audio element');
        }

        // Configure audio element
        newAudio.preload = 'auto';
        newAudio.autoplay = false;

        // Set up event listeners
        const setupEventListeners = (audio: HTMLAudioElement) => {
          const handlers = new Map();

          handlers.set('waiting', () => {
            setIsBuffering(true);
            logger.debug('Audio waiting for data', { track: track.id });
          });

          handlers.set('canplay', () => {
            setIsBuffering(false);
            logger.debug('Audio can play', { track: track.id });
            // Set duration here as well in case loadedmetadata didn't fire
            const audioDuration = audio.duration;
            if (!isNaN(audioDuration) && isFinite(audioDuration)) {
              setDuration(audioDuration);
              logger.debug('Duration set on canplay', {
                track: track.id,
                duration: audioDuration,
              });
            }
          });

          handlers.set('loadedmetadata', () => {
            const audioDuration = audio.duration;
            if (!isNaN(audioDuration) && isFinite(audioDuration)) {
              setDuration(audioDuration);
              logger.debug('Audio metadata loaded', {
                track: track.id,
                duration: audioDuration,
              });
            }
          });

          handlers.set('durationchange', () => {
            const audioDuration = audio.duration;
            if (!isNaN(audioDuration) && isFinite(audioDuration)) {
              setDuration(audioDuration);
              logger.debug('Duration changed', {
                track: track.id,
                duration: audioDuration,
              });
            }
          });

          handlers.set('timeupdate', () => {
            const currentTime = audio.currentTime;
            if (!isNaN(currentTime) && isFinite(currentTime)) {
              setCurrentTime(currentTime);
            }
          });

          handlers.set('ended', () => {
            const nextTrack = getNextTrack(track.id);
            if (nextTrack) {
              void playTrack(nextTrack);
            }
          });

          // Add all event listeners
          handlers.forEach((handler, event) => {
            audio.addEventListener(event, handler);
          });

          return () => {
            handlers.forEach((handler, event) => {
              audio.removeEventListener(event, handler);
            });
          };
        };

        removeListeners = setupEventListeners(newAudio);
        audioRef.current = newAudio;

        try {
          // Force metadata loading
          await new Promise<void>((resolve, reject) => {
            const loadHandler = () => {
              resolve();
              newAudio?.removeEventListener('loadedmetadata', loadHandler);
              newAudio?.removeEventListener('error', errorHandler);
            };

            const errorHandler = () => {
              reject(new Error('Failed to load audio metadata'));
              newAudio?.removeEventListener('loadedmetadata', loadHandler);
              newAudio?.removeEventListener('error', errorHandler);
            };

            newAudio?.addEventListener('loadedmetadata', loadHandler);
            newAudio?.addEventListener('error', errorHandler);
            newAudio?.load();
          });

          setHasInitialized(true);
          logger.debug('Audio initialized successfully', {
            track: track.id,
            duration: newAudio.duration,
          });
        } catch (error) {
          logger.warn('Failed to load audio', { track: track.id });
          throw error;
        }
      } catch (error) {
        setPlayingState(false);
        handleAudioError(error instanceof Error ? error : new Error('Unknown error'), true);

        // Clean up on error
        if (newAudio) {
          try {
            newAudio.pause();
            newAudio.src = '';
            newAudio.load();
          } catch (cleanupError) {
            // Ignore cleanup errors
          }
        }
      } finally {
        setLoadingState(false);
        setBufferingState(false);
        if (removeListeners) {
          removeListeners();
        }
      }
    },
    [
      cleanup,
      createNewAudio,
      setPlayingState,
      setLoadingState,
      setBufferingState,
      updateCurrentTrack,
      hasUserInteracted,
      checkAudioSupport,
    ]
  );

  // Initialize audio player
  useEffect(() => {
    if (!hasInitialized && initialTrack) {
      void playTrack(initialTrack);
    }
    return () => {
      void cleanup();
    };
  }, [hasInitialized, initialTrack, playTrack, cleanup]);

  const playNextTrack: PlayNextTrackFunction = useCallback(() => {
    const nextTrack = getNextTrack(currentTrack.id);
    if (nextTrack) {
      void (async () => {
        try {
          setLoadingState(true);
          await playTrack(nextTrack);
        } catch (error) {
          handlePlaybackError();
          setPlayingState(false);
        } finally {
          setLoadingState(false);
        }
      })();
    }
  }, [currentTrack, playTrack, setLoadingState, setPlayingState]);

  const playPreviousTrack: PlayPreviousTrackFunction = useCallback(() => {
    // If we're more than 3 seconds into the song, restart it instead of going to previous
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      if (!isPlaying) {
        void (async () => {
          try {
            await audioRef.current?.play();
            setPlayingState(true);
          } catch (error) {
            handlePlaybackError();
            setPlayingState(false);
          }
        })();
      }
    } else {
      const prevTrack = getPreviousTrack(currentTrack.id);
      if (prevTrack) {
        void (async () => {
          try {
            setLoadingState(true);
            await playTrack(prevTrack);
          } catch (error) {
            handlePlaybackError();
            setPlayingState(false);
          } finally {
            setLoadingState(false);
          }
        })();
      }
    }
  }, [currentTrack, playTrack, isPlaying, setLoadingState, setPlayingState]);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        void togglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        if (e.metaKey || e.ctrlKey) {
          void playPreviousTrack();
        } else if (audioRef.current) {
          audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
        }
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        if (e.metaKey || e.ctrlKey) {
          void playNextTrack();
        } else if (audioRef.current) {
          audioRef.current.currentTime = Math.min(
            audioRef.current.duration,
            audioRef.current.currentTime + 5
          );
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [togglePlay, playNextTrack, playPreviousTrack]);

  // Use the hook for audio event handling
  useAudioEventHandlers(audioRef.current, {
    onTimeUpdate: () => setCurrentTime(audioRef.current?.currentTime || 0),
    onLoadedMetadata: () => setDuration(audioRef.current?.duration || 0),
    onEnd: () => {
      const nextTrack = getNextTrack(currentTrack.id);
      if (nextTrack) {
        void playTrack(nextTrack);
      }
    },
  });

  return {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    isLoading,
    isBuffering,
    audioRef,
    togglePlay,
    playTrack,
    playNextTrack,
    playPreviousTrack,
  };
};

// Modern track visualization component
const TrackVisualization = memo<{ isPlaying: boolean }>(({ isPlaying }) => (
  <div className="absolute left-0 bottom-0 w-full h-12 flex items-end justify-center space-x-1 opacity-50">
    {Array.from({ length: 12 }).map((_, i) => (
      <motion.div
        key={i}
        className="w-1 bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-secondary)]"
        initial={{ height: 4 }}
        animate={{
          height: isPlaying ? Math.random() * 20 + 4 : 4,
        }}
        transition={{
          duration: 0.4,
          repeat: isPlaying ? Infinity : 0,
          repeatType: 'reverse',
          delay: i * 0.1,
        }}
      />
    ))}
  </div>
));

TrackVisualization.displayName = 'TrackVisualization';

// Helper function to format artist name
const formatArtistName = (name: string | undefined): string => {
  if (!name) return '';
  const names = name.split(' ');
  if (name.length > 15 && names.length > 1) {
    return names[names.length - 1] || '';
  }
  return name;
};

// Enhanced CurrentTrackInfo component with filter functionality
const CurrentTrackInfo = memo<{
  track: Track;
  isLoading: boolean;
  isBuffering: boolean;
  isPlaying: boolean;
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
  controls: React.ReactNode;
}>(({ track, isLoading, activeFilter, onFilterChange, controls }) => (
  <div className="space-y-2 sm:space-y-4">
    <motion.h3
      className="text-xl sm:text-3xl font-mono font-medium text-[var(--color-text-primary)] tracking-tight line-clamp-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      key={track.title}
    >
      {track.title}
    </motion.h3>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
      <div className="flex flex-wrap gap-1 sm:gap-2 items-center">
        <motion.p
          className="font-mono font-normal text-sm sm:text-base text-[var(--color-text-secondary)]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {formatArtistName(track.artist)}
        </motion.p>
        {track.composer && track.composer !== track.artist && (
          <>
            <span className="text-[var(--color-text-secondary)] opacity-50">•</span>
            <motion.p
              className="font-mono font-normal text-sm sm:text-base text-[var(--color-text-secondary)] opacity-75"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {formatArtistName(track.composer)}
            </motion.p>
          </>
        )}
        <div className="flex flex-wrap gap-1 sm:gap-2">
          <motion.button
            onClick={() =>
              onFilterChange(activeFilter === track.instrument ? null : track.instrument)
            }
            className={`font-mono px-1.5 py-0.5 sm:px-3 sm:py-1.5 text-xs sm:text-sm rounded-full transition-colors touch-manipulation ${
              activeFilter === track.instrument
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[#2A2A2A] text-[var(--color-text-secondary)] hover:bg-[#3A3A3A] active:bg-[#4A4A4A]'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {track.instrument.charAt(0).toUpperCase() + track.instrument.slice(1)}
          </motion.button>
          {track.genre && (
            <motion.button
              onClick={() =>
                onFilterChange(activeFilter === track.genre ? null : track.genre || null)
              }
              className={`font-mono px-1.5 py-0.5 sm:px-3 sm:py-1.5 text-xs sm:text-sm rounded-full transition-colors touch-manipulation ${
                activeFilter === track.genre
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[#2A2A2A] text-[var(--color-text-secondary)] hover:bg-[#3A3A3A] active:bg-[#4A4A4A]'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {track.genre}
            </motion.button>
          )}
        </div>
        {isLoading && (
          <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-[var(--color-primary)] border-t-transparent ml-1 sm:ml-2" />
        )}
      </div>
      <div className="mt-2 sm:mt-0">{controls}</div>
    </div>
  </div>
));

CurrentTrackInfo.displayName = 'CurrentTrackInfo';

// Main AudioPlayer component
export default memo(function AudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    isLoading,
    isBuffering,
    audioRef,
    togglePlay,
    playTrack,
    playNextTrack,
    playPreviousTrack,
  } = useAudioPlayer(TRACKS[0]!);

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Filter tracks based on active filter
  const filteredTracks = useMemo(() => {
    if (!activeFilter) return TRACKS.filter((t: Track) => t.id !== currentTrack.id);
    return TRACKS.filter(
      (track: Track) =>
        (track.instrument === activeFilter || track.genre === activeFilter) &&
        track.id !== currentTrack.id
    );
  }, [activeFilter, currentTrack.id]);

  // Memoize event handlers
  const handleProgressClick = useCallback(
    (pos: number) => {
      if (audioRef.current) {
        audioRef.current.currentTime = pos * duration;
      }
    },
    [duration, audioRef]
  );

  const controls = (
    <div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={playPreviousTrack}
        className="p-2 sm:p-3 text-[var(--color-text-primary)] touch-manipulation"
        aria-label="Previous track"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
        </svg>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className="p-3 sm:p-4 rounded-full bg-[var(--color-primary)] text-white shadow-lg touch-manipulation"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
          {isPlaying ? <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /> : <path d="M8 5v14l11-7z" />}
        </svg>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={playNextTrack}
        className="p-2 sm:p-3 text-[var(--color-text-primary)] touch-manipulation"
        aria-label="Next track"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
        </svg>
      </motion.button>
    </div>
  );

  return (
    <motion.div
      className="w-full rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] shadow-2xl backdrop-blur-lg border border-white/10 overflow-hidden relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col p-3 sm:p-6 space-y-4 sm:space-y-6">
        <CurrentTrackInfo
          track={currentTrack}
          isLoading={isLoading}
          isBuffering={isBuffering}
          isPlaying={isPlaying}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          controls={controls}
        />

        <div className="mt-2 touch-none">
          <Suspense fallback={<div className="h-2 bg-surface/50 rounded-full animate-pulse" />}>
            <ProgressBar
              progressRef={progressRef}
              currentTime={currentTime}
              duration={duration}
              formatTime={formatTime}
              onProgressClick={handleProgressClick}
            />
          </Suspense>
        </div>
      </div>

      {filteredTracks.length > 0 && (
        <div className="mt-4 sm:mt-6">
          <div
            className="space-y-2 max-h-none sm:max-h-[280px] overflow-y-visible sm:overflow-y-auto 
            scrollbar-thin scrollbar-track-[#1A1A1A] scrollbar-thumb-[#3A3A3A] 
            hover:scrollbar-thumb-[#4A4A4A] 
            [&::-webkit-scrollbar]:w-2 
            [&::-webkit-scrollbar-thumb]:rounded-full 
            [&::-webkit-scrollbar-track]:rounded-full
            overscroll-behavior-y-contain
            px-3 sm:px-6"
          >
            <Suspense fallback={<div className="h-16 bg-surface/50 rounded-lg animate-pulse" />}>
              {filteredTracks.map((track: Track) => (
                <PlaylistItem
                  key={track.id}
                  track={track}
                  currentTrack={currentTrack}
                  onPlay={playTrack}
                />
              ))}
            </Suspense>
          </div>
        </div>
      )}
    </motion.div>
  );
});

// Update button components to use common styles and animations
const ControlButton = memo<{
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  className?: string;
}>(({ onClick, icon, label, className }) => (
  <motion.button
    {...BUTTON_HOVER_ANIMATION}
    onClick={onClick}
    className={`${BUTTON_BASE_STYLES} ${className}`}
    aria-label={label}
  >
    {icon}
  </motion.button>
));

ControlButton.displayName = 'ControlButton';
