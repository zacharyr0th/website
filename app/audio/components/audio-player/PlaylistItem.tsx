/**
 * PlaylistItem component for audio player
 * Displays track information in a playlist with interactive elements
 */
import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Track } from './tracks';

interface PlaylistItemProps {
  track: Track;
  currentTrack: Track;
  onPlay: (track: Track) => void;
  isLoading?: boolean;
}

const STYLES = {
  base: 'flex items-center p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-200 ease-in-out touch-manipulation active:scale-[0.99]',
  active:
    'bg-[var(--color-primary)] bg-opacity-10 border border-[var(--color-primary)] border-opacity-20',
  inactive:
    'hover:bg-[var(--color-border)] hover:bg-opacity-50 hover:shadow-sm border border-transparent hover:border-[var(--color-border)] hover:border-opacity-50',
  title: 'font-mono font-medium text-[var(--color-text-primary)] break-words sm:truncate pr-2',
  duration: 'font-mono text-sm text-[var(--color-text-secondary)] whitespace-nowrap',
  artist: 'font-mono text-[var(--color-text-secondary)] truncate',
  composer: 'font-mono text-[var(--color-text-secondary)] opacity-75 truncate ml-1',
  metadata: 'font-mono text-[var(--color-text-secondary)] opacity-75',
  genre:
    'font-mono text-xs px-2 py-0.5 rounded-full bg-[var(--color-border)] text-[var(--color-text-secondary)]',
  container: {
    willChange: 'transform',
    contain: 'layout style paint',
  },
  loading: 'animate-pulse',
} as const;

const ANIMATION = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
} as const;

const formatArtistName = (name: string | undefined): string => {
  if (!name) return '';
  const names = name.split(' ');
  return name.length > 15 && names.length > 1 ? names[names.length - 1] || '' : name;
};

// Loading indicator component
const LoadingIndicator = memo(() => (
  <div className="flex items-center justify-center w-5 h-5">
    <motion.div
      className="w-4 h-4 rounded-full border-2 border-[var(--color-primary)] border-t-transparent"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  </div>
));

LoadingIndicator.displayName = 'LoadingIndicator';

// Play indicator component
const PlayIndicator = memo<{ isPlaying: boolean }>(({ isPlaying }) => (
  <motion.div
    className="w-5 h-5 flex items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {isPlaying ? (
      <motion.div
        className="w-2 h-2 bg-[var(--color-primary)] rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    ) : (
      <svg className="w-4 h-4 text-[var(--color-primary)]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    )}
  </motion.div>
));

PlayIndicator.displayName = 'PlayIndicator';

// Single TrackContent component instead of multiple small ones
const TrackContent = memo<{ track: Track; isActive: boolean; isLoading: boolean }>(
  ({ track, isActive, isLoading }) => (
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-1.5">
        <motion.h5
          className={`${STYLES.title} ${isLoading ? STYLES.loading : ''} ${isActive ? 'text-accent' : ''}`}
          {...ANIMATION}
        >
          {track.title}
        </motion.h5>
        <motion.span
          className={`${STYLES.duration} ${isLoading ? STYLES.loading : ''}`}
          {...ANIMATION}
          transition={{ ...ANIMATION.transition, delay: 0.1 }}
        >
          {track.duration}
        </motion.span>
      </div>

      <div className="flex items-center text-xs sm:text-sm mb-0.5 font-mono">
        <motion.span
          className={`${STYLES.artist} ${isLoading ? STYLES.loading : ''}`}
          {...ANIMATION}
          transition={{ ...ANIMATION.transition, delay: 0.2 }}
        >
          {formatArtistName(track.artist)}
        </motion.span>
        {track.composer && track.composer !== track.artist && (
          <motion.span
            className={`${STYLES.composer} ${isLoading ? STYLES.loading : ''}`}
            {...ANIMATION}
            transition={{ ...ANIMATION.transition, delay: 0.3 }}
          >
            <span className="mx-1 opacity-50">•</span>
            {formatArtistName(track.composer)}
          </motion.span>
        )}
      </div>

      <div className="flex items-center space-x-2 text-xs font-mono">
        <motion.span
          className={`${STYLES.metadata} ${isLoading ? STYLES.loading : ''}`}
          {...ANIMATION}
          transition={{ ...ANIMATION.transition, delay: 0.4 }}
        >
          {track.instrument}
        </motion.span>
        {track.genre && (
          <>
            <span className="text-[var(--color-text-secondary)] opacity-50">•</span>
            <motion.span
              className={`${STYLES.genre} ${isLoading ? STYLES.loading : ''}`}
              {...ANIMATION}
              transition={{ ...ANIMATION.transition, delay: 0.5 }}
            >
              {track.genre}
            </motion.span>
          </>
        )}
      </div>
    </div>
  )
);

TrackContent.displayName = 'TrackContent';

const PlaylistItem = memo<PlaylistItemProps>(
  ({ track, currentTrack, onPlay, isLoading = false }) => {
    const isActive = currentTrack.id === track.id;
    const className = `${STYLES.base} ${isActive ? STYLES.active : STYLES.inactive} ${isLoading ? STYLES.loading : ''}`;
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        key={track.id}
        className={className}
        onClick={() => !isLoading && onPlay(track)}
        layout
        style={STYLES.container}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        {...ANIMATION}
      >
        <div className="mr-3 flex-shrink-0">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingIndicator key="loading" />
            ) : isActive || isHovered ? (
              <PlayIndicator key="play" isPlaying={isActive} />
            ) : null}
          </AnimatePresence>
        </div>

        <TrackContent track={track} isActive={isActive} isLoading={isLoading} />
      </motion.div>
    );
  }
);

PlaylistItem.displayName = 'PlaylistItem';

export default PlaylistItem;
