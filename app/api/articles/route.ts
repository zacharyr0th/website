import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { Article } from '@/lib/types';

const articlesDirectory = path.join(process.cwd(), 'public/articles');
const VALID_FILE_EXTENSION = '.md';
const MAX_DESCRIPTION_LENGTH = 160;

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

type ProcessedArticle = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  image: {
    src: string;
    alt: string;
  };
  category: string;
  date: string;
  tags: string[];
  link: string;
  frontmatter: {
    title: string;
    date: string;
    featured: boolean;
  };
};

export async function GET() {
  try {
    // Verify articles directory exists
    try {
      await fs.access(articlesDirectory);
    } catch {
      console.error('Articles directory not found:', articlesDirectory);
      return NextResponse.json({ error: 'Articles directory not found' }, { status: 404 });
    }

    const articles = await getAllArticles();
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

function sanitizeContent(content: string): string {
  // Remove HTML tags and normalize whitespace
  return content
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function createDescription(content: string, frontmatterDescription?: string): string {
  if (frontmatterDescription) {
    return frontmatterDescription.slice(0, MAX_DESCRIPTION_LENGTH);
  }
  const sanitizedContent = sanitizeContent(content);
  return sanitizedContent.length > MAX_DESCRIPTION_LENGTH
    ? sanitizedContent.slice(0, MAX_DESCRIPTION_LENGTH) + '...'
    : sanitizedContent;
}

async function getAllArticles(): Promise<Article[]> {
  const fileNames = await fs.readdir(articlesDirectory);
  const validFiles = fileNames.filter(
    (fileName) => fileName.endsWith(VALID_FILE_EXTENSION) && !fileName.includes('..')
  );

  const articles = await Promise.all(
    validFiles.map(async (fileName) => {
      try {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(articlesDirectory, fileName);

        const realPath = await fs.realpath(fullPath);
        if (!realPath.startsWith(await fs.realpath(articlesDirectory))) {
          throw new Error('Invalid file path');
        }

        const fileContents = await fs.readFile(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        const frontmatter = matterResult.data as Frontmatter;
        const { content } = matterResult;

        if (!frontmatter.title || typeof frontmatter.title !== 'string') {
          throw new Error(`Invalid or missing title in ${fileName}`);
        }
        if (!frontmatter.date || !isValidDate(frontmatter.date)) {
          throw new Error(`Invalid or missing date in ${fileName}`);
        }

        const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];

        const processedArticle: ProcessedArticle = {
          id: slug,
          slug,
          title: frontmatter.title.trim(),
          description: createDescription(content, frontmatter.description),
          content: sanitizeContent(content),
          image: {
            src: frontmatter.image || '/public/misc/placeholder.webp',
            alt: (frontmatter.imageAlt || frontmatter.title).trim(),
          },
          category: (frontmatter.category || 'Uncategorized').trim(),
          date: frontmatter.date,
          tags: tags.map((tag) => tag.trim()),
          link: `/writing/${encodeURIComponent(slug)}`,
          frontmatter: {
            title: frontmatter.title.trim(),
            date: frontmatter.date,
            featured: Boolean(frontmatter.featured),
          },
        };

        return processedArticle;
      } catch (error) {
        console.error(`Error processing ${fileName}:`, error);
        return null;
      }
    })
  );

  // Filter out nulls and sort by date
  const validArticles = articles.filter((article): article is ProcessedArticle => article !== null);

  return validArticles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  ) as Article[];
}
