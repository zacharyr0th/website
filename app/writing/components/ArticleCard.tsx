'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '../types';
import styles from '@/app/writing/[slug]/article.module.css';

export const ArticleCard = memo<{ article: Article }>(({ article }) => {
  const imageAlt = React.useMemo(() => {
    if (!article.image) return '';
    return article.image.alt || `Featured image for ${article.title || 'Untitled Article'}`;
  }, [article.image, article.title]);

  const cardClassName = `${styles.card} ${article.frontmatter.featured ? styles.cardFeatured : ''}`;
  
  return (
    <Link
      href={article.link || '#'}
      className={`${cardClassName} hover-bounce`}
      aria-label={`Read article: ${article.title || 'Untitled Article'}`}
    >
      {article.image && (
        <div className={styles.cardImageContainer}>
          <Image
            src={article.image.src}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.cardImage}
            loading="lazy"
            quality={85}
            priority={article.frontmatter.featured}
          />
        </div>
      )}

      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>
          {article.title || 'Untitled Article'}
        </h2>
        {article.description && (
          <p className={styles.cardDescription}>
            {article.description}
          </p>
        )}
      </div>
    </Link>
  );
});

ArticleCard.displayName = 'ArticleCard';
