'use client';

import React, { useState } from 'react';
import Navigation from '../components/common/Navigation';
import Hero from '../components/page-home/Hero';
import Main from '../components/page-home/Main';
import BackgroundSVG2 from '../components/page-home/ThesisBackground';
import Newsletter from '../components/page-home/Newsletter';
import Footer from '../components/common/Footer';
import { Theme } from '@/lib/types';

export default function Home() {
  const [theme, setTheme] = useState<Theme>('dark');

  return (
    <main
      className={`flex flex-col w-auto full-height overflow-x-hidden font-mono ${theme}`}
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <Navigation setTheme={setTheme} />
      <Hero />
      <Main />
      <section className="relative h-[100vh] w-full">
        <BackgroundSVG2 />
      </section>
      <Newsletter />
      <Footer />
    </main>
  );
}
