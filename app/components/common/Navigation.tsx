'use client';

import React from 'react';
import Link from 'next/link';
import { NavigationProps, navItems } from '@/lib/types';
import ThemeSelector from './ThemeSelector';
import { usePathname } from 'next/navigation';

const Navigation: React.FC<NavigationProps> = ({ setTheme }) => {
  const pathname = usePathname();
  const showHomeButton = ['/projects', '/writing', '/audio'].includes(pathname);

  return (
    <>
      {showHomeButton && (
        <Link
          href="/"
          className="fixed top-0 left-0 m-6 z-10 px-4 py-2 rounded-full transition-all duration-300 flex items-center justify-center"
          style={{
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text-secondary)',
            boxShadow: 'var(--box-shadow)',
            fontWeight: 600, // This explicitly sets the font weight to semibold
          }}
        >
          Z
        </Link>
      )}
      <nav className="fixed top-0 right-0 m-6 z-10">
        <ul className="flex items-center space-x-2 text-sm">
          {navItems.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={label.toLowerCase() === 'projects' ? '/projects' : href}
                className="px-4 py-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text-secondary)',
                  boxShadow: 'var(--box-shadow)',
                }}
              >
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </Link>
            </li>
          ))}
          <li>
            <ThemeSelector setTheme={setTheme} />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
