'use client';

import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import BackgroundSVG2 from './components/BackgroundSVG2';
import Newsletter from './components/Newsletter';
import Footer from '../components/Footer';

export default function Home() {
  const [theme, setTheme] = useState('theme-light');

  return (
    <main
      className={`flex flex-col w-auto min-h-screen overflow-x-hidden font-mono ${theme}`}
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <Navigation setTheme={setTheme} />
      <Hero />
      <About />
      <section className="relative h-[100vh] w-full">
        <BackgroundSVG2 />
      </section>
      <Newsletter />
      <Footer />
    </main>
  );
}
