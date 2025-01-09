'use client';

import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

const GRADIENT_COLORS = ['primary', 'secondary'] as const;

const GRADIENT_STOPS = [
  { offset: '0%', opacity: 0.08 },
  { offset: '100%', opacity: 0.03 },
] as const;

const SVG_ATTRS = {
  className: 'fixed inset-0 w-full h-full -z-10',
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 1000 1000',
  preserveAspectRatio: 'xMidYMid slice',
} as const;

const Gradients = memo(() => {
  const gradients = useMemo(
    () =>
      GRADIENT_COLORS.map((color, index) => (
        <linearGradient
          key={color}
          id={`bioGradient${index + 1}`}
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
  <filter id="bioNoise">
    <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
    <feColorMatrix type="saturate" values="0.1" />
  </filter>
));

NoiseFilter.displayName = 'NoiseFilter';

const Background = memo(() => (
  <motion.svg
    {...SVG_ATTRS}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <defs>
      <NoiseFilter />
      <Gradients />
    </defs>
    <rect width="100%" height="100%" fill="url(#bioGradient1)" />
    <rect width="100%" height="100%" fill="url(#bioGradient2)" transform="rotate(45)" />
    <rect width="100%" height="100%" filter="url(#bioNoise)" opacity="0.2" />
  </motion.svg>
));

Background.displayName = 'Background';

export default Background;
