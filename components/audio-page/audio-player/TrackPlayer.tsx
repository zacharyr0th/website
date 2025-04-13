'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { type Track, TRACKS, getNextTrack, getPreviousTrack } from './tracks';
import { useTrackPlayer } from './hooks/useTrackPlayer';
import CurrentTrackInfo from './CurrentTrackInfo';
import ControlButton from './ControlButton';
import ProgressBar from './ProgressBar';
import PlaylistItem from './PlaylistItem';

export default function TrackPlayer() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    currentTrack,
    isPlaying,
    isLoading,
    isBuffering,
    currentTime,
    duration,
    loadedProgress,
    togglePlay,
    playTrack,
    audioRef,
  } = useTrackPlayer(TRACKS[0]);

  const handlePlay = useCallback(
    async (track: Track) => {
      try {
        if (!track) {
          console.warn('Attempted to play undefined track');
          return;
        }

        // Log track change for debugging
        console.log(`Switching to track: ${track.id} - ${track.title}`);

        // Only toggle play if we're already playing a different track
        if (isPlaying && currentTrack?.id !== track.id) {
          await togglePlay();
        }

        // Update the track reference
        await playTrack(track);

        // Only auto-play if we were already playing something, or this is first play
        if (isPlaying || !currentTime) {
          await togglePlay();
        }
      } catch (error) {
        console.error('Failed to play track:', error);
        setError(error instanceof Error ? error.message : 'Failed to play track');
      }
    },
    [isPlaying, currentTrack, currentTime, playTrack, togglePlay]
  );

  const handleSeek = useCallback(
    (position: number) => {
      const audio = audioRef.current;
      if (audio && !isNaN(audio.duration)) {
        audio.currentTime = position * audio.duration;
      }
    },
    [audioRef]
  );

  const handlePrevious = useCallback(() => {
    if (!currentTrack) return;

    try {
      // Get the previous track
      const prevTrack = getPreviousTrack(currentTrack.id);

      if (!prevTrack) {
        console.warn('No previous track found');
        return;
      }

      // Log for debugging
      console.log(`Going to previous track: ${prevTrack.id} - ${prevTrack.title}`);

      // Clear any existing errors
      setError(null);

      // Play the previous track
      void handlePlay(prevTrack);
    } catch (err) {
      console.error('Error navigating to previous track:', err);
      setError(err instanceof Error ? err.message : 'Error navigating to previous track');
    }
  }, [currentTrack, handlePlay, setError]);

  const handleNext = useCallback(() => {
    if (!currentTrack) return;

    try {
      // Get the next track
      const nextTrack = getNextTrack(currentTrack.id);

      if (!nextTrack) {
        console.warn('No next track found');
        return;
      }

      // Log for debugging
      console.log(`Going to next track: ${nextTrack.id} - ${nextTrack.title}`);

      // Clear any existing errors
      setError(null);

      // Play the next track
      void handlePlay(nextTrack);
    } catch (err) {
      console.error('Error navigating to next track:', err);
      setError(err instanceof Error ? err.message : 'Error navigating to next track');
    }
  }, [currentTrack, handlePlay, setError]);

  // Handle keyboard controls with debouncing to prevent multiple rapid actions
  useEffect(() => {
    let lastKeyTime = 0;
    const KEY_COOLDOWN = 300; // ms

    const handleKeyPress = (e: KeyboardEvent) => {
      // Prevent key spamming
      const now = Date.now();
      if (now - lastKeyTime < KEY_COOLDOWN) return;
      lastKeyTime = now;

      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          if (currentTrack) void togglePlay();
          break;
        case 'ArrowLeft':
          if (e.altKey) {
            e.preventDefault();
            handlePrevious();
          }
          break;
        case 'ArrowRight':
          if (e.altKey) {
            e.preventDefault();
            handleNext();
          }
          break;
        case 'KeyM':
          // Add mute toggle if needed
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentTrack, togglePlay, handlePrevious, handleNext]);

  // Filtered track list based on active filter
  const displayedTracks = useMemo(() => {
    if (!activeFilter) return TRACKS;
    return TRACKS.filter(
      (track) => track.instrument === activeFilter || track.genre === activeFilter
    );
  }, [activeFilter]);

  return (
    <div
      className="flex flex-col w-full max-w-4xl space-y-8"
      role="region"
      aria-label="Audio Player"
    >
      {error && (
        <div
          className="bg-red-900/20 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg relative"
          role="alert"
        >
          {error}
        </div>
      )}

      <div className="space-y-6">
        <CurrentTrackInfo
          key={currentTrack?.id || 'no-track'}
          track={currentTrack}
          isPlaying={isPlaying}
          isLoading={isLoading}
          isBuffering={isBuffering}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          controls={
            <div
              className="flex items-center justify-center gap-4"
              role="group"
              aria-label="Playback Controls"
            >
              <ControlButton
                icon="previous"
                onClick={handlePrevious}
                isDisabled={!currentTrack || isLoading}
                label="Previous Track"
                aria-label="Play Previous Track (Alt + Left Arrow)"
              />
              <ControlButton
                icon={isPlaying ? 'pause' : 'play'}
                onClick={() => currentTrack && togglePlay()}
                isDisabled={!currentTrack || isLoading}
                label={isPlaying ? 'Pause' : 'Play'}
                className="scale-125"
                aria-label={`${isPlaying ? 'Pause' : 'Play'} (Spacebar)`}
              />
              <ControlButton
                icon="next"
                onClick={handleNext}
                isDisabled={!currentTrack || isLoading}
                label="Next Track"
                aria-label="Play Next Track (Alt + Right Arrow)"
              />
            </div>
          }
        />

        <div className="relative">
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            buffered={loadedProgress / 100}
            onSeek={handleSeek}
            isLoading={isLoading}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 mt-8" role="list" aria-label="Track List">
        {displayedTracks.map((track) => (
          <PlaylistItem
            key={track.id}
            track={track}
            currentTrack={currentTrack || TRACKS[0]}
            onPlay={handlePlay}
            isLoading={isLoading && currentTrack?.id === track.id}
          />
        ))}
      </div>
    </div>
  );
}
