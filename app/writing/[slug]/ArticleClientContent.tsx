'use client';

import { useArticles } from './hooks';
import ArticleContent from './ArticleContent';
import { LoadingState } from '../../lib/Loading';
import type { Article } from '../types';

interface ArticleClientContentProps {
  article: Article;
  contentHtml: string;
}

export default function ArticleClientContent({ article, contentHtml }: ArticleClientContentProps) {
  const { articles, isLoading } = useArticles();

  if (isLoading || !articles) {
    return (
      <LoadingState
        label="Loading article"
        height="h-[600px]"
        barCount={4}
        className="max-w-3xl mx-auto"
      />
    );
  }

  const currentIndex = articles.findIndex((a) => a.slug === article.slug);
  const nextArticle = (
    currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null
  ) as Article | null;
  const prevArticle = (currentIndex > 0 ? articles[currentIndex - 1] : null) as Article | null;

  return (
    <ArticleContent
      article={article}
      contentHtml={contentHtml}
      nextArticle={nextArticle}
      prevArticle={prevArticle}
    />
  );
}
