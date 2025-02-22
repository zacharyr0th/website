import React, { memo } from 'react';
import { motion } from 'framer-motion';
import type { Track } from './tracks';

interface PlaylistItemProps {
  track: Track;
  currentTrack: Track;
  onPlay: (track: Track) => void;
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
const TrackContent = memo<{ track: Track }>(({ track }) => (
  <div className="flex-1 min-w-0">
    <div className="flex items-center justify-between mb-1.5">
      <motion.h5 className={STYLES.title} {...ANIMATION}>
        {track.title}
      </motion.h5>
      <motion.span
        className={STYLES.duration}
        {...ANIMATION}
        transition={{ ...ANIMATION.transition, delay: 0.1 }}
      >
        {track.duration}
      </motion.span>
    </div>

    <div className="flex items-center text-xs sm:text-sm mb-0.5 font-mono">
      <motion.span
        className={STYLES.artist}
        {...ANIMATION}
        transition={{ ...ANIMATION.transition, delay: 0.2 }}
      >
        {formatArtistName(track.artist)}
      </motion.span>
      {track.composer && track.composer !== track.artist && (
        <motion.span
          className={STYLES.composer}
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
        className={STYLES.metadata}
        {...ANIMATION}
        transition={{ ...ANIMATION.transition, delay: 0.4 }}
      >
        {track.instrument}
      </motion.span>
      {track.genre && (
        <>
          <span className="text-[var(--color-text-secondary)] opacity-50">•</span>
          <motion.span
            className={STYLES.genre}
            {...ANIMATION}
            transition={{ ...ANIMATION.transition, delay: 0.5 }}
          >
            {track.genre}
          </motion.span>
        </>
      )}
    </div>
  </div>
));

TrackContent.displayName = 'TrackContent';

const PlaylistItem = memo<PlaylistItemProps>(({ track, currentTrack, onPlay }) => {
  const isActive = currentTrack.id === track.id;
  const className = `${STYLES.base} ${isActive ? STYLES.active : STYLES.inactive}`;

  return (
    <motion.div
      key={track.id}
      className={className}
      onClick={() => onPlay(track)}
      layout
      style={STYLES.container}
      whileTap={{ scale: 0.98 }}
      {...ANIMATION}
    >
      <TrackContent track={track} />
    </motion.div>
  );
});

PlaylistItem.displayName = 'PlaylistItem';

export default PlaylistItem;
