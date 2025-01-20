'use client';

import React, { memo } from 'react';
import { useArticles } from '../lib/hooks';
import ArticleContent from './ArticleContent';
import { LoadingState } from '../../lib/Loading';
import type { Article } from '../types';

interface ArticleClientContentProps {
  article: Article;
  contentHtml: string;
}

const ArticleClientContent = memo<ArticleClientContentProps>(({ article, contentHtml }) => {
  const { articles, isLoading, error } = useArticles();

  if (error) {
    console.error('Error loading articles:', error);
    return (
      <ArticleContent
        article={article}
        contentHtml={contentHtml}
        nextArticle={null}
        prevArticle={null}
      />
    );
  }

  if (isLoading || !articles) {
    return <LoadingState />;
  }

  const currentIndex = articles.findIndex((a) => a.slug === article.slug);
  const nextArticle = currentIndex > -1 ? (articles[currentIndex + 1] ?? null) : null;
  const prevArticle = currentIndex > -1 ? (articles[currentIndex - 1] ?? null) : null;

  return (
    <ArticleContent
      article={article}
      contentHtml={contentHtml}
      nextArticle={nextArticle}
      prevArticle={prevArticle}
    />
  );
});

ArticleClientContent.displayName = 'ArticleClientContent';

export default ArticleClientContent;
