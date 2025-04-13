/**
 * PlaylistItem component for audio player
 * Displays track information in a playlist with interactive elements
 */
import React, { memo, forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { Track } from './tracks';

interface PlaylistItemProps {
  track: Track;
  currentTrack: Track;
  onPlay: (track: Track) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const STYLES = {
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

// Single TrackContent component instead of multiple small ones
const TrackContent = memo<{ track: Track; isActive: boolean; isLoading: boolean }>(
  ({ track, isActive, isLoading }) => (
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
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

      <div className="flex items-center text-xs sm:text-sm mt-1 font-sans">
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

      <div className="flex items-center space-x-2 text-xs font-sans mt-1">
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

const PlaylistItem = memo(
  forwardRef<HTMLDivElement, PlaylistItemProps>(
    ({ track, currentTrack, onPlay, isLoading = false, isDisabled = false }, ref) => {
      const isActive = currentTrack.id === track.id;
      const className = `${STYLES.base} ${isActive ? STYLES.active : STYLES.inactive} ${isLoading ? STYLES.loading : ''} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`;

      return (
        <motion.div
          ref={ref}
          key={track.id}
          className={className}
          onClick={() => !isLoading && !isDisabled && onPlay(track)}
          layout
          style={STYLES.container}
          whileHover={!isDisabled && !isLoading ? { scale: 1.02 } : {}}
          whileTap={!isDisabled && !isLoading ? { scale: 0.98 } : {}}
          {...ANIMATION}
        >
          {isLoading && (
            <div className="w-5 h-5 mr-3 flex-shrink-0">
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <TrackContent track={track} isActive={isActive} isLoading={isLoading} />
        </motion.div>
      );
    }
  )
);

PlaylistItem.displayName = 'PlaylistItem';

export default PlaylistItem;
