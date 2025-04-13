'use client';

/**
 * ArticleContent component
 * Displays the full content of an article with optimized typography
 */

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib';
import type { ArticleContentProps } from './types';
import { MDXContent } from './MDXContent';

// Add type declaration for window.handleHeaderClick
declare global {
  interface Window {
    handleHeaderClick?: ((id: string) => void) | undefined;
  }
}

export const ArticleContent = ({
  article,
  nextArticle,
  prevArticle,
  children,
}: ArticleContentProps) => {
  // Set up header click handler for table of contents
  useEffect(() => {
    window.handleHeaderClick = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };

    return () => {
      window.handleHeaderClick = undefined;
    };
  }, []);

  return (
    <article>
      {/* Article header */}
      <header className="mb-8">
        <h1 className="article-title">{article.title}</h1>
        {article.description && <p className="article-description mt-2">{article.description}</p>}

        <div className="flex items-center gap-4 mt-3">
          <time dateTime={article.date} className="text-gray-500">
            {formatDate(article.date)}
          </time>
          {article.category && (
            <span className="px-3 py-1 rounded-xl text-sm bg-secondary">{article.category}</span>
          )}
        </div>
      </header>

      {/* Featured image */}
      {article.image && (
        <figure className="mb-8">
          <Image
            src={article.image.src}
            alt={article.image.alt || article.title}
            width={1200}
            height={675}
            className="rounded-xl shadow-lg"
            priority
          />
          {article.image.caption && (
            <figcaption className="text-center mt-4 text-sm text-muted-foreground">
              {article.image.caption}
            </figcaption>
          )}
        </figure>
      )}

      {/* Key Takeaways section */}
      {article.takeaways && article.takeaways.length > 0 && (
        <div className="mb-12 p-6 bg-surface rounded-2xl shadow-sm border border-[rgba(255,255,255,0.1)]">
          <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
          <ul className="space-y-2">
            {article.takeaways.map((takeaway, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block mr-2 text-accent">•</span>
                {takeaway}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main content */}
      <div className="prose prose-invert">
        {typeof article.content === 'string' ? <MDXContent source={article.content} /> : children}
      </div>

      {/* Navigation between articles */}
      <nav className="mt-8 pt-4 border-t border-[rgba(255,255,255,0.1)]">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          {prevArticle && (
            <Link
              href={prevArticle.link}
              className="group p-4 rounded-lg hover:bg-secondary transition-colors"
            >
              <div className="text-sm uppercase tracking-wider opacity-60">Previous</div>
              <div className="text-lg font-medium mt-1 group-hover:text-white transition-colors">
                {prevArticle.title}
              </div>
            </Link>
          )}

          {nextArticle && (
            <Link
              href={nextArticle.link}
              className="group p-4 rounded-lg hover:bg-secondary transition-colors sm:text-right"
            >
              <div className="text-sm uppercase tracking-wider opacity-60">Next</div>
              <div className="text-lg font-medium mt-1 group-hover:text-white transition-colors">
                {nextArticle.title}
              </div>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
};
