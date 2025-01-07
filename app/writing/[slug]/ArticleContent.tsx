'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSwipeable } from 'react-swipeable';
import type { ArticleImage as ArticleImageType, ArticleContentProps } from '../types';
import styles from './article.module.css';
import clsx from 'clsx';

const ArticleHeader = memo<{ title: string; description: string | undefined }>(({ title, description }) => (
  <header className={styles.header}>
    <h1 className={styles.title}>{title}</h1>
    {description && <p className={styles.description}>{description}</p>}
  </header>
));

ArticleHeader.displayName = 'ArticleHeader';

const ChatBot = memo<{ title: string; description: string | undefined }>(({ title, description }) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-6">Article Assistant</h2>
      <div className="space-y-6 overflow-y-auto flex-grow">
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex-shrink-0 flex items-center justify-center">
            🤖
          </div>
          <div className="flex-1">
            <p className="text-sm text-text-secondary">
              Hi! I&apos;m here to help you understand this article better. Feel free to ask questions as you read.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-surface flex-shrink-0 flex items-center justify-center">
            👤
          </div>
          <div className="flex-1">
            <p className="text-sm text-text-secondary">
              What&apos;s the main topic of this article?
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex-shrink-0 flex items-center justify-center">
            🤖
          </div>
          <div className="flex-1">
            <p className="text-sm text-text-secondary">
              This article discusses {title}. The key focus is on {description || 'the topic at hand'}.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-surface">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Ask a question..."
            className="flex-1 bg-surface/50 rounded-lg px-4 py-2.5 text-sm border border-surface focus:outline-none focus:border-accent/50 transition-colors"
          />
          <button className="px-4 py-2.5 bg-accent/20 hover:bg-accent/30 rounded-lg transition-colors">
            <span className="sr-only">Send message</span>
            ↑
          </button>
        </div>
      </div>
    </div>
  );
});

ChatBot.displayName = 'ChatBot';

const KeyTakeaways = memo<{ takeaways: readonly string[]; onHeaderClick?: () => void; isExpanded?: boolean }>(
  ({ takeaways, onHeaderClick, isExpanded = true }) => (
  <div className={styles.keyTakeaways}>
    {isExpanded ? (
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onHeaderClick}
          className="text-[13px] w-[180px] text-left font-medium uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors whitespace-nowrap"
        >
          Executive Summary
        </button>
        <div className="h-px flex-1 bg-surface/50" />
      </div>
    ) : (
      <button
        onClick={onHeaderClick}
        className="text-[13px] w-[180px] text-left font-medium uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors whitespace-nowrap"
      >
        Executive Summary
      </button>
    )}
    {isExpanded && (
      <ul className="space-y-4">
        {takeaways.map((point, index) => (
          <li key={index} className="text-[15px] leading-relaxed text-text-secondary">
            {point}
          </li>
        ))}
      </ul>
    )}
  </div>
));

KeyTakeaways.displayName = 'KeyTakeaways';

