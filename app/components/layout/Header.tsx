'use client';

/**
 * Header component that includes navigation and blur background functionality
 * This file combines the previous Navigation.tsx and BlurBackground.tsx components
 */

import React, { memo, useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { CSSProperties } from 'react';
import { Button } from '@/components/misc';

// Navigation types and constants
export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly icon?: string;
  readonly description?: string;
}

export interface NavConfig {
  readonly main: ReadonlyArray<NavItem>;
}

export const navConfig: NavConfig = {
  main: [
    {
      label: 'Projects',
      href: '/projects',
      description: 'View my projects and work',
    },
    {
      label: 'Writing',
      href: '/writing',
      description: 'Read my articles and thoughts',
    },
    {
      label: 'Audio',
      href: '/audio',
      description: 'Listen to my audio content',
    },
  ],
} as const;

export const navItems = navConfig.main;

// BlurBackground Component
export interface BlurBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
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

export const BlurBackground: React.FC<BlurBackgroundProps> = memo(
  ({ children, className = '', intensity = 0.3, ...props }) => {
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
      return (
        <div data-testid="blur-background" className={sharedClassName} {...props}>
          {children}
        </div>
      );
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
  }
);

BlurBackground.displayName = 'BlurBackground';

// Navigation Components
export interface NavigationProps {
  showHomeButton?: boolean;
}

export const HomeButton = memo(({ active }: { active: boolean }) => (
  <div
    className="w-10 h-10 p-0 transition-transform duration-300 ease-out hover:scale-105"
    role="none"
  >
    <Link href="/" style={{ textDecoration: 'none' }} aria-label="Go to home page">
      <Button active={active} className="w-full h-full flex items-center justify-center p-0">
        <span
          className="uppercase text-3xl transform-gpu transition-opacity duration-300"
          aria-hidden="true"
        >
          z
        </span>
      </Button>
    </Link>
  </div>
));
HomeButton.displayName = 'HomeButton';

export const NavLink = memo(
  ({ label, href, active, description }: NavItem & { active: boolean }) => (
    <li
      className={`${active ? 'max-sm:hidden' : ''} transition-transform duration-300 ease-out hover:scale-105`}
      role="none"
    >
      <Link
        href={href}
        aria-current={active ? 'page' : undefined}
        className="focus:outline-none focus:ring-2 focus:ring-primary group"
        aria-label={description}
      >
        <Button active={active}>
          <span className="transform-gpu transition-all duration-300 group-hover:text-primary">
            {label}
          </span>
        </Button>
      </Link>
    </li>
  )
);
NavLink.displayName = 'NavLink';

export interface NavContentProps {
  pathname: string;
  showHomeButton: boolean;
}

export const NavContent = memo(({ pathname, showHomeButton }: NavContentProps) => {
  const isHome = pathname === '/';

  return (
    <div className="flex w-full max-w-8xl mx-auto px-10 max-sm:px-4 items-center sm:justify-between max-sm:justify-center">
      <div className="hidden sm:block">
        {showHomeButton && !isHome && <HomeButton active={false} />}
      </div>
      <nav
        aria-label="Main navigation"
        className="rounded-3xl flex items-center justify-center text-center py-1.5 transition-all duration-300 ease-out"
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6px 0',
        }}
      >
        <BlurBackground intensity={0.4}>
          <ul
            aria-label="Main menu"
            className="flex items-center space-x-4 max-sm:space-x-2 px-2"
            role="menubar"
          >
            {showHomeButton && !isHome && (
              <li
                className="sm:hidden transition-transform duration-300 ease-out hover:scale-105"
                role="none"
              >
                <HomeButton active={false} />
              </li>
            )}
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} active={pathname === item.href} />
            ))}
          </ul>
        </BlurBackground>
      </nav>
    </div>
  );
});
NavContent.displayName = 'NavContent';

const Header = memo(({ showHomeButton = false }: NavigationProps) => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(true);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const isScrollingUpNow = currentScrollY <= lastScrollY;

    setIsVisible(isScrollingUpNow || currentScrollY < 50);
    setIsScrollingUp(isScrollingUpNow);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <header
      className={`fixed top-0 right-0 left-0 mt-8 z-50 max-sm:mt-4 h-16 transform-gpu transition-all duration-300 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        ${isScrollingUp ? 'scale-100' : 'scale-98'}`}
    >
      <NavContent pathname={pathname} showHomeButton={showHomeButton} />
    </header>
  );
});
Header.displayName = 'Header';

export default Header;
