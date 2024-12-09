import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/types';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'side';
}

const baseStyles = {
  card: 'rounded-xl bg-[var(--color-surface)] shadow-xl',
  imageContainer: 'relative overflow-hidden rounded-t-lg',
  title: 'font-sans font-semibold text-text-primary/90',
  excerpt: 'text-text-secondary/70 tracking-wide',
  link: 'inline-flex items-center gap-2.5 font-medium text-accent/80',
};

const variantStyles = {
  default: {
    card: `${baseStyles.card} flex flex-col h-[340px]`,
    imageContainer: `${baseStyles.imageContainer} aspect-[16/9]`,
    content: 'flex-grow px-6 py-4 flex flex-col justify-between',
    title: `${baseStyles.title} text-lg mb-3`,
    excerpt: `${baseStyles.excerpt} text-[14px] leading-relaxed mb-4 truncate-2-lines`,
    link: `${baseStyles.link} text-[15px]`,
  },
  featured: {
    card: `${baseStyles.card} flex flex-col h-[340px] border-l-4 border-l-white`,
    imageContainer: `${baseStyles.imageContainer} aspect-[16/9]`,
    content: 'flex-grow px-6 py-4 flex flex-col justify-between',
    title: `${baseStyles.title} text-xl mb-4`,
    excerpt: `${baseStyles.excerpt} text-base leading-relaxed mb-5 truncate-3-lines`,
    link: `${baseStyles.link} text-base`,
  },
  side: {
    card: `${baseStyles.card} flex gap-5 h-[120px] p-3`,
    imageContainer: 'w-28 aspect-square relative flex-shrink-0 rounded-lg overflow-hidden',
    content: 'flex-grow min-w-0 flex flex-col justify-between py-0.5',
    title: `${baseStyles.title} text-base mb-2.5`,
    excerpt: `${baseStyles.excerpt} text-sm leading-relaxed truncate-2-lines`,
    link: `${baseStyles.link} mt-3.5 text-sm`,
  },
} as const;

const ArticleCard = React.memo(({ article, variant = 'default' }: ArticleCardProps) => {
  const styles = variantStyles[variant];

  const tagElements = useMemo(() => {
    if (!article.tags?.length) return null;

    const tagsToShow = article.tags.slice(0, variant === 'featured' ? 3 : 2);
    return (
      <div className="flex flex-wrap items-center gap-2" role="list" aria-label="Article tags">
        {tagsToShow.map((tag) => (
          <span
            key={tag}
            role="listitem"
            className="px-1.5 py-0.5 text-[12px] tracking-wide font-medium rounded-full bg-accent/10 text-accent"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  }, [article.tags, variant]);

  return (
    <Link
      href={article.link}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
      aria-label={`Read article: ${article.title}`}
    >
      <article className={styles.card}>
        <div className={styles.imageContainer}>
          <Image
            src={article.image.src}
            alt={article.image.alt || ''}
            fill
            sizes={
              variant === 'side'
                ? '120px'
                : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
            }
            className="object-cover brightness-[0.98]"
            priority={variant === 'featured'}
          />
        </div>

        <div className={styles.content}>
          <div className="flex items-center h-8 -ml-1.5">{tagElements}</div>
          <h3 className={styles.title}>{article.title}</h3>
          <p className={styles.excerpt}>{article.description}</p>
          <span className={styles.link} aria-hidden="true">
            {variant === 'side' ? 'Read more' : 'Read article'}
            <ArrowRightIcon className="w-4 h-4" />
          </span>
        </div>
      </article>
    </Link>
  );
});

ArticleCard.displayName = 'ArticleCard';

export default ArticleCard;
