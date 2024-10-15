import React from 'react';

const ThesisBackground: React.FC = () => (
  <div className="relative h-screen w-full overflow-hidden">
    <style jsx>{`
      @keyframes backgroundMove {
        0% {
          transform: translate(0, 0);
        }
        100% {
          transform: translate(-50%, -50%);
        }
      }
      .animate-background-move {
        animation: backgroundMove 300s linear infinite;
      }
      .text-shadow-subtle {
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
      }
    `}</style>
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="stainedGlass" width="200" height="200" patternUnits="userSpaceOnUse">
          <rect width="200" height="200" fill="#000" opacity="0.05" />
          <polygon points="0,0 100,0 150,100 50,100" fill="url(#gradient1)" />
          <polygon points="100,0 200,0 200,100 150,100" fill="url(#gradient2)" />
          <polygon points="0,100 50,100 100,200 0,200" fill="url(#gradient3)" />
          <polygon points="50,100 150,100 200,200 100,200" fill="url(#gradient4)" />
        </pattern>
        {['primary', 'secondary', 'accent', 'surface'].map((color, index) => (
          <linearGradient
            key={color}
            id={`gradient${index + 1}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" style={{ stopColor: `var(--color-${color})`, stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: `var(--color-${color})`, stopOpacity: 0 }} />
          </linearGradient>
        ))}
      </defs>
      <rect
        width="200%"
        height="200%"
        fill="url(#stainedGlass)"
        className="animate-background-move"
      />
      <rect width="100%" height="100%" fill="rgba(0, 0, 0, 0.3)" />
    </svg>
    <div className="absolute inset-0 flex flex-col justify-center items-center p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-sm uppercase tracking-wider mb-2 text-accent">Thesis</h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-shadow-subtle text-text-surface">
          The world needs permissionless markets
        </h1>
        <p className="text-lg text-text-surface">and blockchains put everyone on the same page.</p>
      </div>
    </div>
  </div>
);

export default ThesisBackground;
