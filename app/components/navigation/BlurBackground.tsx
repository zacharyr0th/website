'use client';

import { useEffect, useState, useRef, useCallback, memo } from 'react';
import type { CSSProperties } from 'react';

interface BlurBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

const defaultStyle: CSSProperties = {
  position: 'relative',
  zIndex: 1,
  minHeight: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
};

const BlurBackground: React.FC<BlurBackgroundProps> = memo(({ 
  children, 
  className = '', 
  intensity = 0.3,
  ...props 
}) => {
  const [state, setState] = useState({
    hasBackground: false,
    blurIntensity: 0,
    mounted: false,
  });
  const elementRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const checkBackground = useCallback(() => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const elementsUnderneath = document.elementsFromPoint(
      rect.x + rect.width / 2,
      rect.y + rect.height / 2
    );

    const relevantElements = elementsUnderneath.filter(
      (el) => !elementRef.current?.contains(el) && el !== elementRef.current
    );

    setState((prev) => {
      const hasBackground = relevantElements.length > 1;
      const targetIntensity = hasBackground ? intensity : 0;
      
      if (prev.hasBackground === hasBackground && prev.blurIntensity === targetIntensity) {
        return prev;
      }

      return {
        ...prev,
        hasBackground,
        blurIntensity: targetIntensity,
      };
    });
  }, [intensity]);

  useEffect(() => {
    setState((prev) => ({ ...prev, mounted: true }));
    
    observerRef.current = new MutationObserver(checkBackground);
    resizeObserverRef.current = new ResizeObserver(checkBackground);

    if (elementRef.current) {
      observerRef.current.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      });
      resizeObserverRef.current.observe(elementRef.current);
      
      // Initial check after a short delay to ensure proper mounting
      requestAnimationFrame(() => {
        checkBackground();
      });
    }

    return () => {
      observerRef.current?.disconnect();
      resizeObserverRef.current?.disconnect();
    };
  }, [checkBackground]);

  const sharedClassName = `rounded-3xl flex items-center justify-center text-center ${className}`;

  if (!state.mounted) {
    return <div data-testid="blur-background" className={sharedClassName} {...props}>{children}</div>;
  }

  const backgroundStyle: CSSProperties = {
    ...defaultStyle,
    backgroundColor: `rgb(var(--background) / ${state.hasBackground ? 0.95 : 0.1})`,
    backdropFilter: `blur(${state.hasBackground ? state.blurIntensity * 12 : 4}px)`,
    WebkitBackdropFilter: `blur(${state.hasBackground ? state.blurIntensity * 12 : 4}px)`,
    color: state.hasBackground ? 'var(--color-text-primary)' : 'inherit',
    aspectRatio: className?.includes('w-10 h-10') ? '1 / 1' : 'auto',
    padding: className?.includes('p-0') ? '0' : '6px 0',
  };

  return (
    <div 
      ref={elementRef} 
      data-testid="blur-background"
      className={`${sharedClassName} transform-gpu`} 
      style={backgroundStyle} 
      {...props}
    >
      {children}
    </div>
  );
});

BlurBackground.displayName = 'BlurBackground';

export default BlurBackground;