const TableOfContents = memo<{ content: string; onHeaderClick?: () => void; isExpanded?: boolean }>(
  ({ content, onHeaderClick, isExpanded = true }) => {
  const headings = content.match(/<h[1-3][^>]*>(.*?)<\/h[1-3]>/g)?.map(heading => {
    const level = heading.charAt(2);
    const text = heading.replace(/<[^>]+>/g, '');
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return { level, text, id };
  }) || [];

  return (
    <nav className={styles.tableOfContents} aria-label="Table of contents">
      {isExpanded ? (
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onHeaderClick}
            className="text-[13px] w-[140px] text-left font-medium uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors"
          >
            Contents
          </button>
          <div className="h-px flex-1 bg-surface/50" />
        </div>
      ) : (
        <button
          onClick={onHeaderClick}
          className="text-[13px] w-[140px] text-left font-medium uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors"
        >
          Contents
        </button>
      )}
      {isExpanded && (
        <ul className="space-y-4">
          {headings.map((heading, index) => (
            <li 
              key={index}
              className={clsx(
                heading.level === '1' && 'text-[15px] font-semibold',
                heading.level === '2' && 'text-[14px] font-medium',
                heading.level === '3' && 'ml-6 text-[13px] h3-item'
              )}
            >
              <a 
                href={`#${heading.id}`}
                className="block py-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
});

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
    <figcaption className="sr-only">{image.alt || `Featured image for article: ${title}`}</figcaption>
  </figure>
));

ArticleImage.displayName = 'ArticleImage';

const ArticleContent = memo<ArticleContentProps>(({ article, contentHtml, nextArticle, prevArticle }) => {
  const { title, description, frontmatter } = article;
  const [showToc, setShowToc] = React.useState(true);
  const [showSummary, setShowSummary] = React.useState(true);
  const [copyFeedback, setCopyFeedback] = React.useState<string | null>(null);
  const router = useRouter();
  
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (nextArticle) {
        router.push(`/writing/${nextArticle.slug}`);
      }
    },
    onSwipedRight: () => {
      if (prevArticle) {
        router.push(`/writing/${prevArticle.slug}`);
      }
    },
    trackMouse: false,
    preventScrollOnSwipe: true,
    delta: 10,
    swipeDuration: 500,
  });
  
  const handleHeaderClick = (id: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopyFeedback(id);
      setTimeout(() => setCopyFeedback(null), 2000);
    });
  };
  
  const processedContent = contentHtml.replace(
    /<h([1-3])(.*?)>(.*?)<\/h[1-3]>/g,
    (_match, level, attrs, text) => {
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return `<h${level}${attrs} id="${id}" class="group cursor-pointer" onclick="window.handleHeaderClick('${id}')" ontouchend="window.handleHeaderClick('${id}')">
        ${text}
        <span class="opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-opacity ml-3 text-accent text-sm">
          ${copyFeedback === id ? '✓ Copied!' : '🔗'}
        </span>
      </h${level}>`;
    }
  );

  React.useEffect(() => {
    window.handleHeaderClick = handleHeaderClick;
    return () => {
      window.handleHeaderClick = (() => {}) as (id: string) => void;
    };
  }, []);

  return (
    <div className="content-page font-mono bg-gradient-to-b from-background to-surface/30">
      <main className="max-w-[var(--max-content-width)] mx-auto relative" {...handlers}>
        <article className={styles.article} aria-labelledby="article-title">
          <ArticleHeader title={title} description={description} />
          
          <div className="relative">
            {frontmatter.image && <ArticleImage image={frontmatter.image} title={title} />}
            
            {/* Desktop ToC */}
            <div className="hidden lg:block absolute right-0 top-0 w-[260px] translate-x-[calc(100%+2rem)]">
              <div className="sticky top-8 bg-zinc-800/30 backdrop-blur-sm rounded-xl border border-surface pl-8 pr-6 py-8">
                <TableOfContents 
                  content={contentHtml} 
                  onHeaderClick={() => setShowToc(prev => !prev)}
                  isExpanded={showToc}
                />
              </div>
            </div>
          </div>
          
          {/* Mobile Executive Summary and ToC */}
          <div className="lg:hidden mb-16 space-y-8">
            {frontmatter.takeaways && frontmatter.takeaways.length > 0 && (
              <div className="bg-zinc-800/30 backdrop-blur-sm rounded-xl border border-surface p-8">
                <KeyTakeaways 
                  takeaways={frontmatter.takeaways} 
                  onHeaderClick={() => setShowSummary(prev => !prev)}
                  isExpanded={showSummary}
                />
              </div>
            )}
            
            <div className="bg-zinc-800/30 backdrop-blur-sm rounded-xl border border-surface p-8">
              <TableOfContents 
                content={contentHtml} 
                onHeaderClick={() => setShowToc(prev => !prev)}
                isExpanded={showToc}
              />
            </div>
          </div>

          {/* Desktop Executive Summary */}
          {frontmatter.takeaways && frontmatter.takeaways.length > 0 && (
            <div className="hidden lg:block mb-16">
              <div className="bg-zinc-800/30 backdrop-blur-sm rounded-xl border border-surface p-8">
                <KeyTakeaways 
                  takeaways={frontmatter.takeaways} 
                  onHeaderClick={() => setShowSummary(prev => !prev)}
                  isExpanded={showSummary}
                />
              </div>
            </div>
          )}

          {/* Main content */}
          <div 
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: processedContent }} 
          />

          {/* Mobile Navigation Hints */}
          <div className="lg:hidden mt-8 flex justify-between text-sm text-zinc-400">
            {prevArticle && (
              <div>← Swipe right for previous</div>
            )}
            {nextArticle && (
              <div>Swipe left for next →</div>
            )}
          </div>
        </article>
      </main>
    </div>
  );
});

ArticleContent.displayName = 'ArticleContent';

declare global {
  interface Window {
    handleHeaderClick: (id: string) => void;
  }
}

export default ArticleContent;
