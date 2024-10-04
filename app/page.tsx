'use client';

import React, { useState } from 'react';
import Navigation from './components/common/Navigation';
import Hero from './components/page-home/Hero';
import Learning from './components/page-home/Learning';
import BackgroundSVG2 from './components/page-home/BackgroundSVG2';
import Newsletter from './components/page-home/Newsletter';
import Footer from './components/common/Footer';

export default function Home() {
  const [theme, setTheme] = useState('theme-light');

  return (
    <main
      className={`flex flex-col w-auto full-height overflow-x-hidden font-mono ${theme}`}
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <Navigation setTheme={setTheme} />
      <Hero />
      <Learning />
      <section className="relative h-[100vh] w-full">
        <BackgroundSVG2 />
      </section>
      <Newsletter />
      <Footer />
    </main>
  );
}
