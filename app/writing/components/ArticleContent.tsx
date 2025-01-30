'use client';

import React, { memo, useCallback, useMemo, useRef } from 'react';
import Image from 'next/image';
import type { ArticleImage as ArticleImageType, ArticleContentProps } from '../types';
import styles from './article.module.css';

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('ArticleContent error:', error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-text-secondary">Please try refreshing the page</p>
        </div>
      );
    }
    return this.props.children;
  }
}

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
    const headings = useMemo(() => {
      try {
        return (
          content.match(/<h[1-3][^>]*>(.*?)<\/h[1-3]>/g)?.map((heading) => {
            const level = heading.charAt(2);
            const text = heading.replace(/<[^>]+>/g, '');
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return { level, text, id };
          }) || []
        );
      } catch (error) {
        console.warn('Error parsing headings:', error);
        return [];
      }
    }, [content]);

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

const ArticleContent = memo<ArticleContentProps>(({ article, contentHtml }) => {
  const { title, description, frontmatter } = article;
  const [copyFeedback, setCopyFeedback] = React.useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleHeaderClick = useCallback(async (id: string) => {
    if (typeof window === 'undefined') return;

    try {
      // Check if running on mobile
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile) {
        // On mobile, just update the URL hash
        window.location.hash = id;
        setCopyFeedback(id);
        setTimeout(() => setCopyFeedback(null), 2000);
        return;
      }

      // On desktop, try to copy the URL
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        const url = `${window.location.origin}${window.location.pathname}#${id}`;
        await navigator.clipboard.writeText(url);
        setCopyFeedback(id);
        setTimeout(() => setCopyFeedback(null), 2000);
      } else {
        // Fallback for browsers without clipboard API
        const tempInput = document.createElement('input');
        tempInput.value = `${window.location.origin}${window.location.pathname}#${id}`;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        setCopyFeedback(id);
        setTimeout(() => setCopyFeedback(null), 2000);
      }
    } catch (error) {
      console.warn('Copy operation failed:', error);
      // Still update the URL hash even if copy fails
      window.location.hash = id;
    }
  }, []);

  const processedContent = useMemo(() => {
    if (!contentHtml) return '';
    
    try {
      return contentHtml.replace(
        /<h([1-3])(.*?)>(.*?)<\/h[1-3]>/g,
        (_match, level, attrs, text) => {
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          // Use data attributes instead of onclick for better mobile compatibility
          return `<h${level}${attrs} id="${id}" class="group cursor-pointer" data-heading-id="${id}">
            ${text}
            <span class="link-icon" aria-hidden="true">
              ${copyFeedback === id ? '✓' : '🔗'}
            </span>
          </h${level}>`;
        }
      );
    } catch (error) {
      console.warn('Content processing error:', error);
      return contentHtml;
    }
  }, [contentHtml, copyFeedback]);

  React.useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const handleClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const heading = target.closest('[data-heading-id]');
      if (heading) {
        const id = heading.getAttribute('data-heading-id');
        if (id) handleHeaderClick(id);
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('click', handleClick);
      return () => contentElement.removeEventListener('click', handleClick);
    }

    return undefined;
  }, [handleHeaderClick]);

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
});

ArticleContent.displayName = 'ArticleContent';

declare global {
  interface Window {
    handleHeaderClick?: (id: string) => void;
  }
}

export default ArticleContent;
