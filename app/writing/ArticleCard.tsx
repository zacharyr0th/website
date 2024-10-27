import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/types';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'side';
}

const variantStyles: Record<'default' | 'featured' | 'side', {
  card: string;
  imageContainer: string;
  content: string;
  title: string;
  excerpt: string;
  link: string;
}> = {
  default: {
    card: 'bg-surface rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300',
    imageContainer: 'w-full h-48 relative',
    content: 'p-4',
    title: 'text-xl font-semibold mb-2 text-text-primary',
    excerpt: 'text-text-secondary text-sm mb-4',
    link: 'inline-block px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-dark transition-colors duration-200',
  },
  featured: {
    card: 'bg-surface rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300',
    imageContainer: 'w-full h-64 relative',
    content: 'p-6',
    title: 'text-2xl font-bold mb-3 text-text-primary',
    excerpt: 'text-text-secondary mb-4',
    link: 'inline-block px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-dark transition-colors duration-200',
  },
  side: {
    card: 'flex items-center space-x-4',
    imageContainer: 'hidden',
    content: '',
    title: 'text-lg font-semibold mb-1 text-text-primary',
    excerpt: 'text-text-secondary text-sm',
    link: 'text-accent hover:underline',
  },
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'default' }) => {
  const styles = variantStyles[variant];

  return (
    <div className={styles.card}>
      {variant !== 'side' && (
        <div className={styles.imageContainer}>
          <Image 
            src={article.image.src} 
            alt={article.image.alt} 
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
      <div className={styles.content}>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.excerpt}>{article.excerpt}</p>
        <Link href={article.link} className={styles.link}>
          {variant === 'side' ? 'Read More' : 'Read Article'}
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
