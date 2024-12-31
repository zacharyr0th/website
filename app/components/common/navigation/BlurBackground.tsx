'use client';

import { useEffect, useState, useRef, useMemo, useCallback, CSSProperties } from 'react';
import debounce from 'lodash/debounce';

interface BlurBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const BlurBackground: React.FC<BlurBackgroundProps> = ({ children, className = '' }) => {
  const [blurState, setBlurState] = useState({ scrollY: 0, hasBackground: false });
  const elementRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const elementsUnderneath = document.elementsFromPoint(
        rect.x + rect.width / 2,
        rect.y + rect.height + 1
      );

      setBlurState({
        scrollY: window.scrollY,
        hasBackground: elementsUnderneath.length > 2,
      });
    }
  }, []);

  const debouncedHandleScroll = useMemo(
    () => debounce(handleScroll, 100, { leading: true, maxWait: 200 }),
    [handleScroll]
  );

  useEffect(() => {
    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      debouncedHandleScroll.cancel();
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [debouncedHandleScroll, handleScroll]);

  const blurValue = Math.min(blurState.scrollY / 100, 1) * (blurState.hasBackground ? 1 : 0);

  const backgroundStyle: CSSProperties = useMemo(
    () => ({
      backgroundColor: `rgba(var(--background), ${Math.min(0.8 * blurValue, 0.8)})`,
      backdropFilter: `blur(${blurValue * 8}px)`,
      WebkitBackdropFilter: `blur(${blurValue * 8}px)`,
      position: 'relative',
      zIndex: 1,
      border: '1px solid rgba(var(--background), 0.1)',
    }),
    [blurValue]
  );

  return (
    <div
      ref={elementRef}
      className={`rounded-3xl px-4 py-2.5 max-sm:px-3 ${className}`}
      style={backgroundStyle}
    >
      {children}
    </div>
  );
};

export default BlurBackground;
