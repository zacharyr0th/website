import React from 'react';
import ThemeSelector from './ThemeSelector';
import { useTranslation } from 'next-i18next';

const navItems = [
  { label: 'projects', href: '#projects' },
  { label: 'writing', href: '#writing' },
  { label: 'audio', href: '#audio' },
];

interface NavigationProps {
  setTheme: (theme: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ setTheme }) => {
  const { t } = useTranslation('common');

  return (
    <nav className="fixed top-0 right-0 m-6 z-10">
      <ul className="flex items-center space-x-2 text-sm">
        {navItems.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="px-4 py-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text-secondary)',
                boxShadow: 'var(--box-shadow)',
              }}
            >
              {t(label)}
            </a>
          </li>
        ))}
        <li>
          <ThemeSelector setTheme={setTheme} />
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
