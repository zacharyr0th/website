'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import type { Article, ArticleImage as ArticleImageType } from '../types';
import styles from '@/app/styles/article.module.css';

interface ArticleContentProps {
  article: Article;
  contentHtml: string;
}

const ArticleHeader = memo<{ title: string; description: string | undefined }>(({ title, description }) => (
  <header className={styles.header}>
    <h1 className={styles.title}>{title}</h1>
    {description && <p className={styles.description}>{description}</p>}
  </header>
));

ArticleHeader.displayName = 'ArticleHeader';

const ArticleImage = memo<{ image: ArticleImageType; title: string }>(({ image, title }) => (
  <figure className={styles.featuredImage}>
    <Image
      src={image.src}
      alt={image.alt || `Featured image for article: ${title}`}
      fill
      className={styles.featuredImageInner}
      loading="lazy"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1200px"
    />
    <figcaption className="sr-only">{image.alt || `Featured image for article: ${title}`}</figcaption>
  </figure>
));

ArticleImage.displayName = 'ArticleImage';

const ArticleContent = memo<ArticleContentProps>(({ article, contentHtml }) => {
  const { title, description, frontmatter } = article;
  
  return (
    <div className="content-page font-mono bg-gradient-to-b from-background to-surface/30">
      <main>
        <article className={styles.article} aria-labelledby="article-title">
          <ArticleHeader title={title} description={description} />
          {frontmatter.image && <ArticleImage image={frontmatter.image} title={title} />}
          <div 
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: contentHtml }} 
          />
        </article>
      </main>
    </div>
  );
});

ArticleContent.displayName = 'ArticleContent';

export default ArticleContent;
