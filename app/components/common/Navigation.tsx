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

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const renderNavItem = useCallback(({ label, href }: NavItem) => (
    <li key={label}>
      <Link href={href}>
        <NavButton 
          variant="secondary" 
          active={pathname === href}
        >
          {label}
        </NavButton>
      </Link>
    </li>
  ), [pathname]);

  const navClassNames = `
    fixed top-0 right-0 m-8 z-10  rounded-xl 
    transition-all duration-200
    ${isScrolled ? 'bg-background/75 backdrop-blur-lg shadow-xl' : ''}
  `.trim();

  return (
    <nav className={navClassNames}>
      <ul className="flex items-center space-x-3 text-base">
        {navItems.map(renderNavItem)}
        <li>
          <ThemeSelector setTheme={setTheme} />
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
