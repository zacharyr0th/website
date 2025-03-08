/**
 * Unified Article Management System
 * Combines article processing, caching, and hooks for efficient article management
 */

import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import remarkParse from 'remark-parse';
import { promisify } from 'util';
import { ARTICLE_CONFIG, CATEGORIES, TAGS } from '../types';
import type {
  Article,
  ArticleFrontmatter,
  RawFrontmatter,
  ArticleImage,
  ArticleCategory,
  ArticleTag,
} from '../types';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import remarkImages from 'remark-images';

// Constants and Types
const articlesDirectory = path.join(process.cwd(), ARTICLE_CONFIG.directory);

// Define a local ArticleCache type that matches how we're using it
interface LocalArticleCache {
  articles: readonly Article[];
  timestamp: number;
}

let articleCache: LocalArticleCache | null = null;

// Promisify fs functions we need
const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);

// Utility Functions
const transformImage = (
  image: string | { src: string; alt?: string } | undefined,
  defaultAlt: string
): ArticleImage | null => {
  if (!image) return null;
  if (typeof image === 'string') {
    return {
      src: image,
      alt: `Featured image for article: ${defaultAlt}`,
    };
  }
  return {
    src: image.src,
    alt: image.alt || `Featured image for article: ${defaultAlt}`,
  };
};

export const validateFrontmatter = (data: unknown): ArticleFrontmatter => {
  const rawData = data as RawFrontmatter;
  if (!rawData.title) throw new Error('Title is required');
  if (!rawData.date) throw new Error('Date is required');
  if (!rawData.description && !rawData.subtitle) throw new Error('Description is required');
  if (rawData.title.length > ARTICLE_CONFIG.limits.title) {
    throw new Error(`Title is too long (max ${ARTICLE_CONFIG.limits.title} characters)`);
  }

  // Ensure date is in UTC format
  const date = new Date(rawData.date);
  const utcDate = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      12 // Set to noon UTC to avoid timezone issues
    )
  );
  const formattedDate = utcDate.toISOString();

  const description = rawData.description || rawData.subtitle;
  if (description && description.length > ARTICLE_CONFIG.limits.description) {
    throw new Error(
      `Description is too long (max ${ARTICLE_CONFIG.limits.description} characters)`
    );
  }

  const category =
    rawData.category && CATEGORIES.includes(rawData.category as ArticleCategory)
      ? (rawData.category as ArticleCategory)
      : null;

  const tags =
    rawData.tags && Array.isArray(rawData.tags)
      ? Array.from(
          new Set(
            rawData.tags
              .filter((tag): tag is string => typeof tag === 'string')
              .map((tag) => tag.toLowerCase())
              .filter((tag): tag is ArticleTag => TAGS.includes(tag as ArticleTag))
          )
        )
      : [];

  const takeaways =
    rawData.takeaways?.filter((takeaway): takeaway is string => typeof takeaway === 'string') ||
    null;

  return {
    title: rawData.title,
    date: formattedDate,
    description: description || '',
    category,
    tags,
    image: transformImage(rawData.image, rawData.title),
    featured: rawData.featured || false,
    draft: rawData.draft || false,
    takeaways,
  };
};

export const createArticle = (
  frontmatter: ArticleFrontmatter,
  content: string,
  slug: string
): Article => ({
  id: slug,
  slug,
  title: frontmatter.title,
  content,
  date: frontmatter.date,
  link: `/writing/${slug}`,
  description: frontmatter.description,
  category: frontmatter.category,
  tags: frontmatter.tags,
  image: frontmatter.image,
  frontmatter,
  takeaways: frontmatter.takeaways,
});

// Markdown Processing
const processMarkdown = async (content: string): Promise<string> => {
  const result = await remark()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkImages)
    .use(html)
    .process(content);

  return result
    .toString()
    .replace(/<img/g, '<img class="responsive-image" loading="lazy"')
    .replace(/<figure/g, '<figure class="image-figure"')
    .replace(/<figcaption/g, '<figcaption class="image-caption"')
    .replace(
      /<pre><code class="language-(\w+)">/g,
      (_, lang) => `<pre><code class="language-${lang} syntax-highlighted">`
    );
};

// Article Retrieval Functions
export const getArticle = async (slug: string) => {
  try {
    const filePath = path.join(articlesDirectory, `${slug}.md`);
    const fileContents = await readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const validatedFrontmatter = validateFrontmatter(data);
    const processedContent = await processMarkdown(content);
    return { frontmatter: validatedFrontmatter, content, processedContent };
  } catch (error) {
    console.error(`Error loading article ${slug}:`, error);
    return null;
  }
};

export const getArticles = async (forceRefresh = false): Promise<readonly Article[]> => {
  const now = Date.now();
  if (
    !forceRefresh &&
    articleCache &&
    typeof articleCache.timestamp === 'number' &&
    now - articleCache.timestamp < ARTICLE_CONFIG.cache.revalidate
  ) {
    return articleCache.articles;
  }

  try {
    const fileNames = await readdir(articlesDirectory);
    const articles = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map(async (fileName) => {
          try {
            const slug = fileName.replace(/\.md$/, '');
            const article = await getArticle(slug);
            if (!article || (process.env.NODE_ENV === 'production' && article.frontmatter.draft)) {
              return null;
            }
            return createArticle(article.frontmatter, article.content, slug);
          } catch (error) {
            console.error(`Error processing article ${fileName}:`, error);
            return null;
          }
        })
    );

    const validArticles = articles
      .filter((article): article is Article => article !== null)
      .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

    articleCache = { articles: validArticles, timestamp: now };
    return validArticles;
  } catch (error) {
    console.error('Error reading articles:', error);
    return [];
  }
};

export const getFeaturedArticles = async (): Promise<readonly Article[]> => {
  const articles = await getArticles();
  return articles
    .filter((article) => article.frontmatter.featured)
    .slice(0, ARTICLE_CONFIG.pagination.featuredCount);
};
