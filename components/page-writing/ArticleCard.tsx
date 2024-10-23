import React from 'react';
import Link from 'next/link';
import { Article } from '@/lib/types';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'side';
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'default' }) => {
  const cardClasses = {
    default: 'bg-surface rounded-md shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300',
    featured: 'bg-surface rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full relative',
    side: 'group',
  };

  const imageClasses = {
    default: 'w-full h-48 object-cover',
    featured: 'w-full h-64 object-cover',
    side: 'hidden',
  };

  const titleClasses = {
    default: 'text-xl font-semibold mb-3 text-text-primary',
    featured: 'text-2xl font-bold mb-3 text-text-primary',
    side: 'text-lg font-semibold mb-2 text-text-primary group-hover:text-accent transition-colors duration-200',
  };

  const excerptClasses = {
    default: 'text-text-secondary text-sm mb-4',
    featured: 'text-text-secondary mb-4',
    side: 'text-text-secondary text-sm mb-2',
  };

  const linkClasses = {
    default: 'inline-block px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-dark transition-colors duration-200',
    featured: 'inline-block px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-dark transition-colors duration-200',
    side: 'text-accent group-hover:text-accent-dark transition-colors duration-200 text-sm',
  };

  return (
    <div className={cardClasses[variant]}>
      {variant !== 'side' && (
        <img src={article.image} alt={article.title} className={imageClasses[variant]} />
      )}
      <div className={variant === 'side' ? '' : 'p-6'}>
        <h3 className={titleClasses[variant]}>{article.title}</h3>
        <p className={excerptClasses[variant]}>{article.excerpt}</p>
        <Link href={article.link} className={linkClasses[variant]}>
          {variant === 'side' ? 'Read more →' : 'Read Article'}
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;