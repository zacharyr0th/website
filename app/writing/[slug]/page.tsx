import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { notFound } from 'next/navigation';
import ArticleContent from '@/app/writing/[slug]/ArticleContent';
import type { Article, AdjacentArticle, ArticleFrontmatter } from '../types';

const articlesDirectory = path.join(process.cwd(), 'public/articles');

async function getAdjacentArticles(
  currentSlug: string
): Promise<{ prev: AdjacentArticle | null; next: AdjacentArticle | null }> {
  const files = await fs.readdir(articlesDirectory);
  const articles = await Promise.all(
    files
      .filter((file) => file.endsWith('.md'))
      .map(async (file) => {
        const content = await fs.readFile(path.join(articlesDirectory, file), 'utf8');
        const { data } = matter(content) as { data: { date: string; title: string } };
        return {
          slug: file.replace(/\.md$/, ''),
          date: data.date,
          title: data.title,
        } as AdjacentArticle;
      })
  );

  // Sort articles by date, newest first
  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const currentIndex = articles.findIndex((article) => article.slug === currentSlug);

  return {
    prev: currentIndex < articles.length - 1 ? articles[currentIndex + 1] ?? null : null,
    next: currentIndex > 0 ? articles[currentIndex - 1] ?? null : null,
  };
}

export default async function ArticlePage({ params: { slug } }: { params: { slug: string } }) {
  try {
    const fileContents = await fs.readFile(path.join(articlesDirectory, `${slug}.md`), 'utf8');
    const { data, content } = matter(fileContents);

    if (!data) {
      throw new Error('No frontmatter found in article');
    }

    // Type assertion with validation
    const frontmatter = data as ArticleFrontmatter;

    // Get adjacent articles
    const adjacentArticles = await getAdjacentArticles(slug);

    // Convert markdown to HTML
    const htmlContent = await marked(content);

    const article: Article = {
      id: slug,
      slug,
      title: frontmatter.title,
      description: frontmatter.description || '',
      content: htmlContent,
      image: {
        src: frontmatter.image || '/misc/placeholder.webp',
        alt: frontmatter.imageAlt || frontmatter.title,
      },
      category: frontmatter.category || 'Uncategorized',
      date: frontmatter.date,
      link: `/writing/${slug}`,
      frontmatter,
      ...(frontmatter.subtitle && { subtitle: frontmatter.subtitle }),
      ...(frontmatter.tags && {
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [frontmatter.tags],
      }),
      ...(adjacentArticles && { adjacentArticles }),
    };

    return <ArticleContent article={article} />;
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const fileNames = await fs.readdir(articlesDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => ({
        slug: fileName.replace(/\.md$/, ''),
      }));
  } catch (error) {
    console.error(`Error generating static params: ${error}`);
    return [];
  }
}
