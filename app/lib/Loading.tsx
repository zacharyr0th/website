import React, { memo } from 'react';

interface LoadingStateProps {
  /** Label for accessibility */
  label?: string;
  /** Height class for the loading skeleton */
  height?: string;
  /** Number of loading bars to display */
  barCount?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * A loading spinner component for inline loading states
 */
export const LoadingSpinner = memo(function LoadingSpinner() {
  return (
    <span
      role="status"
      aria-label="Loading"
      className="absolute inset-0 flex items-center justify-center"
    >
      <span 
        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
        aria-hidden="true"
      />
    </span>
  );
});

/**
 * A skeleton loading state component for content placeholders
 */
export const LoadingState = memo(function LoadingState({
  label = 'Loading content',
  height = 'h-64',
  barCount = 2,
  className = '',
}: LoadingStateProps) {
  return (
    <div role="status" aria-label={label} className="animate-pulse space-y-8">
      <div 
        className={`${height} bg-surface/50 rounded-xl ${className}`.trim()}
        aria-hidden="true"
      />
      <div className="space-y-4">
        {Array.from({ length: barCount }, (_, i) => (
          <div
            key={`loading-bar-${i}`}
            className={`h-4 bg-surface/50 rounded ${i === 0 ? 'w-1/3' : 'w-2/3'}`.trim()}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
});

LoadingState.displayName = 'LoadingState';
LoadingSpinner.displayName = 'LoadingSpinner';
