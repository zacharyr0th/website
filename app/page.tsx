'use client';

import React from 'react';
import Hero from './components/home/Hero';
import { Main } from './components/home/Main';
import { ThesisBackground } from './components/home/ThesisBackground';
import { Newsletter } from './components/home/Newsletter';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col w-full overflow-x-hidden font-mono">
      <Hero />
      <Main />
      <section className="relative w-full">
        <ThesisBackground />
      </section>
      <Newsletter />
    </main>
  );
}
