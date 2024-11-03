import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { notFound } from 'next/navigation';
import ArticleContent from '@/app/writing/[slug]/ArticleContent';
import type { Article } from '@/lib/types';

const articlesDirectory = path.join(process.cwd(), 'public/articles');

export default async function Article({ params: { slug } }: { params: { slug: string } }) {
  try {
    const fileContents = await fs.readFile(path.join(articlesDirectory, `${slug}.md`), 'utf8');
    const { data, content } = matter(fileContents);
    
    // Cast frontmatter to match Article's frontmatter structure
    const frontmatter = data as Article['frontmatter'];

    const article: Article = {
      id: slug,
      slug,
      title: frontmatter.title,
      subtitle: frontmatter.subtitle || 'No subtitle available',
      description: frontmatter.description || content.slice(0, 150) + '...',
      content: await marked.parse(content),
      image: {
        src: frontmatter.image || '/misc/placeholder.webp',
        alt: frontmatter.imageAlt || frontmatter.title,
      },
      category: frontmatter.category || 'Uncategorized',
      date: frontmatter.date,
      tags: frontmatter.tags || [],
      link: `/writing/${slug}`,
      frontmatter: {
        title: frontmatter.title,
        date: frontmatter.date,
        featured: frontmatter.featured || false,
        ...(frontmatter.subtitle && { subtitle: frontmatter.subtitle }),
        ...(frontmatter.description && { description: frontmatter.description }),
        ...(frontmatter.image && { image: frontmatter.image }),
        ...(frontmatter.imageAlt && { imageAlt: frontmatter.imageAlt }),
        ...(frontmatter.category && { category: frontmatter.category }),
        ...(frontmatter.tags && { tags: frontmatter.tags }),
      },
    };

    return <ArticleContent article={article} />;
  } catch (error) {
    console.error(`Error loading article: ${error}`);
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const fileNames = await fs.readdir(articlesDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => ({
        slug: fileName.replace(/\.md$/, ''),
      }));
  } catch (error) {
    console.error(`Error generating static params: ${error}`);
    return [];
  }
}