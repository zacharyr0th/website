'use client';

import React, { memo } from 'react';
import { useArticles } from '../[slug]/hooks';
import ArticleContent from './ArticleContent';
import { LoadingState } from '@/components/misc/Loading';
import type { Article } from '../types';
import { containerVariants } from '@/lib/ui/animations';

interface ArticleClientContentProps {
  article: Article;
  contentHtml: string;
}

const ArticleClientContent = memo<ArticleClientContentProps>(({ article, contentHtml }) => {
  const { articles, isLoading, error } = useArticles();

  // If there's an error, still render the article but without navigation
  if (error) {
    console.error('Error loading articles:', error);
    return (
      <ErrorBoundary>
        <ArticleContent
          article={article}
          contentHtml={contentHtml}
          nextArticle={null}
          prevArticle={null}
          containerVariants={containerVariants}
        />
      </ErrorBoundary>
    );
  }

  if (isLoading || !articles) {
    return <LoadingState label="Loading article navigation" />;
  }

  const currentIndex = articles.findIndex((a) => a.slug === article.slug);
  const nextArticle = currentIndex > -1 ? (articles[currentIndex + 1] ?? null) : null;
  const prevArticle = currentIndex > -1 ? (articles[currentIndex - 1] ?? null) : null;

  return (
    <ErrorBoundary>
      <ArticleContent
        article={article}
        contentHtml={contentHtml}
        nextArticle={nextArticle}
        prevArticle={prevArticle}
        containerVariants={containerVariants}
      />
    </ErrorBoundary>
  );
});

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ArticleClientContent error:', error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-text-secondary">Please try refreshing the page</p>
        </div>
      );
    }
    return this.props.children;
  }
}

ArticleClientContent.displayName = 'ArticleClientContent';

export default ArticleClientContent;
