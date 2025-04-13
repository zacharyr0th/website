import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SECTION_METADATA, SITE_INFO } from '@/lib';
import { getArticleBySlug, getAdjacentArticles } from '../lib';
import { ArticleContent } from '../../../components/writing-page/ArticleContent';
import { MDXContent } from '../../../components/writing-page/MDXContent';
import RootLayoutClient from '../../../components/layout/RootLayoutClient';

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
  const { slug } = params;

  try {
    const article = await getArticleBySlug(slug);
    if (!article) return defaultMetadata;

    const { title, description, date, image } = article;

    return {
      title: `${title} | ${SECTION_METADATA.writing.title}`,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: date,
        url: `${SITE_INFO.url}/writing/${slug}`,
        images: image
          ? [
              {
                url: image.src,
                alt: image.alt,
              },
            ]
          : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: image ? [image.src] : undefined,
      },
    };
  } catch (error) {
    return defaultMetadata;
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = params;

  try {
    const article = await getArticleBySlug(slug);
    if (!article) notFound();

    const { prevArticle, nextArticle } = await getAdjacentArticles(slug);

    return (
      <RootLayoutClient width="wide" animate={true} contentClassName="prose prose-lg prose-invert">
        <ArticleContent article={article} nextArticle={nextArticle} prevArticle={prevArticle}>
          <MDXContent source={article.content} />
        </ArticleContent>
      </RootLayoutClient>
    );
  } catch (error) {
    console.error(`Error rendering article ${slug}:`, error);

    // Create a fallback article with basic information
    const fallbackArticle = {
      id: slug,
      slug,
      title: `Article Error: ${slug}`,
      content: '',
      link: `/writing/${slug}`,
      frontmatter: {
        title: `Article Error: ${slug}`,
        date: new Date().toISOString(),
        description: 'This article has formatting issues and is being fixed.',
        category: null,
        tags: [],
        image: null,
        featured: false,
        draft: true,
        takeaways: null,
      },
      description: 'This article has formatting issues and is being fixed.',
      date: new Date().toISOString(),
      category: null,
      tags: [],
      image: null,
      takeaways: null,
    };

    return (
      <RootLayoutClient width="wide" animate={true}>
        <ArticleContent article={fallbackArticle} nextArticle={null} prevArticle={null}>
          <div className="prose">
            <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-md my-8">
              <h2 className="text-lg font-medium text-yellow-800 dark:text-yellow-200">
                Article Error
              </h2>
              <p className="text-yellow-700 dark:text-yellow-300">
                We encountered an issue with this article&apos;s formatting. Our team has been
                notified and is working on a fix.
              </p>
              <p className="text-yellow-700 dark:text-yellow-300 mt-2">
                Error details: {(error as Error)?.message || 'Unknown error'}
              </p>
            </div>
          </div>
        </ArticleContent>
      </RootLayoutClient>
    );
  }
}
