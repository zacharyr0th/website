import React, { useRef, memo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { Track } from './tracks';
import PlaylistItem from './PlaylistItem';

/**
 * VirtualizedPlaylist: A performance-optimized playlist component using virtualization.
 *
 * NOTE: This component is prepared for future use when the playlist grows larger.
 * Currently not in use as the direct rendering approach is more suitable for:
 * - Small playlists (<50 tracks)
 * - Smooth animations and transitions
 * - Simpler maintenance
 *
 * Switch to this component when:
 * 1. The number of tracks exceeds 50
 * 2. Track items become more complex to render
 * 3. Memory/performance becomes a concern
 *
 * @see AudioPlayer.tsx for the current implementation
 */

interface VirtualizedPlaylistProps {
  tracks: Track[];
  currentTrack: Track;
  onPlay: (track: Track) => void;
  className?: string;
}

const STYLES = {
  container: {
    willChange: 'transform',
    contain: 'strict',
  },
  list: {
    position: 'relative' as const,
    width: '100%',
  },
  item: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
  },
} as const;

const ITEM_HEIGHT = 96; // Height of each playlist item (24px padding top/bottom + content)
const OVERSCAN = 5; // Number of items to render outside of the visible area

const VirtualizedPlaylist = memo<VirtualizedPlaylistProps>(
  ({ tracks, currentTrack, onPlay, className = '' }) => {
    const parentRef = useRef<HTMLDivElement>(null);

    const virtualizer = useVirtualizer({
      count: tracks.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => ITEM_HEIGHT,
      overscan: OVERSCAN,
    });

    return (
      <div
        ref={parentRef}
        className={`relative overflow-auto overscroll-behavior-contain ${className}`}
        style={STYLES.container}
      >
        <div
          style={{
            ...STYLES.list,
            height: `${virtualizer.getTotalSize()}px`,
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const track = tracks[virtualItem.index];
            // Safety check for track existence
            if (!track) return null;

            return (
              <div
                key={virtualItem.key}
                style={{
                  ...STYLES.item,
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <PlaylistItem track={track} currentTrack={currentTrack} onPlay={onPlay} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

VirtualizedPlaylist.displayName = 'VirtualizedPlaylist';

export default VirtualizedPlaylist;
