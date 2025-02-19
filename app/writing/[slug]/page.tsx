import { notFound } from 'next/navigation';
import ArticleContent from '@/writing/components/articles/ArticleContent';
import type { Metadata } from 'next';
import { SECTION_METADATA } from '@/lib/config/metadata';
import PageLayout from '@/components/layout/PageLayout';
import { readArticleFromFilesystem, getAdjacentArticlesFromFilesystem } from '@/writing/lib/server';

export const dynamic = 'force-static';
export const revalidate = 3600; // 1 hour

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const defaultMetadata: Metadata = {
  title: `Article Not Found | ${SECTION_METADATA.writing.title}`,
  description: 'The requested article could not be found.',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  try {
    const article = await readArticleFromFilesystem(slug);
    if (!article) return defaultMetadata;

    const metadata: Metadata = {
      title: `${article.title} | ${SECTION_METADATA.writing.title}`,
      description: article.description,
      openGraph: {
        title: article.title,
        description: article.description,
        type: 'article',
        publishedTime: article.date,
        images: article.image
          ? [
              {
                url: article.image.src,
                width: 1200,
                height: 675,
                alt: article.image.alt || article.title,
              },
            ]
          : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.description,
        images: article.image ? [article.image.src] : undefined,
      },
    };

    if (article.tags?.length) {
      metadata.keywords = [...article.tags];
    }

    return metadata;
  } catch (error) {
    console.error('Error generating metadata:', error);
    return defaultMetadata;
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await Promise.resolve(params);

  try {
    const [article, { next, prev }] = await Promise.all([
      readArticleFromFilesystem(slug),
      getAdjacentArticlesFromFilesystem(slug),
    ]);

    if (!article) {
      notFound();
    }

    return (
      <PageLayout>
        <ArticleContent
          article={article}
          contentHtml={article.content}
          nextArticle={next}
          prevArticle={prev}
        />
      </PageLayout>
    );
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}
