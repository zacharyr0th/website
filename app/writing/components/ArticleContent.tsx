'use client';

/**
 * ArticleContent component
 * Displays the full content of an article with optimized typography
 */

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';
import { formatDate } from '@/lib';
import type { ArticleContentProps } from '../types';

// Add type declaration for window.handleHeaderClick
declare global {
  interface Window {
    handleHeaderClick?: ((id: string) => void) | undefined;
  }
}

export const ArticleContent = ({
  article,
  contentHtml,
  nextArticle,
  prevArticle,
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
    <div className="content-md mx-auto px-4 mt-4 md:mt-16">
      <article>
        {/* Article header */}
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-normal leading-tight mb-4">{article.title}</h1>
          {article.description && (
            <p className="text-xl text-lead max-w-2xl mx-auto md:mx-0 mb-6 text-pretty">
              {article.description}
            </p>
          )}

          <div className="flex items-center justify-center md:justify-start gap-4 my-4">
            <time
              dateTime={typeof article.date === 'string' ? article.date : article.date.toISOString()}
              className="text-small font-mono"
            >
              {formatDate(article.date)}
            </time>
            {article.category && (
              <span className="px-3 py-1 rounded-xl text-small bg-[rgba(255,255,255,0.1)]">
                {article.category}
              </span>
            )}
          </div>
        </header>

        {/* Featured image */}
        {article.image && (
          <figure className="my-8">
            <Image
              src={article.image.src}
              alt={article.image.alt || article.title}
              width={1200}
              height={675}
              className="w-full rounded-xl shadow-lg mx-auto"
              priority
            />
            {article.image.caption && (
              <figcaption className="text-center text-small mt-2 italic">
                {article.image.caption}
              </figcaption>
            )}
          </figure>
        )}
        
        {/* Key Takeaways section - Positioned beneath the image */}
        {article.takeaways && article.takeaways.length > 0 && (
          <div className="my-8 p-6 bg-surface rounded-2xl shadow-sm border border-[rgba(255,255,255,0.1)]">
            <h2 className="heading-subsection mt-0 mb-4">Key Takeaways</h2>
            <ul className="space-y-3">
              {article.takeaways.map((takeaway, index) => (
                <li key={index} className="text-body flex items-start">
                  <span className="inline-block mr-2 text-accent">•</span>
                  {takeaway}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main content */}
        <div
          className="prose prose-lg dark:prose-invert with-dropcap mx-auto"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(contentHtml),
          }}
        />

        {/* Navigation between articles */}
        <nav className="mt-12 pt-6 border-t border-[rgba(255,255,255,0.1)]">
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            {prevArticle && (
              <Link href={prevArticle.link} className="group p-4 rounded-lg hover:bg-surface transition-colors">
                <div className="text-small uppercase tracking-wider">Previous</div>
                <div className="text-lg font-medium mt-1 group-hover:text-accent transition-colors">{prevArticle.title}</div>
              </Link>
            )}

            {nextArticle && (
              <Link href={nextArticle.link} className="group p-4 rounded-lg hover:bg-surface transition-colors sm:text-right">
                <div className="text-small uppercase tracking-wider">Next</div>
                <div className="text-lg font-medium mt-1 group-hover:text-accent transition-colors">{nextArticle.title}</div>
              </Link>
            )}
          </div>
        </nav>
      </article>
    </div>
  );
};
