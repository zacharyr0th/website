import { useState, useRef, useCallback, useEffect, useReducer } from 'react';
import type { Track } from '../tracks';
import { useAudioEventHandlers } from './useAudioEventHandlers';
import { audioErrorHandler } from '../utils/error-handlers';
import { AudioManager } from '../tracks';
import { safeProgress } from '../utils';
import { formatTime, getRemainingTime, parseTimeString } from '../utils/format';

type AudioState = {
  isPlaying: boolean;
  isLoading: boolean;
  isBuffering: boolean;
  loadingTrackId: string | null;
  currentTime: number;
  duration: number;
  loadedProgress: number;
  audio: HTMLAudioElement | null;
};

type AudioAction =
  | { type: 'SET_PLAYING'; payload: boolean }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_BUFFERING'; payload: boolean }
  | { type: 'SET_LOADING_TRACK'; payload: string | null }
  | { type: 'SET_TIME'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_PROGRESS'; payload: number }
  | { type: 'RESET_STATE' }
  | { type: 'SET_AUDIO_STATE'; payload: Partial<AudioState> };

const audioReducer = (state: AudioState, action: AudioAction): AudioState => {
  switch (action.type) {
    case 'SET_PLAYING':
      return { ...state, isPlaying: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_BUFFERING':
      return { ...state, isBuffering: action.payload };
    case 'SET_LOADING_TRACK':
      return { ...state, loadingTrackId: action.payload };
    case 'SET_TIME':
      return { ...state, currentTime: action.payload };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'SET_PROGRESS':
      return { ...state, loadedProgress: action.payload };
    case 'RESET_STATE':
      return {
        isPlaying: false,
        isLoading: false,
        isBuffering: false,
        loadingTrackId: null,
        currentTime: 0,
        duration: 0,
        loadedProgress: 0,
        audio: null,
      };
    case 'SET_AUDIO_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const INITIAL_STATE: AudioState = {
  isPlaying: false,
  isLoading: false,
  isBuffering: false,
  loadingTrackId: null,
  currentTime: 0,
  duration: 0,
  loadedProgress: 0,
  audio: null,
};

type FormattedTimes = {
  elapsedTime: string;
  totalTime: string;
  remainingTime: string;
};

export const useTrackPlayer = (initialTrack: Track) => {
  // 1. useState
  const [currentTrack, setCurrentTrack] = useState<Track>(initialTrack);
  // 2. useState
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  // 3. useReducer
  const [audioState, dispatch] = useReducer(audioReducer, {
    ...INITIAL_STATE,
    duration: parseTimeString(initialTrack.duration),
  });
  // 4. useState
  const [isInitialized, setIsInitialized] = useState(false);
  // 5. useRef
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // 6. useRef
  const retryTimeoutRef = useRef<NodeJS.Timeout>();
  // 7. useRef
  const pendingPlayTrackRef = useRef<Track | null>(null);
  // 8. useRef
  const isInitializingRef = useRef(false);

  // Calculate formatted times
  const times: FormattedTimes = {
    elapsedTime: formatTime(audioState.currentTime),
    totalTime: formatTime(audioState.duration || parseTimeString(currentTrack.duration)),
    remainingTime: formatTime(
      getRemainingTime(
        audioState.currentTime,
        audioState.duration || parseTimeString(currentTrack.duration)
      )
    ),
  };

  // IMPORTANT: First useCallback must match the original order
  // Enhanced cleanup helper
  const cleanup = useCallback(async () => {
    try {
      const audioManager = AudioManager.getInstance();
      audioManager.setCurrentAudio(null);

      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = undefined;
      }

      if (audioRef.current) {
        const audio = audioRef.current;
        audio.src = '';
        await audio.pause();
        audioRef.current = null;
      }

      dispatch({ type: 'RESET_STATE' });
    } catch (error) {
      audioErrorHandler.handleError(error instanceof Error ? error : null, 'cleanup');
    }
  }, []);

  // Initialize audio with proper cleanup
  const initializeAudio = useCallback(async (): Promise<HTMLAudioElement | null> => {
    if (isInitializingRef.current) {
      console.log(`Audio initialization already in progress, skipping redundant call`);
      return null;
    }

    isInitializingRef.current = true;

    try {
      // Always perform a cleanup first
      await cleanup();

      if (!currentTrack) {
        throw new Error('No track provided');
      }

      console.log(`Initializing audio for track: ${currentTrack.id} - ${currentTrack.title}`);
      dispatch({ type: 'SET_LOADING', payload: true });

      // Set initial duration from track metadata
      const initialDuration = parseTimeString(currentTrack.duration);
      dispatch({ type: 'SET_DURATION', payload: initialDuration || 0 });

      // Pre-fetch URL in parallel to avoid sequential network requests
      const urlPromise = currentTrack.getSignedUrl();

      // Create audio element immediately
      const audio = new Audio();

      // Important: ensure old audio is cleaned up before assigning new one
      if (audioRef.current) {
        const oldAudio = audioRef.current;
        try {
          oldAudio.pause();
          oldAudio.src = '';
          oldAudio.load();
        } catch (e) {
          // Ignore errors during cleanup
        }
      }

      audioRef.current = audio;

      // Set low initial preload to quickly get metadata
      audio.preload = 'metadata';

      // Set URL once available
      const url = await urlPromise;
      if (!url) {
        throw new Error('Failed to get signed URL');
      }

      // Force a reset of any previous state
      audio.volume = 1.0;
      audio.currentTime = 0;

      audio.src = url;

      // Upgrade preload strategy if this is the active track
      audio.preload = 'auto';

      // Store in AudioManager for global access
      const audioManager = AudioManager.getInstance();
      audioManager.setCurrentAudio(audio);

      setIsInitialized(true);
      return audio;
    } catch (error) {
      audioErrorHandler.handleError(error instanceof Error ? error : null, 'initializeAudio');
      return null;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
      isInitializingRef.current = false;
    }
  }, [cleanup, currentTrack, dispatch]);

  const togglePlay = useCallback(async () => {
    if (!hasUserInteracted) {
      audioErrorHandler.logDebug('Waiting for user interaction before playing audio');
      return;
    }

    try {
      // More defensive pause logic - check if we already have a paused state
      if (audioState.isPlaying && audioRef.current) {
        if (!audioRef.current.paused) {
          console.log(`Pausing track: ${currentTrack.id}`);
          await audioRef.current.pause();
          // The pause event handler will update the state automatically
        }
        return;
      }

      console.log(`Attempting to play track: ${currentTrack.id} - ${currentTrack.title}`);
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_BUFFERING', payload: true });

      // Initialize audio if not already done
      if (!isInitialized || !audioRef.current) {
        console.log(`Audio needs initialization for: ${currentTrack.id}`);
        const audio = await initializeAudio();
        if (!audio) {
          console.error(`Failed to initialize audio for: ${currentTrack.id}`);
          throw new Error('Failed to initialize audio');
        }

        // Small timeout to allow browser to start loading audio
        // This improves perceived performance
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      const audio = audioRef.current;
      if (!audio) throw new Error('No audio element available');

      // Ensure audio is in a valid state
      if (audio.readyState === 0) {
        console.log(`Audio not ready yet, forcing reload`);
        audio.load();
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      try {
        if (audio.paused) {
          console.log(`Playing audio for: ${currentTrack.id}`);
          await audio.play();
          // The play event handler will update the state automatically
        }
      } catch (playError: unknown) {
        // If play fails due to not enough data, wait briefly and retry once
        if (
          playError instanceof Error &&
          (playError.name === 'NotSupportedError' || audio.readyState < 2)
        ) {
          console.warn(`Audio not ready, retrying after delay for: ${currentTrack.id}`);
          audioErrorHandler.logDebug('Audio not ready, waiting briefly before retry');
          await new Promise((resolve) => setTimeout(resolve, 300));
          if (audio.paused) {
            await audio.play();
            // The play event handler will update the state automatically
          }
        } else {
          throw playError;
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          audioErrorHandler.logDebug('Playback not allowed - waiting for user interaction');
        } else {
          audioErrorHandler.handleError(error, 'playback');
        }
      }
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
      dispatch({ type: 'SET_BUFFERING', payload: false });
    }
  }, [
    audioState.isPlaying,
    hasUserInteracted,
    initializeAudio,
    isInitialized,
    dispatch,
    currentTrack,
  ]);

  const playTrack = useCallback(
    async (track: Track, shouldPlay = false) => {
      // Debug log to track issues
      console.log(
        `playTrack called for: ${track.id} - ${track.title}, current: ${currentTrack.id}, shouldPlay: ${shouldPlay}`
      );

      if (track.id === currentTrack.id && isInitialized) {
        console.log(`Already on this track, skipping re-initialization`);
        if (shouldPlay && !audioState.isPlaying) {
          await togglePlay();
        }
        return; // Already playing this track
      }

      // Force track sync with AudioManager to ensure global state is aligned
      AudioManager.getInstance().setCurrentAudio(null);

      // Update the current track immediately for UI
      setCurrentTrack(track);

      if (!hasUserInteracted) {
        audioErrorHandler.logDebug('Waiting for user interaction before playing audio');
        pendingPlayTrackRef.current = track;
        return;
      }

      // Reset existing audio completely
      await cleanup();

      // Reset state
      dispatch({ type: 'RESET_STATE' });

      // Force the isInitialized flag to false
      setIsInitialized(false);

      // Track the change
      audioErrorHandler.logDebug('Track changed', { id: track.id });

      // Optionally start playing the new track
      if (shouldPlay) {
        await initializeAudio();
        await togglePlay();
      }
    },
    [
      audioState.isPlaying,
      hasUserInteracted,
      currentTrack.id,
      isInitialized,
      cleanup,
      dispatch,
      togglePlay,
      initializeAudio,
    ]
  );

  // Use the dedicated event handlers hook
  useAudioEventHandlers(audioRef.current, {
    onTimeUpdate: () => {
      const audio = audioRef.current;
      if (!audio || !isFinite(audio.duration)) return;

      dispatch({ type: 'SET_TIME', payload: audio.currentTime });
    },
    onLoadedMetadata: () => {
      const audio = audioRef.current;
      if (!audio || !isFinite(audio.duration)) return;

      const metadataDuration = audio.duration;
      const parsedTrackDuration = parseTimeString(currentTrack.duration);

      // Update duration if:
      // 1. The metadata duration is significantly different from the track metadata
      // 2. OR the parsed track duration is invalid/zero, but we have valid metadata
      if (
        Math.abs(metadataDuration - parsedTrackDuration) > 0.1 ||
        (!parsedTrackDuration && metadataDuration > 0)
      ) {
        dispatch({ type: 'SET_DURATION', payload: metadataDuration });
      }
    },
    onProgress: () => {
      const audio = audioRef.current;
      if (!audio || audio.duration <= 0) return;

      let maxBuffered = 0;
      for (let i = 0; i < audio.buffered.length; i++) {
        const start = audio.buffered.start(i);
        const end = audio.buffered.end(i);

        // Find the relevant buffer range for current time
        if (audio.currentTime >= start && audio.currentTime <= end) {
          const progress = (end / audio.duration) * 100;
          maxBuffered = Math.max(maxBuffered, progress);
        }
      }

      if (maxBuffered > 0) {
        dispatch({ type: 'SET_PROGRESS', payload: safeProgress(maxBuffered) });
      }
    },
    onEnd: () => dispatch({ type: 'SET_PLAYING', payload: false }),
    onPlay: () => dispatch({ type: 'SET_PLAYING', payload: true }),
    onPause: () => dispatch({ type: 'SET_PLAYING', payload: false }),
    onWaiting: () => dispatch({ type: 'SET_BUFFERING', payload: true }),
    onCanPlay: () => {
      dispatch({ type: 'SET_BUFFERING', payload: false });
      // Trigger an initial progress check
      const audio = audioRef.current;
      if (audio && audio.buffered.length > 0) {
        const progress = (audio.buffered.end(0) / audio.duration) * 100;
        dispatch({ type: 'SET_PROGRESS', payload: safeProgress(progress) });
      }
    },
  });

  // Track user interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (hasUserInteracted) return;
      setHasUserInteracted(true);

      // If we have a pending track to play, initialize it now
      if (pendingPlayTrackRef.current) {
        const trackToPlay = pendingPlayTrackRef.current;
        pendingPlayTrackRef.current = null;
        void playTrack(trackToPlay, true);
      }
    };

    const events = ['click', 'keydown', 'touchstart'];
    events.forEach((event) => {
      window.addEventListener(event, handleInteraction, { passive: true });
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleInteraction);
      });
    };
  }, [hasUserInteracted, playTrack]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return {
    ...audioState,
    currentTrack,
    audioRef,
    togglePlay,
    playTrack,
    hasUserInteracted,
    times,
  };
};
