import { getArticle, getArticles, createArticle } from '../lib/articles';
import ArticleContent from '../components/ArticleContent';
import { Suspense } from 'react';
import { LoadingState } from '../../lib/Loading';

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
  const { slug } = params;
  const rawArticle = await getArticle(slug);

  if (!rawArticle) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-surface/30">
        <main className="container mx-auto px-6 sm:px-8 sm:pt-36 pb-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-lg text-text-secondary">Article not found</p>
          </div>
        </main>
      </div>
    );
  }

  const article = createArticle(rawArticle.frontmatter, rawArticle.content, slug);
  const articles = await getArticles();
  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-surface/30">
      <main className="container mx-auto px-6 sm:px-8 sm:pt-18 pb-24">
        <div style={{ maxWidth: 'var(--article-width)' }} className="mx-auto space-y-6">
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
              nextArticle={nextArticle ?? null}
              prevArticle={prevArticle ?? null}
            />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
