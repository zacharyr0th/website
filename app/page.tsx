'use client';

import React from 'react';
import Hero from './components/page-home/Hero';
import Main from './components/page-home/Main';
import BackgroundSVG2 from './components/page-home/ThesisBackground';
import Newsletter from './components/page-home/Newsletter';
import Footer from './components/common/Footer';

export default function Home() {
  return (
    <main className="flex flex-col w-auto full-height overflow-x-hidden font-mono">
      <Hero />
      <Main />
      <section className="relative w-full">
        <BackgroundSVG2 />
      </section>
      <Newsletter />
      <Footer />
    </main>
  );
}
