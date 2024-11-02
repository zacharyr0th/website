import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/types';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'side';
  priority?: boolean;
}

const variantStyles = {
  default: {
    card: 'group relative bg-surface rounded-md overflow-hidden shadow-sm hover:shadow focus-within:ring-2 focus-within:ring-accent transition-all duration-300 transform hover:-translate-y-0.5 flex flex-col h-96',
    imageContainer: 'aspect-[16/9] relative overflow-hidden flex-shrink-0',
    content: 'flex-grow p-4 flex flex-col justify-between',
    title:
      'text-base font-semibold mb-2 text-text-primary group-hover:text-accent transition-colors duration-200 line-clamp-2',
    excerpt: 'text-text-secondary text-xs mb-3 line-clamp-2',
    link: 'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-accent text-white rounded hover:bg-accent-dark transition-all duration-200 hover:gap-2',
  },
  featured: {
    card: 'group relative bg-surface rounded-md overflow-hidden shadow hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-96',
    imageContainer: 'aspect-[16/9] relative overflow-hidden flex-shrink-0',
    content: 'flex-grow p-4 flex flex-col justify-between',
    title:
      'text-base font-semibold mb-2 text-text-primary group-hover:text-accent transition-colors duration-200 line-clamp-2',
    excerpt: 'text-text-secondary text-xs mb-3 line-clamp-2',
    link: 'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-accent text-white rounded hover:bg-accent-dark transition-all duration-200 hover:gap-2',
  },
  side: {
    card: 'group flex items-start space-x-4 hover:bg-surface/50 rounded-md p-3 transition-all duration-200 flex-col h-96',
    imageContainer: 'w-24 aspect-square relative flex-shrink-0 rounded overflow-hidden',
    content: 'flex-grow flex-1 min-w-0 flex flex-col justify-between',
    title:
      'text-sm font-semibold mb-1 text-text-primary group-hover:text-accent transition-colors duration-200 line-clamp-2',
    excerpt: 'text-text-secondary text-xs line-clamp-2',
    link: 'inline-flex items-center gap-1 text-accent text-sm font-medium hover:gap-1.5 transition-all duration-200 mt-1.5',
  },
};

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  variant = 'default',
  priority = false,
}) => {
  const styles = variantStyles[variant];

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-102"
          sizes={
            variant === 'featured'
              ? '100vw'
              : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
          }
        />
      </div>
      <div className={styles.content}>
        {article.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2" role="list" aria-label="Article tags">
            {article.tags.slice(0, variant === 'featured' ? 3 : 2).map((tag) => (
              <span
                key={tag}
                role="listitem"
                className="px-1.5 py-0.5 text-sm font-medium rounded-full bg-accent/10 text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

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
};

export default ArticleCard;
