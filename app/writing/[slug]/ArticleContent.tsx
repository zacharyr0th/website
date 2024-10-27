'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import { Theme, Article } from '@/lib/types';

interface ArticleContentProps {
  article: Article;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <main
      className={`flex flex-col w-auto min-h-screen overflow-x-hidden font-mono ${theme}`}
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <Navigation setTheme={setTheme} showHomeButton={true} />
      <article className="flex-grow container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-24">
        <header className="mb-12">
          <h1 className="text-5xl font-bold mb-4 text-text-primary">
            {article.title}
          </h1>
          <p className="text-text-secondary">{article.date}</p>
        </header>
        {article.image && (
          <figure className="mb-12">
            <Image
              src={article.image.src}
              alt={article.image.alt}
              width={1200}
              height={600}
              className="rounded-xl shadow-lg"
            />
            {article.image.alt && (
              <figcaption className="mt-2 text-center text-sm text-text-secondary">
                {article.image.alt}
              </figcaption>
            )}
          </figure>
        )}
        <div className="bg-background rounded-xl overflow-hidden">
          <div
            className="prose prose-lg max-w-none text-text-primary"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </article>
      <Footer />
    </main>
  );
}
