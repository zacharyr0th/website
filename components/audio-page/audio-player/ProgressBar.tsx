/**
 * ProgressBar component for audio player
 * Displays current playback progress and allows seeking
 */
import React, { memo, useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import debounce from 'lodash/debounce';
import { formatTime } from './utils/format';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  buffered: number;
  onSeek: (time: number) => void;
  isLoading?: boolean;
}

// Extract styles to constants
const styles = {
  container: {
    willChange: 'transform',
    contain: 'layout style paint',
    touchAction: 'none',
  },
  progressGlow: {
    background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
    opacity: 0.15,
    filter: 'blur(8px)',
  },
  progressFill: {
    background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
  },
  bufferingFill: {
    background: 'rgba(255, 255, 255, 0.1)',
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
        className="absolute inset-0 rounded-full"
        style={{
          ...styles.progressGlow,
          width: `${progress}%`,
          transform: 'translateZ(0)',
        }}
      />

      {/* Progress bar fill */}
      <motion.div
        className="absolute inset-0 origin-left rounded-full"
        style={{
          ...styles.progressFill,
          width: `${progress}%`,
          transform: 'translateZ(0)',
        }}
        initial={false}
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
        className="absolute inset-0 overflow-hidden rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isBuffering ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            ...styles.bufferingFill,
            width: `${loadedProgress}%`,
            transformOrigin: 'left',
            transform: 'translateZ(0)',
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
    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
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

// Add HoverTooltip component
const HoverTooltip = memo<{ time: number; position: number }>(({ time, position }) => (
  <motion.div
    className="absolute bottom-full left-0 mb-2 rounded bg-black/80 px-2 py-1 text-xs text-white"
    style={{
      left: `${position}%`,
      transform: 'translateX(-50%)',
    }}
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 5 }}
  >
    {formatTime(time)}
  </motion.div>
));

HoverTooltip.displayName = 'HoverTooltip';

export const ProgressBar = ({
  currentTime,
  duration,
  buffered,
  onSeek,
  isLoading,
}: ProgressBarProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoverProgress, setHoverProgress] = useState<number | null>(null);
  const [dragProgress, setDragProgress] = useState<number | null>(null);

  // Create debounced seek function
  const debouncedSeek = useMemo(
    () =>
      debounce((progress: number) => {
        onSeek(progress * duration);
      }, 50),
    [duration, onSeek]
  );

  // Cleanup debounced function
  useEffect(() => {
    return () => {
      debouncedSeek.cancel();
    };
  }, [debouncedSeek]);

  const calculateProgress = useCallback((clientX: number) => {
    if (!progressRef.current) return 0;
    const rect = progressRef.current.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return progress;
  }, []);

  const handleSeek = useCallback(
    (progress: number) => {
      if (duration <= 0) return;
      onSeek(progress * duration);
    },
    [duration, onSeek]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      let clientX: number | null = null;

      if ('touches' in e && e.touches?.[0]) {
        clientX = e.touches[0].clientX;
      } else if ('clientX' in e) {
        clientX = e.clientX;
      }

      if (clientX === null) return;

      const progress = calculateProgress(clientX);
      if (isDragging) {
        setDragProgress(progress);
        debouncedSeek(progress);
      } else {
        setHoverProgress(progress);
      }
    },
    [calculateProgress, debouncedSeek, isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragProgress(null);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchmove', handleMouseMove);
    document.removeEventListener('touchend', handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      let clientX: number | null = null;

      if ('touches' in e && e.touches?.[0]) {
        clientX = e.touches[0].clientX;
      } else if ('clientX' in e) {
        clientX = e.clientX;
      }

      if (clientX === null) return;

      setIsDragging(true);
      const progress = calculateProgress(clientX);
      setDragProgress(progress);
      handleSeek(progress);

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleMouseMove);
      document.addEventListener('touchend', handleMouseUp);
    },
    [calculateProgress, handleMouseMove, handleMouseUp, handleSeek]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const STEP = 0.05; // 5% step for keyboard navigation
      let newProgress = currentTime / (duration || 1);

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          newProgress = Math.max(0, newProgress - STEP);
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          newProgress = Math.min(1, newProgress + STEP);
          break;
        case 'Home':
          newProgress = 0;
          break;
        case 'End':
          newProgress = 1;
          break;
        default:
          return;
      }

      e.preventDefault();
      handleSeek(newProgress);
    },
    [currentTime, duration, handleSeek]
  );

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const progress = duration > 0 ? currentTime / duration : 0;
  const displayProgress = dragProgress ?? progress;
  const displayTime = (hoverProgress ?? displayProgress) * duration;

  return (
    <div className="w-full space-y-1">
      <div
        ref={progressRef}
        role="slider"
        aria-label="Audio progress"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={currentTime}
        aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative h-1.5 w-full cursor-pointer rounded-full bg-gray-200/30 transition-all hover:h-2 group transform-gpu"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onMouseMove={(e) => !isDragging && handleMouseMove(e.nativeEvent)}
        onMouseLeave={() => setHoverProgress(null)}
      >
        {/* Buffered Progress */}
        <motion.div
          className="absolute h-full rounded-full bg-gray-200/50 transform-gpu"
          style={{ width: `${buffered * 100}%` }}
          transition={{ duration: 0.1 }}
        />

        {/* Actual Progress */}
        <motion.div
          className="absolute h-full rounded-full transform-gpu"
          style={{
            width: `${displayProgress * 100}%`,
            background:
              'linear-gradient(to right, var(--color-primary, #4A90E2), var(--color-secondary, #67B26F))',
            opacity: 1,
            zIndex: 10,
          }}
          transition={
            isDragging ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }
          }
        >
          {/* Progress Handle */}
          <motion.div
            className={`absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 cursor-grab rounded-full bg-white shadow-lg transition-transform ${
              isDragging ? 'scale-125 cursor-grabbing' : 'scale-0 group-hover:scale-100'
            }`}
            style={{ zIndex: 20 }}
            whileHover={{ scale: isDragging ? 1.25 : 1.1 }}
            whileTap={{ scale: 1.25, cursor: 'grabbing' }}
          />
        </motion.div>

        {/* Loading Indicator */}
        {isLoading && (
          <motion.div
            className="absolute left-0 h-full w-full rounded-full transform-gpu"
            style={{
              background:
                'linear-gradient(to right, var(--color-primary, #4A90E2), var(--color-secondary, #67B26F))',
              opacity: 0.5,
              zIndex: 5,
            }}
            animate={{
              opacity: [0.3, 0.7],
              backgroundPosition: ['0% 50%', '100% 50%'],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        )}

        {/* Hover Preview */}
        {hoverProgress !== null && !isDragging && (
          <>
            <motion.div
              className="absolute h-full rounded-full bg-white/30 transform-gpu"
              style={{ width: `${hoverProgress * 100}%`, zIndex: 15 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <HoverTooltip time={displayTime} position={hoverProgress * 100} />
          </>
        )}
      </div>

      {/* Time Display */}
      <div className="flex justify-between px-0.5 text-xs text-[var(--color-text-secondary)]">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
