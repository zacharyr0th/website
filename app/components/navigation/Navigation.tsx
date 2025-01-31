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

const NavLink = memo(({ label, href, active }: NavItem & { active: boolean }) => (
  <li className={active ? 'max-sm:hidden' : ''}>
    <Link href={href}>
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
  }) => (
    <div className="flex w-screen px-8 max-sm:px-4 items-center justify-between max-sm:justify-center">
      <div className="max-sm:hidden">
        {showHomeButton && pathname !== '/' && (
          <BlurBackground className="w-10 h-10 p-0">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <NavButton active={pathname === '/'} className="w-full h-full flex items-center justify-center p-0">
                <span className="uppercase text-2xl">z</span>
              </NavButton>
            </Link>
          </BlurBackground>
        )}
      </div>
      <BlurBackground>
        <ul className="flex items-center space-x-4 max-sm:space-x-2 px-2">
          {showHomeButton && pathname !== '/' && (
            <li className="sm:hidden">
              <BlurBackground className="w-10 h-10 p-0">
                <Link href="/" style={{ textDecoration: 'none' }}>
                  <NavButton active={pathname === '/'} className="w-full h-full flex items-center justify-center p-0">
                    <span className="uppercase text-2xl">z</span>
                  </NavButton>
                </Link>
              </BlurBackground>
            </li>
          )}
          {navItems.map((item) => (
            <NavLink key={item.label} {...item} active={pathname === item.href} />
          ))}
          <li className="flex items-center">
            <div className="px-2 max-sm:px-1">{themeButton}</div>
          </li>
        </ul>
      </BlurBackground>
    </div>
  )
);
NavContent.displayName = 'NavContent';

function Navigation({ showHomeButton = false, themeButton }: NavigationProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <nav className="fixed top-0 right-0 left-0 mt-8 z-50 max-sm:mt-4">
        <div className="opacity-0">Loading...</div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 right-0 left-0 mt-8 z-50 max-sm:mt-4">
      <NavContent pathname={pathname} themeButton={themeButton} showHomeButton={showHomeButton} />
    </nav>
  );
}

Navigation.displayName = 'Navigation';

export default memo(Navigation);
