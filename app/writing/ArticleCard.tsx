import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/types';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'side';
}

const variantStyles = {
  default: {
    card: 'group relative bg-[var(--color-surface)] backdrop-blur-sm rounded-md overflow-hidden hover:bg-[var(--color-primary)] transition-all duration-300 flex flex-col h-[360px]',
    imageContainer: 'aspect-[16/9] relative overflow-hidden flex-shrink-0',
    content: 'flex-grow p-[var(--spacing-md)] flex flex-col justify-between',
    title:
      'font-mono text-[var(--font-size-base)] font-bold mb-[var(--spacing-sm)] text-text-primary group-hover:text-accent transition-colors duration-200 line-clamp-2',
    excerpt:
      'text-text-secondary text-[calc(var(--font-size-base)-1px)] mb-[var(--spacing-md)] truncate-3-lines max-w-[150ch]',
    link: 'inline-flex items-center gap-[var(--spacing-xs)] text-accent font-mono text-[calc(var(--font-size-base)-1px)] hover:text-accent-dark transition-all duration-200 hover:gap-[var(--spacing-sm)]',
  },
  featured: {
    card: 'group relative bg-[var(--color-surface)] backdrop-blur-sm rounded-md overflow-hidden hover:bg-[var(--color-primary)] transition-all duration-300 flex flex-col h-[400px]',
    imageContainer: 'aspect-[16/9] relative overflow-hidden flex-shrink-0',
    content: 'flex-grow p-[var(--spacing-md)] flex flex-col justify-between',
    title:
      'font-mono text-[calc(var(--font-size-base)+2px)] font-bold mb-[var(--spacing-sm)] text-text-primary group-hover:text-accent transition-colors duration-200 line-clamp-2',
    excerpt:
      'text-text-secondary text-[var(--font-size-base)] mb-[var(--spacing-md)] truncate-3-lines max-w-[150ch]',
    link: 'inline-flex items-center gap-[var(--spacing-xs)] text-accent font-mono text-[var(--font-size-base)] hover:text-accent-dark transition-all duration-200 hover:gap-[var(--spacing-sm)]',
  },
  side: {
    card: 'group flex gap-[var(--spacing-md)] bg-[var(--color-surface)] backdrop-blur-sm hover:bg-[var(--color-primary)] rounded-md p-[var(--spacing-sm)] transition-all duration-300',
    imageContainer: 'w-24 aspect-square relative flex-shrink-0 rounded overflow-hidden',
    content: 'flex-grow min-w-0 flex flex-col justify-between py-[var(--spacing-xs)]',
    title:
      'font-mono text-[var(--font-size-base)] font-bold mb-[var(--spacing-xs)] text-text-primary group-hover:text-accent transition-colors duration-200 line-clamp-2',
    excerpt:
      'text-text-secondary text-[calc(var(--font-size-base)-2px)] truncate-2-lines max-w-[100ch]',
    link: 'mt-[var(--spacing-sm)] inline-flex items-center gap-[var(--spacing-xs)] text-accent font-mono text-[calc(var(--font-size-base)-2px)] hover:gap-[var(--spacing-sm)] transition-all duration-200',
  },
};

const ArticleCard: React.FC<ArticleCardProps> = React.memo(({ article, variant = 'default' }) => {
  const styles = variantStyles[variant as keyof typeof variantStyles];

  const tagElements = useMemo(() => {
    if (!article.tags?.length) return null;

    const tagsToShow = article.tags.slice(0, variant === 'featured' ? 3 : 2);
    return (
      <div
        className="flex flex-wrap gap-[var(--spacing-xs)] mb-[var(--spacing-sm)]"
        role="list"
        aria-label="Article tags"
      >
        {tagsToShow.map((tag) => (
          <span
            key={tag}
            role="listitem"
            className="px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-[calc(var(--font-size-base)-2px)] font-mono rounded-full bg-accent/10 text-accent"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  }, [article.tags, variant]);

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={article.image.src}
          alt={article.image.alt || 'Article image'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[var(--transition-speed)] group-hover:scale-105"
        />
      </div>
      <div className={styles.content}>
        {tagElements}
        <h3 className={styles.title}>
          <Link
            href={article.link}
            className="focus:outline-none focus-visible:text-accent"
            aria-label={`Read ${article.title}`}
          >
            {article.title}
          </Link>
        </h3>
        <p className={styles.excerpt}>{article.description}</p>
        <Link
          href={article.link}
          className={`${styles.link} focus:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
          aria-hidden="true"
          tabIndex={-1}
        >
          {variant === 'side' ? 'Read more' : 'Read article'}
          <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
});

ArticleCard.displayName = 'ArticleCard';

export default ArticleCard;
