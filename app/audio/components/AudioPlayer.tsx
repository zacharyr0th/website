import React, { useState, useRef, useEffect, useCallback, memo, lazy, Suspense, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Track } from '../tracks';
import { TRACKS, getNextTrack, getPreviousTrack } from '../tracks';

// Lazy load heavy components with error boundaries
const PlaylistItem = lazy(() => import('@/audio/components/PlaylistItem'));
const ProgressBar = lazy(() => import('@/audio/components/ProgressBar'));

// Extract audio state management into a custom hook with optimizations
const useAudioPlayer = (initialTrack: Track) => {
  const [currentTrack, setCurrentTrack] = useState<Track>(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number>();
  const cleanupFunctionsRef = useRef<Array<() => void>>([]);

  // Memoize cleanup function
  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    cleanupFunctionsRef.current.forEach(fn => fn());
    cleanupFunctionsRef.current = [];
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current.load();
    }
  }, []);

  // Optimize audio creation with better error handling and memory management
  const createNewAudio = useCallback((src: string): HTMLAudioElement => {
    cleanup();
    const audio = new Audio();
    audio.preload = 'auto';
    audio.crossOrigin = 'anonymous';
    
    // Add error handling for debugging
    audio.onerror = (event: Event | string) => {
      const mediaError = audio.error;
      let errorDetails: Record<string, any> = {
        timestamp: new Date().toISOString(),
        message: 'Unknown error',
        code: null,
        src: audio.src,
        readyState: audio.readyState,
        networkState: audio.networkState,
      };

      if (mediaError) {
        errorDetails = {
          ...errorDetails,
          message: mediaError.message || 'Media Error',
          code: mediaError.code,
          errorType: {
            MEDIA_ERR_ABORTED: mediaError.code === MediaError.MEDIA_ERR_ABORTED,
            MEDIA_ERR_NETWORK: mediaError.code === MediaError.MEDIA_ERR_NETWORK,
            MEDIA_ERR_DECODE: mediaError.code === MediaError.MEDIA_ERR_DECODE,
            MEDIA_ERR_SRC_NOT_SUPPORTED: mediaError.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED
          }
        };
      }

      if (event instanceof Event) {
        errorDetails.eventType = event.type;
      }

      console.error('Audio playback error:', JSON.stringify(errorDetails, null, 2));

      // Set error state and attempt recovery
      setIsLoading(false);
      setIsBuffering(false);
      setIsPlaying(false);

      // Attempt recovery based on error type
      if (mediaError?.code === MediaError.MEDIA_ERR_NETWORK) {
        console.warn('Network error detected, attempting to reload audio...');
        setTimeout(() => {
          audio.load();
        }, 1000);
      } else if (mediaError?.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
        console.error('Audio format not supported');
      } else if (mediaError?.code === MediaError.MEDIA_ERR_DECODE) {
        console.error('Audio decode error, attempting to recreate audio element...');
        createNewAudio(audio.src);
      }
    };

    audio.src = src;
    audioRef.current = audio;
    return audio;
  }, [cleanup]);

  // Optimize play/pause with better error handling and buffering states
  const togglePlay = useCallback(async () => {
    try {
      if (!audioRef.current || !audioRef.current.src) {
        const audio = createNewAudio(currentTrack.audioUrl);
        await new Promise((resolve) => {
          audio.addEventListener('loadeddata', resolve, { once: true });
        });
      }

      setIsLoading(true);
      if (isPlaying) {
        await audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current?.play();
        if (playPromise) {
          await playPromise;
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error('Playback error:', error);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying, currentTrack.audioUrl, createNewAudio]);

  // Optimize track playback with preloading and caching
  const playTrack = useCallback(async (track: Track) => {
    try {
      setIsLoading(true);
      setIsBuffering(true);

      if (audioRef.current && isPlaying) {
        await audioRef.current.pause();
      }

      const audio = createNewAudio(track.audioUrl);
      
      // Wait for the audio to be loaded before playing
      await new Promise((resolve) => {
        audio.addEventListener('loadeddata', resolve, { once: true });
      });

      setCurrentTrack(track);
      const playPromise = audio.play();
      if (playPromise) {
        await playPromise;
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing track:', error);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
      setIsBuffering(false);
    }
  }, [isPlaying, createNewAudio]);

  // Optimize progress tracking with requestAnimationFrame and cleanup
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.currentTime) {
        setCurrentTime(audio.currentTime);
      }
      if (isPlaying) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };

    const handlePlay = () => {
      setIsBuffering(false);
      setIsPlaying(true);
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    };

    const handlePause = () => {
      setIsPlaying(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    const handleEnded = () => {
      handlePause();
    };

    const handleWaiting = () => {
      setIsBuffering(true);
    };

    const handleCanPlay = () => {
      setIsBuffering(false);
    };

    const handleLoadedMetadata = () => {
      if (audio.duration) {
        setDuration(audio.duration);
      }
      setCurrentTime(audio.currentTime);
    };

    // Use passive event listeners for better performance
    const eventListeners = [
      ['play', handlePlay],
      ['pause', handlePause],
      ['ended', handleEnded],
      ['waiting', handleWaiting],
      ['canplay', handleCanPlay],
      ['loadedmetadata', handleLoadedMetadata],
      ['timeupdate', updateProgress],
    ] as const;

    eventListeners.forEach(([event, handler]) => {
      audio.addEventListener(event, handler, { passive: true });
    });

    return () => {
      eventListeners.forEach(([event, handler]) => {
        audio.removeEventListener(event, handler);
      });
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  // Cleanup on unmount
  useEffect(() => cleanup, [cleanup]);

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    isLoading,
    isBuffering,
    audioRef,
    setCurrentTime,
    setDuration,
    togglePlay,
    playTrack,
    formatTime,
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
          repeatType: "reverse",
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
}>(
  ({ track, isLoading, activeFilter, onFilterChange, controls }) => (
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
              onClick={() => onFilterChange(activeFilter === track.instrument ? null : track.instrument)}
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
                onClick={() => onFilterChange(activeFilter === track.genre ? null : (track.genre || null))}
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
        <div className="mt-2 sm:mt-0">
          {controls}
        </div>
      </div>
    </div>
  )
);

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
    setCurrentTime,
    setDuration,
    togglePlay,
    playTrack,
    formatTime,
  } = useAudioPlayer(TRACKS[0]!);

  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Filter tracks based on active filter
  const filteredTracks = useMemo(() => {
    if (!activeFilter) return TRACKS.filter(t => t.id !== currentTrack.id);
    return TRACKS.filter(track => 
      (track.instrument === activeFilter || track.genre === activeFilter) && 
      track.id !== currentTrack.id
    );
  }, [activeFilter, currentTrack.id]);

  const playNextTrack = useCallback(() => {
    const nextTrack = getNextTrack(currentTrack.id);
    playTrack(nextTrack);
  }, [currentTrack.id, playTrack]);

  const playPreviousTrack = useCallback(() => {
    const previousTrack = getPreviousTrack(currentTrack.id);
    playTrack(previousTrack);
  }, [currentTrack.id, playTrack]);

  const handleTrackEnd = useCallback(() => {
    if (isRepeatOn) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(console.error);
      }
    } else {
      playNextTrack();
    }
  }, [isRepeatOn, playNextTrack, audioRef]);

  // Memoize event handlers
  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && audioRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = pos * duration;
    }
  }, [duration, audioRef]);

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

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleTrackEnd);
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleTrackEnd);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentTrack, handleTrackEnd, togglePlay, setCurrentTime, setDuration, audioRef]);

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
          <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
        </svg>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className="p-3 sm:p-4 rounded-full bg-[var(--color-primary)] text-white shadow-lg touch-manipulation"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
          {isPlaying ? (
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          ) : (
            <path d="M8 5v14l11-7z"/>
          )}
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
          <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
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
          <path d="M17 17H7v-3l-4 4 4 4v-3h12v-6h-2v4zM7 7h10v3l4-4-4-4v3H5v6h2V7z"/>
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
          <div className="space-y-2 max-h-[180px] sm:max-h-[280px] overflow-y-auto 
            scrollbar-thin scrollbar-track-[#1A1A1A] scrollbar-thumb-[#3A3A3A] 
            hover:scrollbar-thumb-[#4A4A4A] 
            [&::-webkit-scrollbar]:w-2 
            [&::-webkit-scrollbar-thumb]:rounded-full 
            [&::-webkit-scrollbar-track]:rounded-full
            overscroll-behavior-y-contain
            -mx-4 sm:mx-0 px-4 sm:px-0"
          >
            <Suspense fallback={<div className="h-16 bg-surface/50 rounded-lg animate-pulse" />}>
              {filteredTracks.map((track) => (
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