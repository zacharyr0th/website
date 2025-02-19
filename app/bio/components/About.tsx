import React from 'react';
import type { BioData } from '../types';

interface AboutProps {
  data: BioData['basics'];
}

export function About({ data }: AboutProps) {
  const paragraphs = data.intro.split('\n\n').map((p) => p.trim());

  return (
    <div className="prose prose-invert prose-xl max-w-none text-text-secondary leading-relaxed space-y-4">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}
