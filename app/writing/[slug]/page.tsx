import { notFound } from 'next/navigation';
import { createArticleFromFrontmatter } from '../articles';
import ArticleContent from './ArticleContent';
import type { Metadata } from 'next';
import type { Article } from '../types';
import { getArticle, getAllArticles } from '../../lib/staticArticles';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = String(resolvedParams.slug);
  const article = await getArticle(slug);
  
  if (!article) {
    return {
      title: 'Article Not Found | Writing | Zachary Roth',
    };
  }

  const ogImage = typeof article.frontmatter.image === 'string'
    ? { url: article.frontmatter.image }
    : article.frontmatter.image?.src
      ? { url: article.frontmatter.image.src, alt: article.frontmatter.image.alt }
      : undefined;

  return {
    title: `${article.frontmatter.title} | Writing | Zachary Roth`,
    description: article.frontmatter.description,
    openGraph: ogImage ? { images: [ogImage] } : undefined,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = String(resolvedParams.slug);

  try {
    const article = await getArticle(slug);
    if (!article) {
      notFound();
    }

    const { frontmatter, content, processedContent } = article;
    const processedArticle = createArticleFromFrontmatter(frontmatter, content, slug);

    // Get adjacent articles
    const allArticles = await getAllArticles();
    const currentIndex = allArticles.findIndex((a: Article) => a?.slug === slug);
    const nextArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : undefined;
    const prevArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : undefined;

    return (
      <div className="content-page font-mono bg-gradient-to-b from-background to-surface/30">
        <main className="container mx-auto px-3 sm:px-6 md:px-8 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-20 md:pb-28 max-w-[98vw] md:max-w-[90vw]">
          <div className="mx-auto max-w-[var(--article-width)]">
            <ArticleContent 
              article={processedArticle} 
              contentHtml={processedContent}
              nextArticle={nextArticle ?? undefined}
              prevArticle={prevArticle ?? undefined}
            />
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}

export async function generateStaticParams() {
  const allArticles = await getAllArticles();
  return allArticles.map((article: Article) => ({
    slug: article.slug,
  }));
}
