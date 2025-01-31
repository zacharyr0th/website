'use client';

import React from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';

export default function BioPage() {
  return (
    <div className="min-h-screen bg-inherit">
      <main className="container mx-auto px-6 sm:px-8 pt-16 sm:pt-36 pb-24 mt-8">
        <div className="mx-auto space-y-8" style={{ maxWidth: 'var(--article-width)' }}>
          <Hero />
          <About />
          <Experience />
          <Skills />
        </div>
      </main>
    </div>
  );
}
