'use client';

import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

const GRADIENT_COLORS = ['primary', 'secondary', 'accent'] as const;

const GRADIENT_STOPS = [
  { offset: '0%', opacity: 0.05 },
  { offset: '100%', opacity: 0.02 },
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
    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
    <feColorMatrix type="saturate" values="0.05" />
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
    <motion.rect 
      width="100%" 
      height="100%" 
      fill="url(#bioGradient1)"
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.rect 
      width="100%" 
      height="100%" 
      fill="url(#bioGradient2)" 
      transform="rotate(60)"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }}
    />
    <motion.rect 
      width="100%" 
      height="100%" 
      fill="url(#bioGradient3)" 
      transform="rotate(-60)"
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }}
    />
    <motion.rect 
      width="100%" 
      height="100%" 
      filter="url(#bioNoise)" 
      opacity="0.4"
      animate={{
        opacity: [0.3, 0.4, 0.3]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  </motion.svg>
));

Background.displayName = 'Background';

export default Background; 