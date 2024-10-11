import React from 'react';

const ThesisBackground: React.FC = () => (
  <div className="relative h-full w-full overflow-hidden">
    <style jsx>{`
      @keyframes backgroundMove {
        0% { transform: translate(0, 0); }
        100% { transform: translate(-750%, -750%); }
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
      <rect
        width="1600%"
        height="1600%"
        fill="url(#stainedGlass)"
        className="animate-background-move"
      />
      <rect width="100%" height="100%" fill="rgba(0, 0, 0, 0.3)" />
    </svg>
    <div className="absolute inset-0 flex flex-col justify-center items-center p-8">
      <div className="max-w-4xl w-full">
        <h2
          className="text-sm uppercase tracking-wider mb-2"
          style={{ color: 'var(--color-accent)' }}
        >
          Thesis
        </h2>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-shadow-subtle"
          style={{ color: 'var(--heading-color)' }}
        >
          The world needs permissionless markets
        </h1>
        <p
          className="text-lg"
          style={{ color: 'var(--heading-color)' }}
        >
          and blockchains put everyone on the same page.
        </p>
      </div>
    </div>
  </div>
);

export default ThesisBackground;
