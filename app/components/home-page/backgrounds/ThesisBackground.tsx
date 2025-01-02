// File moved from app/components/page-home/ThesisBackground.tsx
// Content remains the same but in new location

import React, { memo } from 'react';

// Add TypeScript interfaces for better type safety
type PolygonPattern = {
  readonly points: string;
  readonly gradientIndex: number;
};

type ColorType = (typeof COLORS)[number];

// Constants are already well-optimized outside component
const COLORS = ['primary', 'secondary', 'accent', 'surface'] as const;
const POLYGON_PATTERNS: readonly PolygonPattern[] = [
  { points: '0,0 100,0 150,100 50,100', gradientIndex: 1 },
  { points: '100,0 200,0 200,100 150,100', gradientIndex: 2 },
  { points: '0,100 50,100 100,200 0,200', gradientIndex: 3 },
  { points: '50,100 150,100 200,200 100,200', gradientIndex: 4 },
] as const;

// Add animation style
const animationStyle = {
  animation: 'backgroundMove 30s linear infinite',
  willChange: 'transform',
  transformOrigin: 'center',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
} as const;

// Add style tag with keyframes
const AnimationKeyframes = () => (
  <style>
    {`
      @keyframes backgroundMove {
        0% {
          transform: translate(0, 0);
        }
        100% {
          transform: translate(-50%, -50%);
        }
      }
    `}
  </style>
);

// Memoize gradient stop styles to prevent unnecessary recalculations
const createGradientStop = (color: ColorType, opacity: number) => ({
  stopColor: `var(--color-${color})`,
  stopOpacity: opacity,
});

const NoiseFilter = memo(() => (
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
    <feColorMatrix type="saturate" values="0.1" />
  </filter>
));

NoiseFilter.displayName = 'NoiseFilter';

// Optimize GradientPatterns with useMemo for style objects
const GradientPatterns = memo(() => (
  <defs>
    <NoiseFilter />
    <pattern
      id="stainedGlass"
      width="200"
      height="200"
      patternUnits="userSpaceOnUse"
      patternTransform="scale(1.5)"
    >
      <rect width="200" height="200" fill="#000" filter="url(#noise)" opacity="0.05" />
      {POLYGON_PATTERNS.map(({ points, gradientIndex }) => (
        <polygon key={points} points={points} fill={`url(#gradient${gradientIndex})`} />
      ))}
    </pattern>
    {COLORS.map((color, index) => (
      <linearGradient
        key={color}
        id={`gradient${index + 1}`}
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" style={createGradientStop(color, 0.8)} />
        <stop offset="100%" style={createGradientStop(color, 0.6)} />
      </linearGradient>
    ))}
  </defs>
));

GradientPatterns.displayName = 'GradientPatterns';

// Update ThesisBackground to use inline animation
export const ThesisBackground = memo(() => (
  <div className="relative h-screen w-full overflow-hidden">
    <AnimationKeyframes />
    <svg
      className="absolute inset-0 w-full h-full overflow-hidden"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <GradientPatterns />
      <rect
        width="400%"
        height="400%"
        fill="url(#stainedGlass)"
        style={animationStyle}
        x="-100%"
        y="-100%"
      />
      <rect width="100%" height="100%" fill="rgba(0, 0, 0, 0.05)" />
    </svg>
    <div className="absolute inset-0 flex flex-col justify-center items-center p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-sm uppercase tracking-wider mb-2 text-accent">Thesis</h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-shadow-subtle text-white">
          The world needs permissionless markets
        </h1>
        <p className="text-lg text-white/80">and blockchains put everyone on the same page.</p>
      </div>
    </div>
  </div>
));

ThesisBackground.displayName = 'ThesisBackground';
