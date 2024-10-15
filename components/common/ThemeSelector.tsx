import React, { useState, useCallback, useEffect } from 'react';
import { THEME_ICONS, THEMES } from '@/lib/constants';
import { Theme } from '@/lib/types';

type ThemeSelectorProps = {
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ setTheme }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark');

  const applyTheme = useCallback(
    (newTheme: Theme) => {
      document.body.className = `theme-${newTheme}`;
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    },
    [setTheme]
  );

  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'dark';
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, [applyTheme]);

  const cycleTheme = useCallback(() => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(nextTheme);
    applyTheme(nextTheme);
  }, [currentTheme, applyTheme]);

  return (
    <button
      onClick={cycleTheme}
      className="btn btn-primary text-2xl flex items-center justify-center rounded-full"
      style={{
        backgroundColor: 'var(--color-primary)',
        color: currentTheme === 'dark' ? 'var(--color-light)' : 'var(--color-background)',
        padding: 'var(--spacing-sm)',
        borderRadius: 'var(--border-radius-lg)',
        boxShadow: 'var(--box-shadow)',
        transition: 'all var(--transition-speed) ease-in-out',
      }}
      aria-label={`Current theme: ${currentTheme}. Click to change theme.`}
    >
      {THEME_ICONS[currentTheme]}
    </button>
  );
};

export default ThemeSelector;
