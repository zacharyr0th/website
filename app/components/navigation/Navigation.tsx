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
      <NavButton active={active}>
        {label}
      </NavButton>
    </Link>
  </li>
));
NavLink.displayName = 'NavLink';

const NavContent = memo(({ pathname, themeButton, showHomeButton }: { pathname: string; themeButton?: React.ReactNode; showHomeButton?: boolean }) => (
  <div className="flex w-full justify-between max-sm:justify-center">
    {showHomeButton && pathname !== '/' && (
      <div className="max-sm:hidden">
        <BlurBackground>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <NavButton active={pathname === '/'}>
              <span className="uppercase text-2xl">z</span>
            </NavButton>
          </Link>
        </BlurBackground>
      </div>
    )}
    {(!showHomeButton || pathname === '/') && <div className="max-sm:hidden" />}
    <BlurBackground>
      <ul className="flex items-center space-x-4 max-sm:space-x-2 px-2">
        {showHomeButton && pathname !== '/' && (
          <li className="sm:hidden">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <NavButton active={pathname === '/'}>
                <span className="uppercase text-2xl">z</span>
              </NavButton>
            </Link>
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
));
NavContent.displayName = 'NavContent';

function Navigation({ showHomeButton = false, themeButton }: NavigationProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <nav className="fixed top-0 right-0 left-0 mx-8 mt-8 mb-32 z-50 flex items-center justify-end max-sm:mx-4 max-sm:mt-4 max-sm:mb-24">
        <div className="opacity-0">Loading...</div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 right-0 left-0 mx-8 mt-8 mb-32 z-50 flex items-center justify-between max-sm:justify-center max-sm:mx-4 max-sm:mt-4 max-sm:mb-24">
      <NavContent pathname={pathname} themeButton={themeButton} showHomeButton={showHomeButton} />
    </nav>
  );
}

Navigation.displayName = 'Navigation';

export default memo(Navigation);
