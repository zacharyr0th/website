import React from 'react';

const BackgroundSVG2: React.FC = () => {
  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute top-0 left-0 right-0 w-full h-[calc(100%-4rem)]"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Background */}
      <rect x="0" y="0" width="100" height="100" fill="var(--color-background)" />

      {/* Abstract geometric pattern */}
      <pattern
        id="geometricPattern"
        x="0"
        y="0"
        width="20"
        height="21"
        patternUnits="userSpaceOnUse"
      >
        <rect x="0" y="0" width="10" height="10" fill="var(--color-primary)" opacity="0.1" />
        <circle cx="15" cy="5" r="2" fill="var(--color-accent)" opacity="0.15" />
        
       
      </pattern>
      <rect width="200" height="100" fill="url(#geometricPattern)">
        <animateTransform
          attributeName="transform"
          type="translate"
          from="0 0"
          to="-100 0"
          dur="30s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
    
  );
};

export default BackgroundSVG2;
