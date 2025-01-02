'use client';

import React from 'react';
import Image from 'next/image';
import type { Article } from '../types';

interface ArticleContentProps {
  article: Article;
  contentHtml: string;
}

export default function ArticleContent({ article, contentHtml }: ArticleContentProps) {
  return (
    <div className="content-page font-mono bg-gradient-to-b from-background to-surface/30">
      <main className="container mx-auto pt-24 sm:pt-36">
        <article className="prose prose-lg max-w-none">
          <header>
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            {article.description && (
              <p className="text-xl text-text-secondary mb-8">{article.description}</p>
            )}
            {article.frontmatter.image && (
              <div className="relative w-full aspect-video mb-8">
                <Image
                  src={article.frontmatter.image.src}
                  alt={article.frontmatter.image.alt}
                  fill
                  className="rounded-lg object-cover"
                  priority
                />
              </div>
            )}
          </header>
          <div className="markdown-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>
      </main>
    </div>
  );
}
