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
      <li key={label}>
        <Link href={href}>
          <NavButton variant="secondary" active={pathname === href}>
            {label}
          </NavButton>
        </Link>
      </li>
    ),
    [pathname]
  );

  const scrolledClass = isScrolled ? 'backdrop-blur-lg' : '';

  return (
    <nav className="fixed top-0 right-0 left-0 m-8 z-10 flex items-center justify-between">
      {pathname !== '/' && (
        <div
          className="flex items-center justify-center rounded-full"
          style={{ width: '40px', height: '40px', margin: '0 20px' }}
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-white)',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
              }}
            >
              Z
            </div>
          </Link>
        </div>
      )}
      <div className="flex-grow" />
      <div
        className={`flex items-center space-x-3 text-base transition-all duration-200 ${scrolledClass} rounded-xl`}
        style={{ padding: '0 10px', backgroundColor: 'transparent' }}
      >
        <ul className="flex items-center space-x-3">
          {navItems.map(renderNavItem)}
          <li>
            <div className="p-2">
              <ThemeSelector setTheme={setTheme} />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
