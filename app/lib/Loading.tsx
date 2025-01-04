import React from 'react';

interface LoadingStateProps {
  label?: string;
  height?: string;
  barCount?: number;
  className?: string;
}

export const LoadingSpinner: React.FC = () => (
  <span className="absolute inset-0 flex items-center justify-center">
    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
  </span>
);

export const LoadingState = ({
  label = 'Loading content',
  height = 'h-64',
  barCount = 2,
  className = '',
}: LoadingStateProps) => (
  <div className="animate-pulse space-y-8" aria-label={label}>
    <div className={`${height} bg-surface/50 rounded-xl ${className}`} aria-hidden="true" />
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
LoadingSpinner.displayName = 'LoadingSpinner'; 