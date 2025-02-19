'use client';

import React, { memo } from 'react';
import ArticleContent from './ArticleContent';
import type { Article } from './types';

interface ArticleClientContentProps {
  article: Article;
  contentHtml: string;
}

const ArticleClientContent = memo<ArticleClientContentProps>(({ article, contentHtml }) => {
  return <ArticleContent article={article} contentHtml={contentHtml} />;
});

ArticleClientContent.displayName = 'ArticleClientContent';

export default ArticleClientContent;
