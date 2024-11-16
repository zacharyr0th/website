'use client';

import React, { useState } from 'react';
import Navigation from '../components/common/Navigation';
import { Theme } from '@/lib/types';

import Hero from '../components/page-projects/Hero';
import Footer from '../components/common/Footer';

export default function ProjectsPage() {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <main className="flex flex-col w-full min-h-screen font-mono">
      <Navigation setTheme={setTheme} />
      <div className="flex-grow px-2 sm:px-6 md:px-8 py-4 sm:py-8">
        <Hero theme={theme} setTheme={setTheme} />
      </div>
      <Footer />
    </main>
  );
}
