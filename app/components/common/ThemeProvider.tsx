'use client';

import React, { useState, useCallback, useEffect, memo } from 'react';
import Navigation from './navigation/Navigation';
import Footer from './Footer';
import type { Theme } from '@/app/lib/types/types';
import { FaSun, FaMoon } from 'react-icons/fa';

type ThemeButtonProps = {
  currentTheme: Theme;
  onClick: () => void;
};

const ThemeButton = memo(({ currentTheme, onClick }: ThemeButtonProps) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center text-2xl hover:opacity-80 transition-opacity duration-300"
    aria-label={`Current theme: ${currentTheme}. Click to toggle theme.`}
  >
    {currentTheme === 'dark' ? <FaMoon /> : <FaSun />}
  </button>
));

ThemeButton.displayName = 'ThemeButton';

const THEME_STORAGE_KEY = 'theme';
const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((newTheme: Theme) => {
    try {
      document.documentElement.setAttribute('data-theme', newTheme);
      document.documentElement.style.colorScheme = newTheme;
      setTheme(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (e) {
      console.warn('Failed to apply theme:', e);
      setTheme(newTheme);
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DARK_SCHEME_QUERY);
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      if (!savedTheme) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [applyTheme]);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      const prefersDark = window.matchMedia(DARK_SCHEME_QUERY).matches;
      const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
      applyTheme(initialTheme);
    } catch (e) {
      console.warn('Failed to initialize theme:', e);
      applyTheme('dark');
    } finally {
      setMounted(true);
    }
  }, [applyTheme]);

  const toggleTheme = useCallback(() => {
    applyTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, applyTheme]);

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation showHomeButton themeButton={<div className="w-8 h-8" />} />
        <main className="flex-1">
          <div style={{ visibility: 'hidden' }}>{children}</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation
        showHomeButton
        themeButton={<ThemeButton currentTheme={theme} onClick={toggleTheme} />}
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
