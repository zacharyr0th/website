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
import { selectOptimalFormat } from './utils/format-selection';
import { createLogger, LogCategory } from '@/lib/core/logger';

const logger = createLogger('audio-player', { category: LogCategory.APPLICATION });

// Lazy load heavy components with error boundaries
const PlaylistItem = lazy(() => import('./PlaylistItem'));
const ProgressBar = lazy(() => import('./ProgressBar'));

// Constants for common styles and animations
const BUTTON_BASE_STYLES = 'touch-manipulation transition-colors';
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
const handleSignedUrlError = (error: unknown) => {
  logger.error('Failed to get audio URL', {
    error: error as Error,
    context: { component: 'AudioPlayer' },
  });
};

// Replace handleAudioError with more specific error handling
const handleAudioError = (errorDetails: unknown, isTrackChange = false) => {
  // If it's a track change, only log as debug unless there's a real error
  if (isTrackChange) {
    logger.debug('Audio state change', {
      context: { component: 'AudioPlayer', type: 'track_change' },
    });
    return;
  }

  // Only log as error if it's a real playback error
  logger.error('Audio element error', {
    error: new Error(JSON.stringify(errorDetails)),
    context: { component: 'AudioPlayer' },
  });
};

// Replace console.log with logger.debug
const handleAudioLoaded = (track: Track) => {
  logger.debug('Audio loaded successfully', {
    context: { track: track.title },
  });
};

// Replace console.error with logger
const handleLoadError = (error: unknown, track: Track) => {
  logger.error('Failed to load audio', {
    error: error as Error,
    context: { track: track.title },
  });
};

