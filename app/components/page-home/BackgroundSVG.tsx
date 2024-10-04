import React from 'react';

const BackgroundSVG: React.FC = () => {
  return (
    <>
      <style jsx>{`
        @keyframes backgroundMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(-750%, -750%);
          }
        }
        .animate-background-move {
          animation: backgroundMove 300s linear infinite;
        }
      `}</style>
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0.1" />
          </filter>
          <pattern id="stainedGlass" width="200" height="200" patternUnits="userSpaceOnUse">
            <rect width="200" height="200" fill="#000" filter="url(#noise)" opacity="0.05" />
            <polygon points="0,0 100,0 150,100 50,100" fill="url(#gradient1)" />
            <polygon points="100,0 200,0 200,100 150,100" fill="url(#gradient2)" />
            <polygon points="0,100 50,100 100,200 0,200" fill="url(#gradient3)" />
            <polygon points="50,100 150,100 200,200 100,200" fill="url(#gradient4)" />
          </pattern>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'var(--color-primary)', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: 'var(--color-primary)', stopOpacity: 0.6 }} />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'var(--color-secondary)', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: 'var(--color-secondary)', stopOpacity: 0.6 }} />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'var(--color-accent)', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: 'var(--color-accent)', stopOpacity: 0.6 }} />
          </linearGradient>
          <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'var(--color-surface)', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: 'var(--color-surface)', stopOpacity: 0.6 }} />
          </linearGradient>
        </defs>
        <rect
          width="1600%"
          height="1600%"
          fill="url(#stainedGlass)"
          className="animate-background-move"
        />
      </svg>
    </>
  );
};

export default BackgroundSVG;
