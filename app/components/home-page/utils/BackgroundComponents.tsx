'use client';

import React, { memo, useMemo } from 'react';
import {
  BACKGROUND_MOVE_KEYFRAMES,
  ANIMATION_STYLES,
  POLYGON_DATA,
  GRADIENT_STOPS,
  GRADIENT_COLORS,
  SVG_ATTRS,
  PATTERN_ATTRS,
} from './background';

export const PolygonPatterns = memo(() => (
  <>
    {POLYGON_DATA.map(({ points, gradientId }) => (
      <polygon key={points} points={points} fill={`url(#${gradientId})`} />
    ))}
  </>
));
PolygonPatterns.displayName = 'PolygonPatterns';

export const Gradients = memo(() => {
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
              style={{ stopColor: `var(--color-${color})`, stopOpacity: opacity * 0.6 }}
            />
          ))}
        </linearGradient>
      )),
    []
  );

  return <>{gradients}</>;
});
Gradients.displayName = 'Gradients';

export const NoiseFilter = memo(() => (
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
    <feColorMatrix type="saturate" values="0.1" />
  </filter>
));
NoiseFilter.displayName = 'NoiseFilter';

export const StainedGlassPattern = memo(() => (
  <pattern id="stainedGlass" {...PATTERN_ATTRS}>
    <rect width="200" height="200" fill="#000" filter="url(#noise)" opacity="0.02" />
    <PolygonPatterns />
  </pattern>
));
StainedGlassPattern.displayName = 'StainedGlassPattern';

interface StainedGlassBackgroundProps {
  className?: string;
}

export const StainedGlassBackground = memo(({ className }: StainedGlassBackgroundProps) => (
  <>
    <style>{BACKGROUND_MOVE_KEYFRAMES}</style>
    <svg {...SVG_ATTRS} className={`${SVG_ATTRS.className} ${className || ''}`}>
      <defs>
        <NoiseFilter />
        <StainedGlassPattern />
        <Gradients />
      </defs>

      <rect
        width="400%"
        height="400%"
        fill="url(#stainedGlass)"
        style={ANIMATION_STYLES}
        x="-100%"
        y="-100%"
      />
      <rect width="100%" height="100%" fill="rgba(0, 0, 0, 0.08)" />
    </svg>
  </>
));
StainedGlassBackground.displayName = 'StainedGlassBackground';

export const HeroBackground = memo(() => <StainedGlassBackground />);
HeroBackground.displayName = 'HeroBackground';

export const ThesisBackground = memo(() => <StainedGlassBackground />);
ThesisBackground.displayName = 'ThesisBackground';
