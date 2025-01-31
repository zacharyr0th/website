'use client';

import React, { memo, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from './constants';
import { navItems } from './constants';
import { NavButton } from '../buttons';
import BlurBackground from './BlurBackground';

interface NavigationProps {
  showHomeButton?: boolean;
  themeButton?: React.ReactNode;
}

// Reusable home button component
const HomeButton = memo(({ active }: { active: boolean }) => (
  <BlurBackground className="w-10 h-10 p-0" role="none">
    <Link href="/" style={{ textDecoration: 'none' }} aria-label="Go to home page">
      <NavButton active={active} className="w-full h-full flex items-center justify-center p-0">
        <span className="uppercase text-2xl">z</span>
      </NavButton>
    </Link>
  </BlurBackground>
));
HomeButton.displayName = 'HomeButton';

const NavLink = memo(({ label, href, active }: NavItem & { active: boolean }) => (
  <li className={active ? 'max-sm:hidden' : ''}>
    <Link href={href} aria-current={active ? 'page' : undefined}>
      <NavButton active={active}>{label}</NavButton>
    </Link>
  </li>
));
NavLink.displayName = 'NavLink';

const NavContent = memo(
  ({
    pathname,
    themeButton,
    showHomeButton,
  }: {
    pathname: string | null;
    themeButton?: React.ReactNode;
    showHomeButton?: boolean;
  }) => {
    const isHome = pathname === '/';
    const shouldShowHomeButton = showHomeButton && !isHome;

    return (
      <div className="flex w-screen px-8 max-sm:px-4 items-center justify-between max-sm:justify-center">
        <div className="max-sm:hidden">
          {shouldShowHomeButton && <HomeButton active={isHome} />}
        </div>
        <BlurBackground role="navigation" aria-label="Main navigation">
          <ul className="flex items-center space-x-4 max-sm:space-x-2 px-2" role="menubar">
            {shouldShowHomeButton && (
              <li className="sm:hidden" role="none">
                <HomeButton active={isHome} />
              </li>
            )}
            {navItems.map((item) => (
              <NavLink key={item.label} {...item} active={pathname === item.href} />
            ))}
            <li className="flex items-center" role="none">
              <div className="px-2 max-sm:px-1">{themeButton}</div>
            </li>
          </ul>
        </BlurBackground>
      </div>
    );
  }
);
NavContent.displayName = 'NavContent';

function Navigation({ showHomeButton = false, themeButton }: NavigationProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Use requestAnimationFrame to prevent layout shift
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Early return with placeholder that matches final dimensions
  if (!mounted) {
    return (
      <nav 
        className="fixed top-0 right-0 left-0 mt-8 z-50 max-sm:mt-4 h-16" 
        aria-hidden="true"
        role="presentation"
      >
        <div className="invisible" aria-hidden="true">
          <NavContent pathname={pathname} themeButton={themeButton} showHomeButton={showHomeButton} />
        </div>
      </nav>
    );
  }

  return (
    <nav 
      className="fixed top-0 right-0 left-0 mt-8 z-50 max-sm:mt-4" 
      role="navigation" 
      aria-label="Main navigation"
    >
      <NavContent pathname={pathname} themeButton={themeButton} showHomeButton={showHomeButton} />
    </nav>
  );
}

Navigation.displayName = 'Navigation';

export default memo(Navigation);
