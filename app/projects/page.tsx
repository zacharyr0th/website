'use client';

import React, { useState } from 'react';
import Navigation from '../components/common/Navigation';
import { Theme } from '@/lib/types';

import Hero from '../components/page-projects/Hero';
import Footer from '../components/common/Footer';

export default function ProjectsPage() {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <main
      className={`mt-8 flex flex-col w-auto min-h-screen overflow-x-hidden font-mono ${theme}`}
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <Navigation setTheme={setTheme} />
      <div className="flex-grow px-4 sm:px-6 md:px-8 py-8">
        <Hero theme={theme} setTheme={setTheme} />
      </div>
      <Footer />
    </main>
  );
}
