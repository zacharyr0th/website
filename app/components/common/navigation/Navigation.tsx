'use client';

import React, { useCallback, memo, useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from './constants';
import { NavButton } from '@/components/common/buttons/NavButton';
import BlurBackground from './BlurBackground';

interface NavigationProps {
  showHomeButton?: boolean;
  themeButton?: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Projects', href: '/projects' },
  { label: 'Writing', href: '/writing' },
  { label: 'Audio', href: '/audio' },
];

const NavLink = memo(({ label, href, active }: NavItem & { active: boolean }) => (
  <li className={active && href !== '/' ? 'max-sm:hidden' : ''}>
    <Link href={href}>
      <NavButton variant="default" active={active}>
        {label}
      </NavButton>
    </Link>
  </li>
));
NavLink.displayName = 'NavLink';

function Navigation({ showHomeButton = false, themeButton }: NavigationProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  const renderNavItem = useCallback(
    (item: NavItem) => <NavLink key={item.label} {...item} active={pathname === item.href} />,
    [pathname]
  );

  if (!mounted) {
    return null;
  }

  const isHomePage = pathname === '/';

  return (
    <nav
      className={`fixed top-0 right-0 left-0 mx-8 mt-8 mb-32 z-50 flex items-center ${
        isHomePage ? 'justify-end' : 'justify-between'
      } max-sm:mx-4 max-sm:mt-4 max-sm:mb-24`}
    >
      {/* Left side - Z button */}
      {showHomeButton && !isHomePage && (
        <BlurBackground>
          <div className="px-2 max-sm:px-1">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <NavButton variant="default" active={isHomePage}>
                <span className="text-3xl">Z</span>
              </NavButton>
            </Link>
          </div>
        </BlurBackground>
      )}

      {/* Right side - nav items and theme button */}
      <BlurBackground className="flex items-center space-x-4 text-base transition-all duration-200">
        <ul className="flex items-center space-x-4 max-sm:space-x-2">
          {navItems.map(renderNavItem)}
          <li>
            <div className="px-2 max-sm:px-1">{themeButton}</div>
          </li>
        </ul>
      </BlurBackground>
    </nav>
  );
}

Navigation.displayName = 'Navigation';

export default memo(Navigation);