// Replace console.log with logger.debug
const handleNewAudioElement = (track: Track) => {
  logger.debug('Creating new audio element', {
    context: { track: track.title },
  });
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
const handlePlaybackError = (error: unknown) => {
  logger.error('Playback error', {
    error: error as Error,
  });
};

// Replace track change logging
const handleTrackChange = (track: Track) => {
  logger.info('Now playing', {
    context: { track: track.title },
  });
};

// Replace preload logging
const handlePreloadStart = (track: Track) => {
  logger.debug('Preloading track', {
    context: { track: track.title },
  });
};

const handlePreloadError = (error: unknown, track: Track) => {
  logger.warn('Failed to preload track', {
    error: error as Error,
    context: { track: track.title },
  });
};

// Replace console.warn with logger
const handleNoTrackWarning = () => {
  logger.warn('No current track to preload');
};

// Extract audio state management into a custom hook with optimizations
const useAudioPlayer = (initialTrack: Track) => {
  const [currentTrack, setCurrentTrack] = useState<Track>(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number>();
  const cleanupFunctionsRef = useRef<Array<() => void>>([]);

  // Memoize cleanup function
  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    cleanupFunctionsRef.current.forEach((fn) => fn());
    cleanupFunctionsRef.current = [];
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current.load();
    }
  }, []);

  // Memoize state setters
  const setPlayingState = useCallback((state: boolean) => setIsPlaying(state), []);
  const setLoadingState = useCallback((state: boolean) => setIsLoading(state), []);
  const setBufferingState = useCallback((state: boolean) => setIsBuffering(state), []);
  const updateCurrentTrack = useCallback((track: Track) => setCurrentTrack(track), []);

  // Optimize audio creation with better error handling and memory management
  const createNewAudio = useCallback(async (track: Track) => {
    if (!track) {
      throw new Error('Invalid track');
    }

    let url: string;
    try {
      url = await track.getSignedUrl();
      if (!url) {
        throw new Error('Failed to load audio');
      }
    } catch (error) {
      handleSignedUrlError(error);
      throw new Error('Failed to load audio');
    }

    // Create new audio element only after we have a valid URL
    const audio = new Audio();
    audio.preload = 'auto';
    audio.crossOrigin = 'anonymous';

    // Set up error handling
    const errorPromise = new Promise<never>((_, reject) => {
      const errorHandler = () => {
        const mediaError = audio.error;

        // Check if this is a track change or a real error
        const isTrackChange =
          !mediaError ||
          (mediaError.code === MediaError.MEDIA_ERR_ABORTED &&
            audio.readyState < audio.HAVE_METADATA);

        const errorDetails = {
          type: mediaError ? getMediaErrorType(mediaError) : 'Unknown error',
          track: track.title,
        };

        handleAudioError(errorDetails, isTrackChange);

        // Only reject if it's a real error
        if (!isTrackChange) {
          reject(new Error(mediaError ? getMediaErrorType(mediaError) : 'Failed to load audio'));
        }
        audio.removeEventListener('error', errorHandler);
      };
      audio.addEventListener('error', errorHandler);
    });

    // Set up success handling
    const loadPromise = new Promise<HTMLAudioElement>((resolve) => {
      const loadHandler = () => {
        handleAudioLoaded(track);
        resolve(audio);
        audio.removeEventListener('canplaythrough', loadHandler);
      };
      audio.addEventListener('canplaythrough', loadHandler);
    });

    // Set the source and begin loading
    try {
      audio.src = url;
      audio.load();

      // Wait for either success or failure
      return await Promise.race([loadPromise, errorPromise]);
    } catch (error) {
      handleLoadError(error, track);
      throw error;
    }
  }, []);

  // Optimize play/pause with better error handling and buffering states
  const togglePlay = useCallback(async () => {
    try {
      setLoadingState(true);

      if (!audioRef.current || !audioRef.current.src) {
        handleNewAudioElement(currentTrack);
        const audio = await createNewAudio(currentTrack);
        audioRef.current = audio;

        // Start playing immediately after creation
        const playPromise = audio.play();
        if (playPromise) {
          await playPromise;
          handlePlaybackStart();
          setPlayingState(true);
        }
      } else {
        if (isPlaying) {
          handlePlaybackPause();
          await audioRef.current.pause();
          setPlayingState(false);
        } else {
          const playPromise = audioRef.current.play();
          if (playPromise) {
            await playPromise;
            handlePlaybackResume();
            setPlayingState(true);
          }
        }
      }
    } catch (error) {
      handlePlaybackError(error);
      setPlayingState(false);
    } finally {
      setLoadingState(false);
    }
  }, [isPlaying, currentTrack, createNewAudio, setPlayingState, setLoadingState]);

  // Optimize track playback with preloading and caching
  const playTrack = useCallback(
    async (track: Track) => {
      try {
        setLoadingState(true);
        setBufferingState(true);

        // Clean up existing audio before switching tracks
        if (audioRef.current) {
          await cleanup();
          audioRef.current = null;
        }

        // Get optimal format first
        const format = await selectOptimalFormat(navigator.userAgent);
        if (!format) {
          throw new Error('No supported audio format found for this browser');
        }

        // Create and set up new audio
        const audio = await createNewAudio(track);
        if (!audio) {
          throw new Error('Failed to create audio element');
        }

        audioRef.current = audio;
        updateCurrentTrack(track);

        // Start playing
        try {
          await audio.play();
          setPlayingState(true);
          handleTrackChange(track);

          // Preload next track in the background
          const nextTrack = getNextTrack(track.id);
          if (nextTrack) {
            handlePreloadStart(nextTrack);
            void nextTrack.getSignedUrl().catch((error) => {
              handlePreloadError(error, nextTrack);
            });
          }
        } catch (playError) {
          handlePlaybackError(playError);
          setPlayingState(false);
          throw playError;
        }
      } catch (error) {
        handlePlaybackError(error);
        setPlayingState(false);
        updateCurrentTrack(track); // Keep the track in the UI even if playback failed
      } finally {
        setLoadingState(false);
        setBufferingState(false);
      }
    },
    [
      cleanup,
      createNewAudio,
      setPlayingState,
      setLoadingState,
      setBufferingState,
      updateCurrentTrack,
    ]
  );

  // Preload initial track and next track
  useEffect(() => {
    const preloadInitialTracks = async () => {
      try {
        if (!currentTrack) {
          handleNoTrackWarning();
          return;
        }

        // Preload current track
        handlePreloadStart(currentTrack);
        await currentTrack.getSignedUrl();

        // Preload next track
        const nextTrack = getNextTrack(currentTrack.id);
        if (nextTrack) {
          handlePreloadStart(nextTrack);
          await nextTrack.getSignedUrl();
        }
      } catch (error) {
        handlePreloadError(error, currentTrack);
      }
    };

    void preloadInitialTracks();
  }, [currentTrack]);

  const playNextTrack = useCallback(() => {
    handleTrackChange(currentTrack);
    const nextTrack = getNextTrack(currentTrack.id);
    void playTrack(nextTrack);
  }, [currentTrack, playTrack]);

  const playPreviousTrack = useCallback(() => {
    handleTrackChange(currentTrack);
    const previousTrack = getPreviousTrack(currentTrack.id);
    void playTrack(previousTrack);
  }, [currentTrack, playTrack]);

  // Use consolidated event handlers
  useAudioEventHandlers(audioRef.current, {
    onTimeUpdate: () => setCurrentTime(audioRef.current?.currentTime || 0),
    onLoadedMetadata: () => setDuration(audioRef.current?.duration || 0),
    onEnd: () => {
      if (isRepeatOn && audioRef.current) {
        audioRef.current.currentTime = 0;
        void audioRef.current.play();
      } else {
        playNextTrack();
      }
    },
    onPlay: () => {
      setIsBuffering(false);
      setIsPlaying(true);
    },
    onPause: () => setIsPlaying(false),
    onWaiting: () => setIsBuffering(true),
    onCanPlay: () => setIsBuffering(false),
  });

  // Cleanup on unmount
  useEffect(() => cleanup, [cleanup]);

  return {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    isLoading,
    isBuffering,
    isRepeatOn,
    setIsRepeatOn,
    audioRef,
    setCurrentTime,
    setDuration,
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
  <div className="space-y-3 sm:space-y-4">
    <motion.h3
      className="text-2xl sm:text-4xl font-bold text-[var(--color-text-primary)] tracking-tight line-clamp-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      key={track.title}
    >
      {track.title}
    </motion.h3>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
      <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
        <motion.p
          className="text-base sm:text-lg text-[var(--color-text-secondary)]"
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
              className="text-base sm:text-lg text-[var(--color-text-secondary)] opacity-75"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {formatArtistName(track.composer)}
            </motion.p>
          </>
        )}
        <div className="flex flex-wrap gap-2">
          <motion.button
            onClick={() =>
              onFilterChange(activeFilter === track.instrument ? null : track.instrument)
            }
            className={`px-3 py-1.5 text-sm rounded-full transition-colors touch-manipulation ${
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
              className={`px-3 py-1.5 text-sm rounded-full transition-colors touch-manipulation ${
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
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-2 border-[var(--color-primary)] border-t-transparent ml-2 sm:ml-4" />
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
    isRepeatOn,
    setIsRepeatOn,
    audioRef,
    setCurrentTime,
    setDuration,
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
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (progressRef.current && audioRef.current) {
        const rect = progressRef.current.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        audioRef.current.currentTime = pos * duration;
      }
    },
    [duration, audioRef]
  );

  // Setup audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowLeft' && audio) {
        audio.currentTime -= 5;
      } else if (e.code === 'ArrowRight' && audio) {
        audio.currentTime += 5;
      }
    };

    const handleEnd = () => {
      if (isRepeatOn) {
        audio.currentTime = 0;
        void audio.play().catch(console.error);
      } else {
        playNextTrack();
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnd);
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnd);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentTrack, isRepeatOn, togglePlay, playNextTrack, audioRef, setCurrentTime, setDuration]);

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

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsRepeatOn(!isRepeatOn)}
        className={`p-2 sm:p-3 rounded-full touch-manipulation ${
          isRepeatOn ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'
        }`}
        aria-label="Toggle repeat"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 17H7v-3l-4 4 4 4v-3h12v-6h-2v4zM7 7h10v3l4-4-4-4v3H5v6h2V7z" />
        </svg>
      </motion.button>
    </div>
  );

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto p-4 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] shadow-2xl backdrop-blur-lg border border-white/10 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col space-y-4 sm:space-y-6">
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
        <div className="mt-6 sm:mt-8">
          <div
            className="space-y-2 max-h-[180px] sm:max-h-[280px] overflow-y-auto 
            scrollbar-thin scrollbar-track-[#1A1A1A] scrollbar-thumb-[#3A3A3A] 
            hover:scrollbar-thumb-[#4A4A4A] 
            [&::-webkit-scrollbar]:w-2 
            [&::-webkit-scrollbar-thumb]:rounded-full 
            [&::-webkit-scrollbar-track]:rounded-full
            overscroll-behavior-y-contain
            -mx-4 sm:mx-0 px-4 sm:px-0"
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
