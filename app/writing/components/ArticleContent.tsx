'use client';

import React, { memo, useCallback, useMemo, useRef } from 'react';
import Image from 'next/image';
import type { ArticleImage as ArticleImageType, ArticleContentProps } from '../types';
import styles from './article.module.css';

const ArticleHeader = memo<{ title: string; description: string | undefined }>(
  ({ title, description }) => (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
    </header>
  )
);

ArticleHeader.displayName = 'ArticleHeader';

const ArticleMetadata = memo<{ content: string; takeaways: readonly string[] | null }>(
  ({ content, takeaways }) => {
    const headings =
      content.match(/<h[1-3][^>]*>(.*?)<\/h[1-3]>/g)?.map((heading) => {
        const level = heading.charAt(2);
        const text = heading.replace(/<[^>]+>/g, '');
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return { level, text, id };
      }) || [];

    if (!takeaways?.length && !headings.length) return null;

    return (
      <div className={styles.metadata}>
        {takeaways?.length ? (
          <>
            <div className={styles.metadataHeader}>
              <span>Key Takeaways</span>
              <div className={styles.divider} />
            </div>
            <div className={styles.takeaways}>
              <ul>
                {takeaways.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </>
        ) : null}

        {headings.length ? (
          <>
            <div className={styles.metadataHeader}>
              <span>Contents</span>
              <div className={styles.divider} />
            </div>
            <nav className={styles.contents} aria-label="Table of contents">
              <ul>
                {headings.map((heading, index) => (
                  <li key={index} className={`h${heading.level}-item`}>
                    <a href={`#${heading.id}`} className="text-[var(--color-text-secondary)]">
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        ) : null}
      </div>
    );
  }
);

ArticleMetadata.displayName = 'ArticleMetadata';

const ArticleImage = memo<{ image: ArticleImageType; title: string }>(({ image, title }) => (
  <figure className={styles.featuredImage}>
    <Image
      src={image.src}
      alt={image.alt || `Featured image for article: ${title}`}
      fill
      className={`${styles.featuredImageInner} rounded-xl`}
      loading="lazy"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1200px"
    />
    <figcaption className="sr-only">
      {image.alt || `Featured image for article: ${title}`}
    </figcaption>
  </figure>
));

ArticleImage.displayName = 'ArticleImage';

const ArticleContent = memo<ArticleContentProps>(
  ({ article, contentHtml }) => {
    const { title, description, frontmatter } = article;
    const [copyFeedback, setCopyFeedback] = React.useState<string | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleHeaderClick = useCallback(async (id: string) => {
      if (typeof window === 'undefined') return;
      
      try {
        const url = `${window.location.origin}${window.location.pathname}#${id}`;
        await navigator.clipboard.writeText(url);
        setCopyFeedback(id);
        setTimeout(() => setCopyFeedback(null), 2000);
      } catch (error) {
        // Fallback for browsers that don't support clipboard API
        const tempInput = document.createElement('input');
        tempInput.value = `${window.location.origin}${window.location.pathname}#${id}`;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        setCopyFeedback(id);
        setTimeout(() => setCopyFeedback(null), 2000);
      }
    }, []);

    const processedContent = useMemo(() => {
      return contentHtml.replace(
        /<h([1-3])(.*?)>(.*?)<\/h[1-3]>/g,
        (_match, level, attrs, text) => {
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return `<h${level}${attrs} id="${id}" class="group cursor-pointer" onclick="if(window.handleHeaderClick)window.handleHeaderClick('${id}')">
          ${text}
          <span class="link-icon">
            ${copyFeedback === id ? '✓' : '🔗'}
          </span>
        </h${level}>`;
        }
      );
    }, [contentHtml, copyFeedback]);

    React.useEffect(() => {
      if (typeof window === 'undefined') return;
      window.handleHeaderClick = handleHeaderClick;
      return () => {
        if (typeof window !== 'undefined') {
          delete window.handleHeaderClick;
        }
      };
    }, [handleHeaderClick]);

    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-surface/30">
        <main className="container mx-auto px-4 sm:px-6 pt-8 sm:pt-16 pb-16">
          <div style={{ maxWidth: 'var(--article-width)' }} className="mx-auto">
            <article className={styles.article} aria-labelledby="article-title">
              <ArticleHeader title={title} description={description} />

              <div className="relative">
                {frontmatter.image && <ArticleImage image={frontmatter.image} title={title} />}
              </div>

              <ArticleMetadata content={contentHtml} takeaways={frontmatter.takeaways} />

              <div
                ref={contentRef}
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
            </article>
          </div>
        </main>
      </div>
    );
  }
);

ArticleContent.displayName = 'ArticleContent';

declare global {
  interface Window {
    handleHeaderClick?: (id: string) => void;
  }
}

export default ArticleContent;
