'use client';

import React, { memo, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from './constants';
import { navItems } from './constants';
import { NavButton } from '../buttons';
import BlurBackground from './BlurBackground';

interface NavigationProps {
  showHomeButton?: boolean;
}

const HomeButton = memo(({ active }: { active: boolean }) => (
  <div
    className="w-10 h-10 p-0 transition-transform duration-300 ease-out hover:scale-105"
    role="none"
  >
    <Link href="/" style={{ textDecoration: 'none' }} aria-label="Go to home page">
      <NavButton active={active} className="w-full h-full flex items-center justify-center p-0">
        <span
          className="uppercase text-3xl transform-gpu transition-opacity duration-300"
          aria-hidden="true"
        >
          z
        </span>
      </NavButton>
    </Link>
  </div>
));
HomeButton.displayName = 'HomeButton';

const NavLink = memo(({ label, href, active, description }: NavItem & { active: boolean }) => (
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
      <NavButton active={active}>
        <span className="transform-gpu transition-all duration-300 group-hover:text-primary">
          {label}
        </span>
      </NavButton>
    </Link>
  </li>
));
NavLink.displayName = 'NavLink';

interface NavContentProps {
  pathname: string;
  showHomeButton: boolean;
}

const NavContent = memo(({ pathname, showHomeButton }: NavContentProps) => {
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

const Navigation = memo(({ showHomeButton = false }: NavigationProps) => {
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
    <nav
      className={`fixed top-0 right-0 left-0 mt-8 z-50 max-sm:mt-4 h-16 transform-gpu transition-all duration-300 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        ${isScrollingUp ? 'scale-100' : 'scale-98'}`}
    >
      <NavContent pathname={pathname} showHomeButton={showHomeButton} />
    </nav>
  );
});
Navigation.displayName = 'Navigation';

export default Navigation;
