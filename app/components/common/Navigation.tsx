'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { NavigationProps, NavItem } from '@/lib/types';
import { navItems, NavButton } from '@/lib/constants';
import ThemeSelector from './ThemeSelector';

const Navigation = ({ setTheme }: NavigationProps) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const scrolledClass = isScrolled ? 'bg-background/80 backdrop-blur-lg' : 'bg-transparent';

  return (
    <nav className="fixed top-0 right-0 left-0 m-8 z-50 flex items-center justify-center max-sm:m-4">
      {pathname !== '/' && (
        <div className={`max-sm:absolute max-sm:left-0 rounded-xl ${scrolledClass}`}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <NavButton variant="secondary" active={pathname === '/'}>
              Z
            </NavButton>
          </Link>
        </div>
      )}
      <div className="flex-grow max-sm:hidden" />
      <div
        className={`flex items-center space-x-4 text-base transition-all duration-200 ${scrolledClass} rounded-xl p-2 max-sm:p-3`}
      >
        <ul className="flex items-center space-x-3 max-sm:space-x-1 max-sm:justify-end max-sm:w-full">
          {navItems.map(renderNavItem)}
          <li>
            <div className="p-2 max-sm:p-1">
              <ThemeSelector setTheme={setTheme} />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
