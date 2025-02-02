import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Track } from '../tracks';

interface PlaylistItemProps {
  track: Track;
  currentTrack: Track;
  onPlay: (track: Track) => void;
}

// Extract constants to prevent recreations
const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
} as const;

// Extract styles to constants
const styles = {
  active: 'bg-[var(--color-primary)] bg-opacity-10 border border-[var(--color-primary)] border-opacity-20',
  inactive: 'hover:bg-[var(--color-border)] hover:bg-opacity-50 hover:shadow-sm border border-transparent hover:border-[var(--color-border)] hover:border-opacity-50',
  container: {
    willChange: 'transform',
    contain: 'layout style paint',
  },
} as const;

// Helper function to format artist name
const formatArtistName = (name: string | undefined): string => {
  if (!name) return '';
  const names = name.split(' ');
  // If name is longer than 15 characters and has multiple parts, use last name
  if (name.length > 15 && names.length > 1) {
    return names[names.length - 1] || '';
  }
  return name;
};

// Extract TrackTitle component for better performance
const TrackTitle = memo<{ title: string }>(({ title }) => (
  <motion.h5 
    {...ANIMATION_CONFIG}
    className="font-medium text-[var(--color-text-primary)] truncate pr-2"
  >
    {title}
  </motion.h5>
));

TrackTitle.displayName = 'TrackTitle';

// Extract TrackDuration component for better performance
const TrackDuration = memo<{ duration: string }>(({ duration }) => (
  <motion.span 
    {...ANIMATION_CONFIG}
    transition={{ delay: 0.1 }}
    className="text-sm text-[var(--color-text-secondary)] whitespace-nowrap"
  >
    {duration}
  </motion.span>
));

TrackDuration.displayName = 'TrackDuration';

// Extract TrackArtist component for better performance
const TrackArtist = memo<{ artist: string; composer: string | undefined }>(({ artist, composer }) => (
  <div className="flex items-center text-xs sm:text-sm mb-0.5">
    <motion.span 
      {...ANIMATION_CONFIG}
      transition={{ delay: 0.2 }}
      className="text-[var(--color-text-secondary)] truncate"
    >
      {formatArtistName(artist)}
    </motion.span>
    {composer && composer !== artist && (
      <motion.span 
        {...ANIMATION_CONFIG}
        transition={{ delay: 0.3 }}
        className="text-[var(--color-text-secondary)] opacity-75 truncate ml-1"
      >
        <span className="mx-1 opacity-50">•</span>
        {formatArtistName(composer)}
      </motion.span>
    )}
  </div>
));

TrackArtist.displayName = 'TrackArtist';

// Extract TrackMetadata component for better performance
const TrackMetadata = memo<{ instrument: 'guitar' | 'piano' | 'guitar/piano'; genre?: string | undefined }>(({ instrument, genre }) => (
  <div className="flex items-center space-x-2 text-xs">
    <motion.span 
      {...ANIMATION_CONFIG}
      transition={{ delay: 0.4 }}
      className="text-[var(--color-text-secondary)] opacity-75 capitalize"
    >
      {instrument}
    </motion.span>
    {genre && (
      <>
        <span className="text-[var(--color-text-secondary)] opacity-50">•</span>
        <motion.span 
          {...ANIMATION_CONFIG}
          transition={{ delay: 0.5 }}
          className="px-2 py-0.5 rounded-full bg-[var(--color-border)] text-[var(--color-text-secondary)]"
        >
          {genre}
        </motion.span>
      </>
    )}
  </div>
));

TrackMetadata.displayName = 'TrackMetadata';

// Extract TrackInfo component for better performance
const TrackInfo = memo<{ track: Track }>(({ track }) => (
  <div className="flex-1 min-w-0">
    <div className="flex items-center justify-between mb-1.5">
      <TrackTitle title={track.title} />
      <TrackDuration duration={track.duration} />
    </div>
    <TrackArtist artist={track.artist} composer={track.composer} />
    <TrackMetadata instrument={track.instrument} genre={track.genre} />
  </div>
));

TrackInfo.displayName = 'TrackInfo';

const PlaylistItem = memo<PlaylistItemProps>(({ track, currentTrack, onPlay }) => {
  const isActive = currentTrack.id === track.id;
  
  const className = useMemo(() => 
    `flex items-center p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-200 ease-in-out touch-manipulation active:scale-[0.99] ${
      isActive ? styles.active : styles.inactive
    }`,
    [isActive]
  );

  const handleClick = useMemo(() => 
    () => onPlay(track),
    [onPlay, track]
  );

  return (
    <motion.div
      key={track.id}
      className={className}
      onClick={handleClick}
      layout
      style={styles.container}
      whileTap={{ scale: 0.98 }}
      {...ANIMATION_CONFIG}
    >
      <TrackInfo track={track} />
    </motion.div>
  );
});

PlaylistItem.displayName = 'PlaylistItem';

export default PlaylistItem; 