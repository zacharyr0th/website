import { getArticle, getArticles } from '@/writing/lib/articles';
import type { Article } from '../types';
import ArticleContent from './ArticleContent';
import { Suspense } from 'react';
import { LoadingState } from '../../lib/Loading';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SECTION_METADATA } from '../../lib/metadata';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  if (!slug) {
    return {};
  }

  const article = await getArticle(slug);
  
  if (!article) {
    return {};
  }

  const { frontmatter } = article;
  const ogImage = frontmatter.image ? {
    url: frontmatter.image.src,
    width: 1200,
    height: 630,
    alt: frontmatter.image.alt,
  } : undefined;

  const title = `${frontmatter.title} | ${SECTION_METADATA.writing.title}`;

  return {
    title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: 'article',
      publishedTime: frontmatter.date,
      authors: [SECTION_METADATA.writing.title],
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: ogImage ? [ogImage.url] : undefined,
    },
    alternates: {
      canonical: `/writing/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage(props: Props) {
  const { params } = props;
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  if (!slug) {
    notFound();
  }

  const rawArticle = await getArticle(slug);

  if (!rawArticle) {
    notFound();
  }

  const article: Article = {
    id: slug,
    slug,
    title: rawArticle.frontmatter.title,
    content: rawArticle.content,
    date: rawArticle.frontmatter.date,
    link: `/writing/${slug}`,
    description: rawArticle.frontmatter.description,
    category: rawArticle.frontmatter.category,
    tags: rawArticle.frontmatter.tags,
    image: rawArticle.frontmatter.image,
    frontmatter: rawArticle.frontmatter,
    takeaways: rawArticle.frontmatter.takeaways,
  };

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
