'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from '@/app/lib/types/types';
import { navItems } from './constants';
import BlurBackground from './BlurBackground';
import { Button } from '../Button';

interface NavigationProps {
  showHomeButton?: boolean;
  themeButton?: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({ showHomeButton, themeButton }) => {
  const pathname = usePathname();

  const renderNavItem = useCallback(
    ({ label, href }: NavItem) => (
      <li key={label}>
        <Link href={href} className="no-underline">
          <Button variant="secondary" active={pathname === href} size="sm">
            {label}
          </Button>
        </Link>
      </li>
    ),
    [pathname]
  );

  return (
    <div className="fixed top-0 left-0 right-0 mx-8 mt-8 mb-32 z-50 max-sm:mx-4 max-sm:mt-4 max-sm:mb-24">
      <div className="relative flex justify-between items-center">
        {/* Left side - Z button */}
        {showHomeButton && (
          <BlurBackground>
            <div className="px-2 max-sm:px-1">
              <Link href="/" className="no-underline">
                <Button variant="secondary" size="sm">
                  Z
                </Button>
              </Link>
            </div>
          </BlurBackground>
        )}

        {/* Right side - Main navigation */}
        <div className="ml-auto">
          <BlurBackground className="flex items-center space-x-4 text-base transition-all duration-200">
            <ul className="flex items-center space-x-4 max-sm:space-x-2">
              {navItems.map(renderNavItem)}
              <li>
                <div className="px-2 max-sm:px-1">{themeButton}</div>
              </li>
            </ul>
          </BlurBackground>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
