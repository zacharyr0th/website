import React, { useState, useEffect, useCallback } from 'react';
import { FaSun, FaMoon, FaUmbrellaBeach, FaAdjust } from 'react-icons/fa';

const THEMES = ['light', 'dark', 'sepia', 'high-contrast'] as const;
type Theme = (typeof THEMES)[number];

const THEME_ICONS: Record<Theme, React.ReactElement> = {
  light: <FaSun />,
  dark: <FaMoon />,
  sepia: <FaUmbrellaBeach />,
  'high-contrast': <FaAdjust />,
};

interface ThemeSelectorProps {
  setTheme: (theme: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ setTheme }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');

  const applyTheme = useCallback(
    (newTheme: Theme) => {
      document.body.className = `theme-${newTheme}`;
      setTheme(`theme-${newTheme}`);
      localStorage.setItem('theme', newTheme);
    },
    [setTheme]
  );

  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'light';
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, [applyTheme]);

  const cycleTheme = useCallback(() => {
    const currentIndex = THEMES.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    const nextTheme = THEMES[nextIndex];
    setCurrentTheme(nextTheme);
    applyTheme(nextTheme);
  }, [currentTheme, applyTheme]);

  return (
    <button
      onClick={cycleTheme}
      className="btn btn-primary text-2xl flex items-center justify-center rounded-full"
      style={{
        backgroundColor: 'var(--color-primary)',
        color: ['dark', 'high-contrast'].includes(currentTheme) ? 'var(--color-light)' : 'var(--color-background)',
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
