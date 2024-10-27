import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { Article } from '@/lib/types';

const articlesDirectory = path.join(process.cwd(), 'public/articles');

export async function GET() {
  try {
    const articles = await getAllArticles();
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

async function getAllArticles(): Promise<Article[]> {
  const fileNames = await fs.readdir(articlesDirectory);
  const allArticles = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = await fs.readFile(fullPath, 'utf8');
      const { data: frontmatter, content } = matter(fileContents);

      return {
        id: slug,
        slug,
        title: frontmatter.title,
        excerpt: frontmatter.excerpt || content.slice(0, 150) + '...',
        content,
        image: {
          src: frontmatter.image || '/public/misc/placeholder.webp',
          alt: frontmatter.imageAlt || frontmatter.title,
        },
        category: frontmatter.category || 'Uncategorized',
        date: frontmatter.date,
        link: `/writing/${slug}`,
        frontmatter,
      };
    })
  );

  return allArticles.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
}