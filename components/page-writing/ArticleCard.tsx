import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/types';

type Variant = 'default' | 'featured' | 'side';

interface ArticleCardProps {
  article: Article;
  variant?: Variant;
}

const variantStyles: Record<Variant, {
  card: string;
  imageContainer: string;
  title: string;
  excerpt: string;
  link: string;
}> = {
  default: {
    card: 'bg-surface rounded-md shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300',
    imageContainer: 'w-full h-48 relative',
    title: 'text-xl font-semibold mb-3 text-text-primary',
    excerpt: 'text-text-secondary text-sm mb-4',
    link: 'inline-block px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-dark transition-colors duration-200',
  },
  featured: {
    card: 'bg-surface rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full relative',
    imageContainer: 'w-full h-64 relative',
    title: 'text-2xl font-bold mb-3 text-text-primary',
    excerpt: 'text-text-secondary mb-4',
    link: 'inline-block px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-dark transition-colors duration-200',
  },
  side: {
    card: 'group',
    imageContainer: 'hidden',
    title: 'text-lg font-semibold mb-2 text-text-primary group-hover:text-accent transition-colors duration-200',
    excerpt: 'text-text-secondary text-sm mb-2',
    link: 'text-accent group-hover:text-accent-dark transition-colors duration-200 text-sm',
  },
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'default' }) => {
  const styles = variantStyles[variant];

  return (
    <div className={styles.card}>
      {variant !== 'side' && (
        <div className={styles.imageContainer}>
          {article.image.startsWith('/') ? (
            <Image src={article.image} alt={article.title} layout="fill" objectFit="cover" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          )}
        </div>
      )}
      <div className={variant === 'side' ? '' : 'p-6'}>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.excerpt}>{article.excerpt}</p>
        <Link href={article.link} className={styles.link}>
          {variant === 'side' ? 'Read more →' : 'Read Article'}
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
