import React, { memo } from 'react';

// Memoize the polygon patterns since they never change
const PolygonPatterns = memo(() => (
  <>
    <polygon points="0,0 100,0 150,100 50,100" fill="url(#gradient1)" />
    <polygon points="100,0 200,0 200,100 150,100" fill="url(#gradient2)" />
    <polygon points="0,100 50,100 100,200 0,200" fill="url(#gradient3)" />
    <polygon points="50,100 150,100 200,200 100,200" fill="url(#gradient4)" />
  </>
));
PolygonPatterns.displayName = 'PolygonPatterns';

// Memoize the gradients since they never change
const Gradients = memo(() => (
  <>
    {['primary', 'secondary', 'accent', 'surface'].map((color, index) => (
      <linearGradient key={color} id={`gradient${index + 1}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: `var(--color-${color})`, stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: `var(--color-${color})`, stopOpacity: 0.6 }} />
      </linearGradient>
    ))}
  </>
));
Gradients.displayName = 'Gradients';

// Move styles to a constant to prevent recreation
const styles = `
  @keyframes backgroundMove {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-50%, -50%);
    }
  }
  .animate-background-move {
    animation: backgroundMove 30s linear infinite;
    will-change: transform;
    transform-origin: center;
  }
`;

const HeroBackground = memo(() => (
  <>
    <style jsx>{styles}</style>
    <svg
      className="absolute inset-0 w-full h-full overflow-hidden"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0.1" />
        </filter>

        <pattern id="stainedGlass" width="200" height="200" patternUnits="userSpaceOnUse">
          <rect width="200" height="200" fill="#000" filter="url(#noise)" opacity="0.05" />
          <PolygonPatterns />
        </pattern>

        <Gradients />
      </defs>

      <rect
        width="200%"
        height="200%"
        fill="url(#stainedGlass)"
        className="animate-background-move"
        x="0"
        y="0"
      />
      <rect width="100%" height="100%" fill="rgba(0, 0, 0, 0.05)" />
    </svg>
  </>
));
HeroBackground.displayName = 'HeroBackground';

export default HeroBackground;
