'use client';

import React, { memo, useMemo } from 'react';

const backgroundMoveKeyframes = `
  @keyframes backgroundMove {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-50%, -50%);
    }
  }
`;

const animationStyles = {
  animation: 'backgroundMove 30s linear infinite',
  willChange: 'transform',
  transformOrigin: 'center',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
} as const;

// Optimize polygon patterns with better typing and memoization
const POLYGON_DATA = [
  { points: '0,0 100,0 150,100 50,100', gradientId: 'gradient1' },
  { points: '100,0 200,0 200,100 150,100', gradientId: 'gradient2' },
  { points: '0,100 50,100 100,200 0,200', gradientId: 'gradient3' },
  { points: '50,100 150,100 200,200 100,200', gradientId: 'gradient4' },
] as const;

type GradientStop = {
  offset: string;
  opacity: number;
};

const GRADIENT_STOPS: GradientStop[] = [
  { offset: '0%', opacity: 0.8 },
  { offset: '100%', opacity: 0.6 },
];

const GRADIENT_COLORS = ['primary', 'secondary', 'accent', 'surface'] as const;

// Pre-compute SVG attributes
const SVG_ATTRS = {
  className: 'absolute inset-0 w-full h-full overflow-hidden',
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 1000 1000',
  preserveAspectRatio: 'xMidYMid slice',
} as const;

const PATTERN_ATTRS = {
  width: '200',
  height: '200',
  patternUnits: 'userSpaceOnUse',
  patternTransform: 'scale(1.5)',
} as const;

const PolygonPatterns = memo(() => (
  <>
    {POLYGON_DATA.map(({ points, gradientId }) => (
      <polygon key={points} points={points} fill={`url(#${gradientId})`} />
    ))}
  </>
));
PolygonPatterns.displayName = 'PolygonPatterns';

const Gradients = memo(() => {
  const gradients = useMemo(
    () =>
      GRADIENT_COLORS.map((color, index) => (
        <linearGradient
          key={color}
          id={`gradient${index + 1}`}
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          {GRADIENT_STOPS.map(({ offset, opacity }) => (
            <stop
              key={offset}
              offset={offset}
              style={{ stopColor: `var(--color-${color})`, stopOpacity: opacity }}
            />
          ))}
        </linearGradient>
      )),
    []
  );

  return <>{gradients}</>;
});
Gradients.displayName = 'Gradients';

const NoiseFilter = memo(() => (
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
    <feColorMatrix type="saturate" values="0.1" />
  </filter>
));
NoiseFilter.displayName = 'NoiseFilter';

const StainedGlassPattern = memo(() => (
  <pattern id="stainedGlass" {...PATTERN_ATTRS}>
    <rect width="200" height="200" fill="#000" filter="url(#noise)" opacity="0.05" />
    <PolygonPatterns />
  </pattern>
));
StainedGlassPattern.displayName = 'StainedGlassPattern';

const HeroBackground = memo(() => (
  <>
    <style>{backgroundMoveKeyframes}</style>
    <svg {...SVG_ATTRS}>
      <defs>
        <NoiseFilter />
        <StainedGlassPattern />
        <Gradients />
      </defs>

      <rect
        width="400%"
        height="400%"
        fill="url(#stainedGlass)"
        style={animationStyles}
        x="-100%"
        y="-100%"
      />
      <rect width="100%" height="100%" fill="rgba(0, 0, 0, 0.05)" />
    </svg>
  </>
));
HeroBackground.displayName = 'HeroBackground';

export default HeroBackground;
