import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { notFound } from 'next/navigation';
import ArticleContent from '@/app/writing/[slug]/ArticleContent';
import type { Article } from '@/lib/types';

interface Frontmatter {
  title: string;
  date: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  category?: string;
  featured?: boolean;
  tags?: string[];
}

interface ArticleProps {
  params: {
    slug: string;
  };
}

export default async function Article({ params }: ArticleProps) {
  const { slug } = params;
  const articlesDirectory = path.join(process.cwd(), 'public/articles');
  const fullPath = path.join(articlesDirectory, `${slug}.md`);

  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const frontmatter = data as Frontmatter;

    const htmlContent = await marked.parse(content);

    const article: Article = {
      id: slug,
      slug,
      title: frontmatter.title,
      description: frontmatter.description || content.slice(0, 150) + '...',
      content: htmlContent,
      image: {
        src: frontmatter.image || '/misc/placeholder.webp',
        alt: frontmatter.imageAlt || frontmatter.title,
      },
      category: frontmatter.category || 'Uncategorized',
      date: frontmatter.date,
      tags: frontmatter.tags || [],
      link: `/writing/${slug}`,
      frontmatter: {
        ...frontmatter,
        featured: frontmatter.featured || false,
      },
    };

    return <ArticleContent article={article} />;
  } catch (error) {
    console.error(`Error loading article: ${error}`);
    notFound();
  }
}

export async function generateStaticParams() {
  const articlesDirectory = path.join(process.cwd(), 'public/articles');

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
