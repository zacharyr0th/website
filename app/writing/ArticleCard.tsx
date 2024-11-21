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
    card: `relative flex flex-col h-[340px] rounded-lg
           bg-[var(--color-surface)] shadow-sm
           transition-all duration-300
           hover:shadow-md hover:bg-[var(--color-surface)]/80`,
    imageContainer: `aspect-[16/9] relative overflow-hidden rounded-t-lg
                    after:absolute after:inset-0 
                    after:bg-gradient-to-b after:from-black/0 after:to-black/10
                    after:opacity-0 after:transition-opacity after:duration-300
                    group-hover:after:opacity-100`,
    content: 'flex-grow px-6 py-4 flex flex-col justify-between',
    title: `font-sans text-lg font-semibold mb-3 
            text-text-primary/90 line-clamp-2
            transition-colors duration-300
            group-hover:text-accent`,
    excerpt: `text-text-secondary/70 text-[14px] leading-relaxed mb-4 
             tracking-wide truncate-2-lines`,
    link: `inline-flex items-center gap-2.5 
           text-accent/80 font-medium text-[15px] 
           transition-all duration-300
           group-hover:text-accent group-hover:gap-3`,
  },
  featured: {
    card: `relative flex flex-col h-[340px] rounded-lg
           bg-[var(--color-surface)] shadow-sm
           transition-all duration-300
           hover:shadow-md hover:bg-[var(--color-surface)]/80`,
    imageContainer: `aspect-[16/9] relative overflow-hidden rounded-t-lg
                    after:absolute after:inset-0 
                    after:bg-gradient-to-b after:from-black/0 after:to-black/10
                    after:opacity-0 after:transition-opacity after:duration-300
                    group-hover:after:opacity-100`,
    content: 'flex-grow px-6 py-4 flex flex-col justify-between',
    title: `font-sans text-xl font-semibold mb-4 
            text-text-primary/90 line-clamp-2
            hover:text-accent/90 transition-colors duration-200`,
    excerpt: `text-text-secondary/75 text-base leading-relaxed mb-5 
             tracking-wide truncate-3-lines`,
    link: `inline-flex items-center gap-2.5 text-accent/90 
           font-medium text-base hover:text-accent
           transition-colors duration-200`,
  },
  side: {
    card: `group flex gap-5 h-[120px] rounded-lg p-3
           bg-[var(--color-surface)] shadow-sm
           transition-all duration-300
           hover:shadow-md hover:bg-[var(--color-surface)]/80`,
    imageContainer: 'w-28 aspect-square relative flex-shrink-0 rounded-lg overflow-hidden',
    content: 'flex-grow min-w-0 flex flex-col justify-between py-0.5',
    title: `font-sans text-base font-semibold mb-2.5 
            text-text-primary/90 line-clamp-2
            hover:text-accent/90 transition-colors duration-200`,
    excerpt: `text-text-secondary/75 text-sm leading-relaxed 
             tracking-wide truncate-2-lines`,
    link: `mt-3.5 inline-flex items-center gap-2.5 text-accent/90 
           font-medium text-sm hover:text-accent
           transition-colors duration-200`,
  },
};

const ArticleCard: React.FC<ArticleCardProps> = React.memo(({ article, variant = 'default' }) => {
  const styles = variantStyles[variant as keyof typeof variantStyles];

  const tagElements = useMemo(() => {
    if (!article.tags?.length) return null;

    const tagsToShow = article.tags.slice(0, variant === 'featured' ? 3 : 2);
    return (
      <div className="flex flex-wrap gap-2 mb-3" role="list" aria-label="Article tags">
        {tagsToShow.map((tag) => (
          <span
            key={tag}
            role="listitem"
            className="py-0.5 text-[12px] tracking-wide font-medium rounded-full
                       bg-accent/[0.08] text-accent/70 transition-colors duration-300
                       group-hover:bg-accent/[0.12] group-hover:text-accent/80"
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
      className={`group block focus:outline-none focus-visible:ring-2 
                  focus-visible:ring-accent rounded-lg`}
      aria-label={`Read article: ${article.title}`}
    >
      <article className={styles.card}>
        <div className={styles.imageContainer}>
          <Image
            src={article.image.src}
            alt={article.image.alt || 'Article image'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 
                       group-hover:scale-105 brightness-[0.98]"
          />
        </div>

        <div className={styles.content}>
          {tagElements}
          <h3 className={styles.title}>{article.title}</h3>
          <p className={styles.excerpt}>{article.description}</p>
          <span 
            className={`${styles.link} group/link`}
            aria-hidden="true"
          >
            {variant === 'side' ? 'Read more' : 'Read article'}
            <ArrowRightIcon 
              className="w-4 h-4 transition-transform duration-200 
                         group-hover:translate-x-0.5" 
            />
          </span>
        </div>
      </article>
    </Link>
  );
});

ArticleCard.displayName = 'ArticleCard';

export default ArticleCard;
