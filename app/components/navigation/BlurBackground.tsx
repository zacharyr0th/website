'use client';

import { useEffect, useState, useRef } from 'react';
import type { CSSProperties } from 'react';

interface BlurBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const BlurBackground: React.FC<BlurBackgroundProps> = ({ children, className = '', ...props }) => {
  const [hasBackground, setHasBackground] = useState(false);
  const [blurIntensity, setBlurIntensity] = useState(0);
  const [mounted, setMounted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const checkBackground = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const elementsUnderneath = document.elementsFromPoint(
          rect.x + rect.width / 2,
          rect.y + rect.height / 2
        );

        // Filter out our own element and its children
        const relevantElements = elementsUnderneath.filter(
          (el) => !elementRef.current?.contains(el) && el !== elementRef.current
        );

        setHasBackground(relevantElements.length > 1);
        setBlurIntensity(0.3);
      }
    };

    // Create an observer to watch for changes
    const observer = new MutationObserver(checkBackground);
    const resizeObserver = new ResizeObserver(checkBackground);

    if (elementRef.current) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      });
      resizeObserver.observe(elementRef.current);
    }

    checkBackground(); // Initial check

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  const sharedClassName = `rounded-3xl flex items-center justify-center text-center ${className}`;

  if (!mounted) {
    return <div className={sharedClassName} {...props}>{children}</div>;
  }

  const backgroundStyle: CSSProperties = {
    backgroundColor: `rgb(var(--background) / ${hasBackground ? 0.95 : 0.1})`,
    backdropFilter: `blur(${hasBackground ? blurIntensity * 12 : 4}px)`,
    WebkitBackdropFilter: `blur(${hasBackground ? blurIntensity * 12 : 4}px)`,
    position: 'relative',
    zIndex: 1,
    color: hasBackground ? 'var(--color-text-primary)' : 'inherit',
    aspectRatio: className?.includes('w-10 h-10') ? '1 / 1' : 'auto',
  };

  return (
    <div ref={elementRef} className={sharedClassName} style={backgroundStyle} {...props}>
      {children}
    </div>
  );
};

BlurBackground.displayName = 'BlurBackground';

export default BlurBackground;
