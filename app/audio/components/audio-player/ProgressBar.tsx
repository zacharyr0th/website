/**
 * ProgressBar component for audio player
 * Displays current playback progress and allows seeking
 */
import React, { memo, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  progressRef: React.RefObject<HTMLDivElement>;
  onProgressClick: (position: number) => void;
  formatTime: (time: number) => string;
  isBuffering?: boolean; // Add buffering state
  loadedProgress?: number; // Add loaded progress for buffering indicator
}

// Extract constants to prevent recreations
const HOVER_ANIMATION = {
  scale: 1.02,
  transition: { type: 'spring', stiffness: 300, damping: 25 },
} as const;

// Extract styles to constants
const styles = {
  container: {
    willChange: 'transform',
    contain: 'layout style paint',
    touchAction: 'none', // Prevent scrolling while dragging on mobile
  },
  progressGlow: {
    background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
    opacity: 0.2,
    filter: 'blur(4px)',
  },
  progressFill: {
    background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
  },
  bufferingFill: {
    background: 'rgba(255, 255, 255, 0.2)',
  },
} as const;

// Extract TimeDisplay component for better performance
const TimeDisplay = memo<{ time: string; className: string }>(({ time, className }) => (
  <motion.span
    className={className}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.2 }}
  >
    {time}
  </motion.span>
));

TimeDisplay.displayName = 'TimeDisplay';

// Extract ProgressBarFill component for better performance
const ProgressBarFill = memo<{ progress: number; isBuffering: boolean }>(
  ({ progress, isBuffering }) => (
    <>
      {/* Background glow effect */}
      <div
        className="absolute inset-0"
        style={{
          ...styles.progressGlow,
          width: `${progress}%`,
        }}
      />

      {/* Progress bar fill */}
      <motion.div
        className="absolute inset-0"
        style={{
          ...styles.progressFill,
          width: `${progress}%`,
        }}
        initial={{ width: 0 }}
        animate={{
          width: `${progress}%`,
          opacity: isBuffering ? 0.7 : 1,
        }}
        transition={{
          width: { type: 'spring', stiffness: 100, damping: 20 },
          opacity: { duration: 0.3 },
        }}
      />
    </>
  )
);

ProgressBarFill.displayName = 'ProgressBarFill';

// Add BufferingIndicator component
const BufferingIndicator = memo<{ isBuffering: boolean; loadedProgress: number }>(
  ({ isBuffering, loadedProgress }) => {
    if (!isBuffering && loadedProgress >= 100) return null;

    return (
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isBuffering ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 bg-white/20"
          style={{
            width: `${loadedProgress}%`,
            transformOrigin: 'left',
          }}
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: 1,
            opacity: isBuffering ? [0.3, 0.7, 0.3] : 0.3,
          }}
          transition={{
            scaleX: { duration: 0.5 },
            opacity: isBuffering
              ? {
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'easeInOut',
                }
              : { duration: 0.3 },
          }}
        />
      </motion.div>
    );
  }
);

BufferingIndicator.displayName = 'BufferingIndicator';

// Extract HoverIndicator component for better performance
const HoverIndicator = memo<{ progress: number; isActive: boolean }>(({ progress, isActive }) => (
  <motion.div
    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
    style={{
      ...styles.progressFill,
      left: `${progress}%`,
      transform: 'translate(-50%, -50%)',
    }}
    animate={{ scale: isActive ? 1.2 : 1 }}
    whileHover={{ scale: 1.2 }}
  >
    <div className="absolute inset-1 rounded-full bg-white" />
  </motion.div>
));

HoverIndicator.displayName = 'HoverIndicator';

const ProgressBar = memo<ProgressBarProps>(
  ({
    currentTime,
    duration,
    progressRef,
    onProgressClick,
    formatTime,
    isBuffering = false,
    loadedProgress = 0,
  }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragProgress, setDragProgress] = useState<number | null>(null);

    // Calculate actual progress percentage
    const progress = useMemo(() => {
      if (duration <= 0 || isNaN(duration) || isNaN(currentTime)) return 0;
      return Math.min(Math.max((currentTime / duration) * 100, 0), 100);
    }, [currentTime, duration]);

    // Use drag progress if dragging, otherwise use actual progress
    const displayProgress = dragProgress !== null ? dragProgress : progress;

    // Format time displays
    const formattedCurrentTime = useMemo(
      () => formatTime(isNaN(currentTime) ? 0 : currentTime),
      [currentTime, formatTime]
    );

    const formattedRemainingTime = useMemo(() => {
      if (isNaN(duration) || isNaN(currentTime)) return formatTime(0);
      const remaining = Math.max(0, duration - currentTime);
      return `-${formatTime(remaining)}`;
    }, [duration, currentTime, formatTime]);

    // Calculate buffered progress
    const bufferedProgress = useMemo(() => {
      return Math.min(Math.max(loadedProgress, 0), 100);
    }, [loadedProgress]);

    // Handle progress bar click
    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressRef.current) return;

      const rect = progressRef.current.getBoundingClientRect();
      const pos = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      onProgressClick(pos);
    };

    // Handle mouse down for dragging
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressRef.current) return;

      setIsDragging(true);
      const rect = progressRef.current.getBoundingClientRect();
      const pos = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      setDragProgress(pos * 100);

      // Prevent text selection during drag
      document.body.style.userSelect = 'none';
    };

    // Handle mouse move for dragging
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !progressRef.current) return;

        const rect = progressRef.current.getBoundingClientRect();
        const pos = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
        setDragProgress(pos * 100);
      };

      const handleMouseUp = (e: MouseEvent) => {
        if (!isDragging || !progressRef.current) return;

        const rect = progressRef.current.getBoundingClientRect();
        const pos = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
        onProgressClick(pos);

        setIsDragging(false);
        setDragProgress(null);

        // Restore text selection
        document.body.style.userSelect = '';
      };

      if (isDragging) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
      }

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = '';
      };
    }, [isDragging, progressRef, onProgressClick]);

    return (
      <div className="space-y-2">
        <motion.div
          ref={progressRef}
          className="h-3 sm:h-2 bg-[#2A2A2A] rounded-full cursor-pointer overflow-hidden group relative hover:h-4 sm:hover:h-3 transition-all duration-300 touch-manipulation"
          onClick={handleProgressClick}
          onMouseDown={handleMouseDown}
          whileHover={HOVER_ANIMATION}
          style={styles.container}
        >
          {/* Buffering indicator */}
          <BufferingIndicator isBuffering={isBuffering} loadedProgress={bufferedProgress} />

          {/* Progress fill */}
          <ProgressBarFill progress={displayProgress} isBuffering={isBuffering} />

          {/* Hover/drag indicator */}
          <HoverIndicator progress={displayProgress} isActive={isDragging} />
        </motion.div>

        <div className="flex justify-between text-[var(--color-text-secondary)] font-mono">
          <TimeDisplay
            time={formattedCurrentTime}
            className="tabular-nums select-none text-lg sm:text-sm tracking-tight"
          />
          <TimeDisplay
            time={formattedRemainingTime}
            className="tabular-nums select-none text-lg sm:text-sm tracking-tight"
          />
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
