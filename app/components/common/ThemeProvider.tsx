'use client';

import { useState } from 'react';
import Navigation from './Navigation';
import { Theme } from '@/lib/types';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [, setTheme] = useState<Theme>('light');

  return (
    <>
      <Navigation setTheme={setTheme} showHomeButton={true} />
      {children}
    </>
  );
}
