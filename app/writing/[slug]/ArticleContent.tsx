'use client';

import React, { memo, useCallback, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSwipeable } from 'react-swipeable';
import type { ArticleImage as ArticleImageType, ArticleContentProps } from '../types';
import styles from './article.module.css';
import clsx from 'clsx';
import DOMPurify from 'isomorphic-dompurify';
import { motion } from 'framer-motion';

const ArticleHeader = memo<{ title: string; description: string | undefined }>(
  ({ title, description }) => (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
    </header>
  )
);

ArticleHeader.displayName = 'ArticleHeader';

const TableOfContents = memo<{ content: string; onHeaderClick?: () => void; isExpanded?: boolean }>(
  ({ content, onHeaderClick, isExpanded = false }) => {
    const headings =
      content.match(/<h[1-3][^>]*>(.*?)<\/h[1-3]>/g)?.map((heading) => {
        const level = heading.charAt(2);
        const text = heading.replace(/<[^>]+>/g, '');
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return { level, text, id };
      }) || [];

    return (
      <nav className={styles.tableOfContents} aria-label="Table of contents">
        {isExpanded ? (
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={onHeaderClick}
              className="text-[12px] w-[120px] text-left font-medium uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors"
            >
              Contents
            </button>
            <div className="h-px flex-1 bg-surface/50" />
          </div>
        ) : (
          <button
            onClick={onHeaderClick}
            className="text-[12px] w-[120px] text-left font-medium uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors"
          >
            Contents
          </button>
        )}
        {isExpanded && (
          <ul>
            {headings.map((heading, index) => (
              <li
                key={index}
                className={clsx(
                  heading.level === '1' && 'h1-item',
                  heading.level === '2' && 'h2-item',
                  heading.level === '3' && 'h3-item'
                )}
              >
                <a
                  href={`#${heading.id}`}
                  className="block text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]"
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    );
  }
);

TableOfContents.displayName = 'TableOfContents';

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

const KeyTakeaways = memo<{
  points: readonly string[];
  onHeaderClick?: () => void;
  isExpanded?: boolean;
}>(({ points, onHeaderClick, isExpanded = true }) => (
  <div className={styles.keyTakeaways}>
    {isExpanded ? (
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onHeaderClick}
          className="text-[12px] w-[140px] text-left font-medium uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors whitespace-nowrap"
        >
          KEY TAKEAWAYS
        </button>
        <div className="h-px flex-1 bg-surface/50" />
      </div>
    ) : (
      <button
        onClick={onHeaderClick}
        className="text-[12px] w-[140px] text-left font-medium uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors whitespace-nowrap"
      >
        KEY TAKEAWAYS
      </button>
    )}
    {isExpanded && (
      <ul className="space-y-2">
        {points.map((point, index) => (
          <li key={index} className="text-[13px] leading-relaxed text-text-secondary">
            {point}
          </li>
        ))}
      </ul>
    )}
  </div>
));

KeyTakeaways.displayName = 'KeyTakeaways';

const ArticleContent = memo<ArticleContentProps>(
  ({ article, contentHtml, nextArticle, prevArticle, containerVariants }) => {
    const { title, description, frontmatter } = article;
    const [showToc, setShowToc] = React.useState(false);
    const [showTakeaways, setShowTakeaways] = React.useState(true);
    const [copyFeedback, setCopyFeedback] = React.useState<string | null>(null);
    const router = useRouter();
    const contentRef = useRef<HTMLDivElement>(null);

    // Generate article structured data
    const articleStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: DOMPurify.sanitize(frontmatter.title),
      description: DOMPurify.sanitize(frontmatter.description),
      image: frontmatter.image?.src,
      datePublished: frontmatter.date,
      author: {
        '@type': 'Person',
        name: 'Zachary Roth',
        url: 'https://zacharyr0th.com',
      },
      publisher: {
        '@type': 'Person',
        name: 'Zachary Roth',
        url: 'https://zacharyr0th.com',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://zacharyr0th.com/writing/${article.slug}`,
      },
    };

    const handleToggleToc = useCallback(() => setShowToc((prev) => !prev), []);
    const handleToggleTakeaways = useCallback(() => setShowTakeaways((prev) => !prev), []);

    // Create swipe handlers for navigation
    const swipeHandlers = useSwipeable({
      onSwipedLeft: useCallback(() => {
        if (nextArticle) {
          router.push(`/writing/${nextArticle.slug}`);
        }
      }, [nextArticle, router]),
      onSwipedRight: useCallback(() => {
        if (prevArticle) {
          router.push(`/writing/${prevArticle.slug}`);
        }
      }, [prevArticle, router]),
      trackMouse: false,
      preventScrollOnSwipe: true,
      delta: 10,
      swipeDuration: 500,
    });

    // Use a div ref to attach swipe handlers in useEffect
    useEffect(() => {
      if (contentRef.current) {
        const element = contentRef.current;
        const { ref } = swipeHandlers;
        ref(element);
      }
    }, [swipeHandlers]);

    const handleHeaderClick = useCallback((id: string) => {
      if (typeof window === 'undefined') return;
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopyFeedback(id);
        setTimeout(() => setCopyFeedback(null), 2000);
      });
    }, []);

    const processedContent = useMemo(() => {
      if (!contentHtml) return '';

      try {
        const processedHtml = contentHtml.replace(
          /<h([1-3])(.*?)>(.*?)<\/h[1-3]>/g,
          (_match, level, attrs, text) => {
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return `<h${level}${attrs} id="${id}" class="group cursor-pointer" data-heading-id="${id}">
              ${DOMPurify.sanitize(text)}
              <span class="link-icon" aria-hidden="true">
                ${copyFeedback === id ? '✓ Copied!' : '🔗'}
              </span>
            </h${level}>`;
          }
        );

        return DOMPurify.sanitize(processedHtml, {
          ADD_TAGS: ['h1', 'h2', 'h3', 'span', 'img', 'figure', 'figcaption', 'pre', 'code'],
          ADD_ATTR: ['class', 'id', 'data-heading-id', 'aria-hidden', 'src', 'alt', 'loading'],
          ALLOW_DATA_ATTR: true,
        });
      } catch (error) {
        console.warn('Content processing error:', error);
        return DOMPurify.sanitize(contentHtml);
      }
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

    const renderTakeaways = useMemo(() => {
      if (!frontmatter.takeaways?.length) return null;

      return (
        <div className={styles.mobileContainer}>
          <KeyTakeaways
            points={frontmatter.takeaways}
            onHeaderClick={handleToggleTakeaways}
            isExpanded={showTakeaways}
          />
        </div>
      );
    }, [frontmatter.takeaways, handleToggleTakeaways, showTakeaways]);

    const renderTableOfContents = useMemo(
      () => (
        <div className={styles.mobileContainer}>
          <TableOfContents
            content={contentHtml}
            onHeaderClick={handleToggleToc}
            isExpanded={showToc}
          />
        </div>
      ),
      [contentHtml, handleToggleToc, showToc]
    );

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
        />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6"
        >
          <article className={styles.article} aria-labelledby="article-title">
            <ArticleHeader title={title} description={description} />

            <div className="relative">
              {frontmatter.image && <ArticleImage image={frontmatter.image} title={title} />}
            </div>

            {/* Mobile Key Takeaways and ToC */}
            <div className="lg:hidden space-y-3 my-4">
              {renderTakeaways}
              {renderTableOfContents}
            </div>

            {/* Desktop Key Takeaways and ToC */}
            <div className="hidden lg:block mb-6">
              {renderTakeaways}
              {renderTableOfContents}
            </div>

            {/* Main content */}
            <div
              ref={contentRef}
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />
          </article>
        </motion.div>
      </>
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
