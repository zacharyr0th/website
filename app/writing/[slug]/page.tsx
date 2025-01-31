import { getArticle, getArticles, createArticle } from './articles';
import type { Article } from '../types';
import ArticleContent from './ArticleContent';
import { Suspense } from 'react';
import { LoadingState } from '../../lib/Loading';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: PageProps) {
  const slug = params?.slug;
  if (!slug) {
    notFound();
  }

  const rawArticle = await getArticle(slug);

  if (!rawArticle) {
    notFound();
  }

  const article = createArticle(rawArticle.frontmatter, rawArticle.content, slug);
  const articles = await getArticles();
  const currentIndex = articles.findIndex((a) => a.slug === slug);
  
  // Get next and previous articles with proper type assertions
  const hasNextArticle = currentIndex >= 0 && currentIndex < articles.length - 1;
  const hasPrevArticle = currentIndex > 0;
  
  const nextArticle: Article | null = hasNextArticle ? (articles[currentIndex + 1] as Article) : null;
  const prevArticle: Article | null = hasPrevArticle ? (articles[currentIndex - 1] as Article) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-surface/30">
      <main className="container mx-auto px-6 sm:px-8 pt-16 sm:pt-36 pb-24">
        <div style={{ maxWidth: 'var(--article-width)' }} className="mx-auto">
          <Suspense
            fallback={
              <LoadingState
                label="Loading article"
                height="h-[600px]"
                barCount={4}
                className="max-w-3xl mx-auto"
              />
            }
          >
            <ArticleContent
              article={article}
              contentHtml={rawArticle.processedContent}
              nextArticle={nextArticle}
              prevArticle={prevArticle}
            />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
