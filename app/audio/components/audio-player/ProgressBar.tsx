import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  progressRef: React.RefObject<HTMLDivElement>;
  onProgressClick: (position: number) => void;
  formatTime: (time: number) => string;
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
const ProgressBarFill = memo<{ progress: number }>(({ progress }) => (
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
      animate={{ width: `${progress}%` }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    />
  </>
));

ProgressBarFill.displayName = 'ProgressBarFill';

// Extract HoverIndicator component for better performance
const HoverIndicator = memo<{ progress: number }>(({ progress }) => (
  <motion.div
    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
    style={{
      ...styles.progressFill,
      left: `${progress}%`,
      transform: 'translate(-50%, -50%)',
    }}
    whileHover={{ scale: 1.2 }}
  >
    <div className="absolute inset-1 rounded-full bg-white" />
  </motion.div>
));

HoverIndicator.displayName = 'HoverIndicator';

const ProgressBar = memo<ProgressBarProps>(
  ({ currentTime, duration, progressRef, onProgressClick, formatTime }) => {
    const progress = useMemo(() => {
      if (duration <= 0 || isNaN(duration) || isNaN(currentTime)) return 0;
      return Math.min(Math.max((currentTime / duration) * 100, 0), 100);
    }, [currentTime, duration]);

    const formattedCurrentTime = useMemo(
      () => formatTime(isNaN(currentTime) ? 0 : currentTime),
      [currentTime, formatTime]
    );

    const formattedRemainingTime = useMemo(() => {
      if (isNaN(duration) || isNaN(currentTime)) return formatTime(0);
      const remaining = Math.max(0, duration - currentTime);
      return `-${formatTime(remaining)}`;
    }, [duration, currentTime, formatTime]);

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressRef.current) return;

      const rect = progressRef.current.getBoundingClientRect();
      const pos = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      onProgressClick(pos);
    };

    return (
      <div className="space-y-2">
        <motion.div
          ref={progressRef}
          className="h-3 sm:h-2 bg-[#2A2A2A] rounded-full cursor-pointer overflow-hidden group relative hover:h-4 sm:hover:h-3 transition-all duration-300 touch-manipulation"
          onClick={handleProgressClick}
          whileHover={HOVER_ANIMATION}
          style={styles.container}
        >
          <ProgressBarFill progress={progress} />
          <HoverIndicator progress={progress} />
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
