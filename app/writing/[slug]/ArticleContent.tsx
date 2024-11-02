'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import Footer from '@/app/components/common/Footer';
import { Article } from '@/lib/types';

interface ArticleContentProps {
  article: Article;
}

const ArticleContent: React.FC<ArticleContentProps> = memo(({ article }) => {
  return (
    <main
      className="flex flex-col w-full min-h-screen font-mono"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <article className="flex-grow container mx-auto px-36 pt-36 pb-18 max-w-6xl">
        <header className="mb-12">
          <h1 className="text-5xl font-bold mb-12 text-text-primary">{article.title}</h1>
          <p className="text-text-secondary">{article.date}</p>
        </header>
        {article.image && (
          <figure className="mb-12">
            <Image
              src={article.image.src}
              alt={article.image.alt || 'Article image'}
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
});

ArticleContent.displayName = 'ArticleContent';

export default ArticleContent;
