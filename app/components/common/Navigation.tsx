'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationProps, NavItem } from '@/lib/types';
import { navItems, NavButton } from '@/lib/constants';
import ThemeSelector from './ThemeSelector';

const Navigation: React.FC<NavigationProps> = ({ setTheme, showHomeButton = false }) => {
  const pathname = usePathname();

  return (
    <>
      {showHomeButton && (
        <Link href="/" className="fixed top-0 left-0 m-6 z-10">
          <NavButton variant="secondary">Z</NavButton>
        </Link>
      )}
      <nav className="fixed top-0 right-0 m-8 z-10">
        <ul className="flex items-center space-x-2 text-sm">
          {navItems.map(({ label, href }: NavItem) => (
            <li key={label}>
              <Link href={href}>
                <NavButton variant="secondary" active={pathname === href}>
                  {label}
                </NavButton>
              </Link>
            </li>
          ))}
          <li>
            <ThemeSelector setTheme={(theme) => setTheme(theme)} />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
