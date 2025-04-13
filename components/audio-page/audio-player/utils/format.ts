/**
 * Utility functions for formatting audio player values
 */

/**
 * Format time in seconds to mm:ss format
 * @param timeInSeconds - Time in seconds to format
 * @returns Formatted time string
 */
export const formatTime = (timeInSeconds: number): string => {
  if (!isFinite(timeInSeconds)) return '00:00';

  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Parse time string in mm:ss format to seconds
 * @param timeString - Time string in mm:ss format
 * @returns Time in seconds
 */
export const parseTimeString = (timeString: string): number => {
  try {
    if (!timeString || typeof timeString !== 'string') return 0;

    // Match format "m:ss" or "mm:ss"
    const match = timeString.match(/^(\d+):(\d{2})$/);
    if (!match?.[1] || !match?.[2]) return 0;

    const minutes = parseInt(match[1], 10);
    const seconds = parseInt(match[2], 10);

    if (!isFinite(minutes) || !isFinite(seconds) || seconds >= 60) return 0;
    return minutes * 60 + seconds;
  } catch {
    return 0;
  }
};

/**
 * Get remaining time in seconds
 * @param currentTime - Current playback time in seconds
 * @param duration - Total duration in seconds
 * @returns Remaining time in seconds
 */
export const getRemainingTime = (currentTime: number, duration: number): number => {
  if (!isFinite(currentTime) || !isFinite(duration)) return 0;
  return Math.max(0, duration - currentTime);
};

// Export all time-related utilities as a group
export const timeUtils = {
  formatTime,
  getRemainingTime,
  parseTimeString,
};
