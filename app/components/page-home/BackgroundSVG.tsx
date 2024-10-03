import React, { useEffect, useState } from 'react';

const BackgroundSVG: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="stainedGlass" width="200" height="200" patternUnits="userSpaceOnUse">
          <polygon points="0,0 100,0 150,100 50,100" fill="var(--color-primary)" opacity="0.7" />
          <polygon
            points="100,0 200,0 200,100 150,100"
            fill="var(--color-secondary)"
            opacity="0.7"
          />
          <polygon points="0,100 50,100 100,200 0,200" fill="var(--color-accent)" opacity="0.7" />
          <polygon
            points="50,100 150,100 200,200 100,200"
            fill="var(--color-surface)"
            opacity="0.7"
          />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#stainedGlass)"
        style={{
          transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.1}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      />
    </svg>
  );
};

export default BackgroundSVG;
