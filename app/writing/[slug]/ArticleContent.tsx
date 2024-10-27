'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navigation from '@/components/common/Navigation';
import { Theme, Article } from '@/lib/types';

interface ArticleContentProps {
  article: Article;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <main className="flex flex-col w-full min-h-screen font-mono">
      <Navigation setTheme={setTheme} />
      <div className="flex-grow container mx-auto px-24 py-24 max-w-6xl">
        <h1 className="text-5xl font-bold mb-12 text-text-primary">
          {article.title}
        </h1>
        <div className="bg-surface rounded-xl overflow-hidden shadow-lg border border-gray-700 mb-12">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-text-primary mb-4">{article.title}</h2>
            <p className="text-text-secondary mb-4">{article.date}</p>
            {article.image && (
              <Image
                src={article.image.src}
                alt={article.image.alt}
                width={800}
                height={400}
                className="mb-4"
              />
            )}
            <div
              className="prose max-w-none text-text-primary"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
