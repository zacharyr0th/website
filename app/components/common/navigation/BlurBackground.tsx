'use client';

import { useEffect, useState, useRef } from 'react';
import { CSSProperties } from 'react';

interface BlurBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const BlurBackground: React.FC<BlurBackgroundProps> = ({ children, className = '' }) => {
  const [scrollY, setScrollY] = useState(0);
  const [hasBackground, setHasBackground] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const elementsUnderneath = document.elementsFromPoint(
          rect.x + rect.width / 2,
          rect.y + rect.height + 1
        );
        setHasBackground(elementsUnderneath.length > 2); // More than just body and our element
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const blurValue = Math.min(scrollY / 100, 1) * (hasBackground ? 1 : 0);
  const backgroundStyle: CSSProperties = {
    backgroundColor: `rgb(var(--background) / ${Math.min(0.8 * blurValue, 0.8)})`,
    backdropFilter: `blur(${blurValue * 8}px)`,
    WebkitBackdropFilter: `blur(${blurValue * 8}px)`,
    position: 'relative',
    zIndex: 1,
  };

  return (
    <div
      ref={elementRef}
      className={`rounded-3xl px-4 py-3 max-sm:px-3 ${className}`}
      style={backgroundStyle}
    >
      {children}
    </div>
  );
};

export default BlurBackground;
