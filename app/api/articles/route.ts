import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { Article } from '@/lib/types';
import { logger, logError } from '@/lib/logger';
import { withMonitoring } from '@/lib/monitoring';

const articlesDirectory =
  process.env.ARTICLES_DIRECTORY || path.join(process.cwd(), 'public/articles');
const VALID_FILE_EXTENSION = '.md';
const MAX_DESCRIPTION_LENGTH = 160;
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || '1048576', 10);

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
  return withMonitoring('GET /api/articles', async () => {
    try {
      // Verify articles directory exists
      try {
        await fs.access(articlesDirectory);
      } catch (error) {
        logError(error, 'Articles directory not found');
        return NextResponse.json({ error: 'Articles directory not found' }, { status: 404 });
      }

      const articles = await getAllArticles();
      logger('info', `Successfully fetched ${articles.length} articles`);
      return NextResponse.json(articles);
    } catch (error) {
      logError(error, 'Error fetching articles');
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  });
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
  return withMonitoring('getAllArticles', async () => {
    const fileNames = await fs.readdir(articlesDirectory);
    const validFiles = fileNames.filter(
      (fileName) => fileName.endsWith(VALID_FILE_EXTENSION) && !fileName.includes('..')
    );

    const articles = await Promise.all(
      validFiles.map(async (fileName) => {
        try {
          const slug = fileName.replace(/\.md$/, '');
          const fullPath = path.join(articlesDirectory, fileName);

          // Validate file path
          const realPath = await fs.realpath(fullPath);
          if (!realPath.startsWith(await fs.realpath(articlesDirectory))) {
            throw new Error('Invalid file path');
          }

          // Check file size
          const stats = await fs.stat(fullPath);
          if (stats.size > MAX_FILE_SIZE) {
            throw new Error(`File ${fileName} exceeds maximum allowed size`);
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
          logError(error, `Error processing ${fileName}`);
          return null;
        }
      })
    );

    const validArticles = articles.filter(
      (article): article is ProcessedArticle => article !== null
    );

    return validArticles.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ) as Article[];
  });
}
