'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { NavItem } from '@/lib/types';
import { navItems, NavButton } from '@/lib/constants';
import BlurBackground from './BlurBackground';

interface NavigationProps {
  showHomeButton?: boolean;
  themeButton?: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({ showHomeButton = false, themeButton }) => {
  const pathname = usePathname();

  const renderNavItem = useCallback(
    ({ label, href }: NavItem) => (
      <li key={label} className={pathname === href && pathname !== '/' ? 'max-sm:hidden' : ''}>
        <Link href={href}>
          <NavButton variant="secondary" active={pathname === href}>
            {label}
          </NavButton>
        </Link>
      </li>
    ),
    [pathname]
  );

  return (
    <nav className={`fixed top-0 right-0 left-0 mx-8 mt-8 mb-32 z-50 flex items-center ${pathname === '/' ? 'justify-end' : 'justify-between'} max-sm:mx-4 max-sm:mt-4 max-sm:mb-24`}>
      {/* Left side - Z button */}
      {showHomeButton && pathname !== '/' && (
        <BlurBackground>
          <div className="px-2 max-sm:px-1">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <NavButton variant="secondary" active={pathname === '/'}>
                Z
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
            <div className="px-2 max-sm:px-1">
              {themeButton}
            </div>
          </li>
        </ul>
      </BlurBackground>
    </nav>
  );
};

export default Navigation;
