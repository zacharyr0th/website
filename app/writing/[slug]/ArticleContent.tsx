'use client';

import React, { memo, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import { ErrorBoundary } from 'react-error-boundary';
import Footer from '@/app/components/common/Footer';
import ArticleSwitcher from './ArticleSwitcher';
import { ArticleContentProps, ErrorFallbackProps } from '../types';
import styles from './article.module.css';

// Optimized Error Fallback component
const ErrorFallback = memo(({ error }: ErrorFallbackProps) => (
  <div className="text-red-500 p-4 rounded-lg bg-red-50 border border-red-200">
    <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
    <pre className="text-sm overflow-auto">{error.message}</pre>
  </div>
));

ErrorFallback.displayName = 'ErrorFallback';

// Optimized Header component
const ArticleHeader = memo(({ article }: ArticleContentProps) => (
  <header className="mb-8 sm:mb-12">
    <h1 className={`text-3xl sm:text-4xl md:text-5xl mb-4 ${styles.title}`}>{article.title}</h1>
    {article.subtitle && (
      <h2 className={`text-xl sm:text-2xl md:text-3xl font-thin mb-4 ${styles.subtitle}`}>
        {article.subtitle}
      </h2>
    )}
    <div className="flex flex-wrap items-center gap-4">
      <time dateTime={article.date} className={styles.date}>
        {new Date(article.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>
      {article.tags && article.tags.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <li key={tag} className={`text-sm rounded-full px-3 py-1 ${styles.tag}`}>
              {tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  </header>
));

ArticleHeader.displayName = 'ArticleHeader';

// Optimized ArticleImage component
const ArticleImage = memo(({ image }: { image: { src: string; alt: string } }) => (
  <div className="relative w-full h-64 sm:h-96 mb-8">
    <Image
      src={image.src}
      alt={image.alt}
      fill
      className="object-cover rounded-lg"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 640px, 1024px"
      priority
    />
  </div>
));

ArticleImage.displayName = 'ArticleImage';

const ArticleContent = ({ article }: ArticleContentProps) => {
  const sanitizedContent = useMemo(() => {
    if (typeof window === 'undefined') return article.content;
    
    // Configure DOMPurify to allow classes
    const clean = DOMPurify.sanitize(article.content, {
      ADD_ATTR: ['class'],
      ADD_TAGS: ['div'],
    });
    return clean;
  }, [article.content]);

  const processHeadings = useCallback(() => {
    if (typeof window === 'undefined') return;

    const articleContent = document.querySelector(`.${styles.content}`);
    if (!articleContent) return;

    const headings = articleContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading) => {
      if (heading.id) return;

      const id =
        heading.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') || '';

      heading.id = id;

      const anchor = document.createElement('a');
      anchor.href = `#${id}`;
      if (styles.headingAnchor) {
        anchor.className = styles.headingAnchor;
        anchor.innerHTML = '#';
        heading.appendChild(anchor);
      }
    });
  }, []);

  useEffect(() => {
    processHeadings();
  }, [sanitizedContent, processHeadings]);

  if (!article.title) {
    throw new Error('Article title is required');
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <main className={`flex flex-col w-full min-h-screen font-mono ${styles.main}`}>
        <article className={`${styles.article} prose`}>
          <ArticleHeader article={article} />
          {article.image && <ArticleImage image={article.image} />}
          <div
            className={`prose prose-lg max-w-none ${styles.content} ${styles.prose}`}
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </article>
        {article.adjacentArticles && <ArticleSwitcher {...article.adjacentArticles} />}
        <Footer />
      </main>
    </ErrorBoundary>
  );
};

export default memo(ArticleContent);
