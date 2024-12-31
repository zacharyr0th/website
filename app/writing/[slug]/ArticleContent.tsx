'use client';

import React from 'react';
import Image from 'next/image';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { Article } from '@/app/lib/types/types';
import dynamic from 'next/dynamic';
import styles from './article.module.css';

const MDXContent = dynamic(() => import('./MDXContent'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

interface ArticleContentProps {
  article: Article;
  serializedContent: MDXRemoteSerializeResult;
}

const ArticleContent = ({ article, serializedContent }: ArticleContentProps) => {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {article.title}
        </h1>
        {article.description && (
          <p className={styles.description}>
            {article.description}
          </p>
        )}
        {article.frontmatter?.image && (
          <div className={styles.featuredImage}>
            <Image
              src={article.frontmatter.image.src}
              alt={article.frontmatter.image.alt || article.title}
              width={1200}
              height={675}
              priority
              className={styles.image}
            />
          </div>
        )}
      </header>

      <MDXContent serializedContent={serializedContent} />
    </article>
  );
};

export default ArticleContent; 