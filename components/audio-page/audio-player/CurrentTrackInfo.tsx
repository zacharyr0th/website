import React, { memo } from 'react';
import { motion } from 'framer-motion';
import type { Track } from './tracks';

// Helper function to format artist name
const formatArtistName = (name: string | undefined): string => {
  if (!name) return '';
  const names = name.split(' ');
  if (name.length > 15 && names.length > 1) {
    return names[names.length - 1] || '';
  }
  return name;
};

interface CurrentTrackInfoProps {
  track: Track;
  isLoading: boolean;
  isBuffering: boolean;
  isPlaying: boolean;
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
  controls: React.ReactNode;
}

const CurrentTrackInfo = memo<CurrentTrackInfoProps>(
  ({ track, isLoading, activeFilter, onFilterChange, controls }) => (
    <div className="space-y-2 sm:space-y-4" key={track.id}>
      <motion.h3
        className="text-xl sm:text-3xl font-sans font-medium text-[var(--color-text-primary)] tracking-tight line-clamp-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        key={track.title}
      >
        {track.title}
      </motion.h3>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
        <div className="flex flex-wrap gap-1 sm:gap-2 items-center">
          <motion.p
            className="font-sans text-sm sm:text-base text-[var(--color-text-secondary)]"
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
                className="font-sans text-sm sm:text-base text-[var(--color-text-secondary)] opacity-75"
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
              className={`font-sans px-1.5 py-0.5 sm:px-3 sm:py-1.5 text-xs sm:text-sm rounded-full transition-colors touch-manipulation ${
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
              {track.instrument}
            </motion.button>
            {track.genre && (
              <motion.button
                onClick={() =>
                  onFilterChange(activeFilter === track.genre ? null : track.genre || null)
                }
                className={`font-sans px-1.5 py-0.5 sm:px-3 sm:py-1.5 text-xs sm:text-sm rounded-full transition-colors touch-manipulation ${
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
  )
);

CurrentTrackInfo.displayName = 'CurrentTrackInfo';

export default CurrentTrackInfo;
