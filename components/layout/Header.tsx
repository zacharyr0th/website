'use client';

/**
 * Header component that includes navigation and blur background functionality
 * This file combines the previous Navigation.tsx and BlurBackground.tsx components
 */

import React, { memo, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { CSSProperties } from 'react';
import { Button } from 'components/common';

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
}

export const BlurBackground: React.FC<BlurBackgroundProps> = memo(
  ({ children, className = '', ...props }) => {
    const style: CSSProperties = {
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
    };

    return (
      <div
        data-testid="blur-background"
        className={`${className} transform-gpu`}
        style={style}
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
          className="uppercase text-3xl font-mono transform-gpu transition-opacity duration-300"
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
        className="focus:outline-none group"
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
      <nav aria-label="Main navigation" className="flex items-center justify-center text-center">
        <BlurBackground className="rounded-3xl">
          <ul
            aria-label="Main menu"
            className="flex items-center space-x-4 max-sm:space-x-2 px-4 py-2"
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
