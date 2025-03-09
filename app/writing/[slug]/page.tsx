import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SECTION_METADATA, SITE_INFO } from '@/lib';
import { getArticleBySlug, getAdjacentArticles, processArticleContent } from '../lib';
import { ArticleContent } from '../components/ArticleContent';

export const dynamic = 'force-static';
export const revalidate = 3600; // 1 hour

interface Props {
  params: { slug: string };
}

const defaultMetadata: Metadata = {
  title: `Article Not Found | ${SECTION_METADATA.writing.title}`,
  description: 'The requested article could not be found.',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;
  
  try {
    const article = await getArticleBySlug(slug);
    if (!article) return defaultMetadata;

    return {
      title: `${article.title} | ${SECTION_METADATA.writing.title}`,
      description: article.description,
      openGraph: {
        title: article.title,
        description: article.description,
        type: 'article',
        publishedTime: article.date,
        url: `${SITE_INFO.url}/writing/${slug}`,
        images: article.image ? [
          {
            url: article.image.src,
            alt: article.image.alt,
          }
        ] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.description,
        images: article.image ? [article.image.src] : undefined,
      }
    };
  } catch (error) {
    return defaultMetadata;
  }
}

export default async function ArticlePage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;

  try {
    const article = await getArticleBySlug(slug);
    if (!article) notFound();

    const { prevArticle, nextArticle } = await getAdjacentArticles(slug);
    const contentHtml = await processArticleContent(article.content);

    return (
      <main className="py-8">
        <ArticleContent
          article={article}
          contentHtml={contentHtml}
          nextArticle={nextArticle}
          prevArticle={prevArticle}
        />
      </main>
    );
  } catch (error) {
    notFound();
  }
}
