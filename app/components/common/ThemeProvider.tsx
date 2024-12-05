'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Navigation from './Navigation';
import { Theme } from '@/lib/types';
import { THEME_ICONS } from '@/lib/constants';

type ThemeButtonProps = {
  currentTheme: Theme;
  onClick: () => void;
};

interface ThemedComponentProps {
  theme?: Theme;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const ThemeButton = ({ currentTheme, onClick }: ThemeButtonProps) => (
  <button
    onClick={onClick}
    className="btn btn-primary text-2xl flex items-center justify-center rounded-full font-mono"
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

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((newTheme: Theme) => {
    document.body.className = `theme-${newTheme}`;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }, []);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'dark';
    applyTheme(savedTheme);
  }, [applyTheme]);

  const cycleTheme = useCallback(() => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  }, [theme, applyTheme]);

  const themeButton = <ThemeButton currentTheme={theme} onClick={cycleTheme} />;

  // Only clone elements after component is mounted to avoid hydration issues
  const childrenWithTheme = React.Children.map(children, (child) => {
    if (!mounted) return child;
    
    if (React.isValidElement(child)) {
      const type = child.type;
      // Check if it's a function component and cast it to access displayName
      const isClientComponent = 
        typeof type === 'function' && 
        // Use type assertion to safely check displayName
        ((type as { displayName?: string }).displayName?.startsWith('Client') || 
         type.toString().includes('use client'));
      
      if (isClientComponent) {
        return React.cloneElement(child as React.ReactElement<ThemedComponentProps>, { theme });
      }
    }
    return child;
  });

  // Only render children after mounting to avoid hydration issues
  if (!mounted) {
    return (
      <>
        <Navigation showHomeButton themeButton={themeButton} />
        {children}
      </>
    );
  }

  return (
    <>
      <Navigation showHomeButton themeButton={themeButton} />
      {childrenWithTheme}
    </>
  );
}
