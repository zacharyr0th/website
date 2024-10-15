'use client';

import React, { useState } from 'react';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import { Theme } from '@/lib/types';

export default function WritingPortfolioPage() {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <main
      className={`flex flex-col w-auto min-h-screen overflow-x-hidden pt-16 font-mono ${theme}`}
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <Navigation setTheme={setTheme} />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Writing</h1>
        <p className="text-xl mb-8">Actionable Insights</p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Featured Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add your featured writing pieces here */}
            <WritingCard
              title="The Art of Storytelling"
              excerpt="An exploration of narrative techniques..."
            />
            <WritingCard title="Poetry in Motion" excerpt="A collection of verses inspired by..." />
            <WritingCard
              title="Tech Insights"
              excerpt="Analysis of emerging technologies and their impact..."
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-lg">
            I'm a passionate writer with a keen interest in [your interests/specialties]. My work
            spans across various genres and topics, always aiming to engage and inspire readers.
          </p>
        </section>
      </div>
      <Footer />
    </main>
  );
}

function WritingCard({ title, excerpt }: { title: string; excerpt: string }) {
  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{excerpt}</p>
      <a href="#" className="text-blue-500 hover:underline mt-2 inline-block">
        Read more
      </a>
    </div>
  );
}
