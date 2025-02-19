'use client';

import React from 'react';
import CategoryCard, { type Category } from './CategoryCard';

interface AudioGridProps {
  readonly categories: readonly Category[];
}

export default function AudioGrid({ categories }: AudioGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category, index) => (
        <CategoryCard key={category.slug} category={category} index={index} />
      ))}
    </div>
  );
}
