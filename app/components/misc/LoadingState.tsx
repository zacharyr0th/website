import React from 'react';

interface LoadingStateProps {
  label?: string;
  height?: string;
  barCount?: number;
}

export const LoadingState = ({
  label = 'Loading content',
  height = 'h-64',
  barCount = 2,
}: LoadingStateProps) => (
  <div className="animate-pulse space-y-8" aria-label={label}>
    <div className={`${height} bg-surface/50 rounded-xl`} aria-hidden="true" />
    <div className="space-y-4">
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-surface/50 rounded ${i === 0 ? 'w-1/3' : 'w-2/3'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  </div>
);

LoadingState.displayName = 'LoadingState';
