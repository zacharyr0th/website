'use client';

import React from 'react';
import type { ContentItem } from '@/lib/types';

// add search bar

interface HeroSectionProps {
  initialContent: ContentItem[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ initialContent }) => {
  return (
    <section className="bg-inherit text-white py-4 pt-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Writing</h1>
        <p className="text-xl mb-10 max-w-3xl mx-auto text-center text-gray-300">
          Articles, reviews, and interviews on tech, finance, and more.
        </p>
      </div>
      <hr className="mt-12 border-t border-gray-700 w-full pb-4 max-w-4xl mx-auto" />
    </section>
  );
};

export default HeroSection;
