/**
 * Unified Article Management System
 * Combines article processing, caching, and hooks for efficient article management
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import remarkImages from 'remark-images';
import remarkParse from 'remark-parse';
import useSWR from 'swr';
import { useMemo, useCallback } from 'react';
import type {
  Article,
  ArticleFrontmatter,
  RawFrontmatter,
  ArticleCache,
  ArticleImage,
  ArticleCategory,
  ArticleTag,
} from '../types';
import { ARTICLE_CONFIG, CATEGORIES, TAGS } from '../types';

// Constants and Types
const articlesDirectory = path.join(process.cwd(), ARTICLE_CONFIG.directory);
let articleCache: ArticleCache | null = null;

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

// Add new utility function for string sanitization
const sanitizeString = (str: string): string => {
  return str
    .trim()
    // Normalize quotes and apostrophes
    .replace(/['']/g, "'")
    .replace(/[""]/g, '"')
    // Convert HTML entities to their actual characters
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
};

export const validateFrontmatter = (data: unknown): ArticleFrontmatter => {
  const rawData = data as RawFrontmatter;
  
  // Required field validation with descriptive errors
  if (!rawData.title) throw new Error('Title is required in frontmatter');
  if (!rawData.date) throw new Error('Date is required in frontmatter');
  if (!rawData.description && !rawData.subtitle) throw new Error('Description or subtitle is required in frontmatter');
  
  // Title length validation with sanitized string
  const sanitizedTitle = sanitizeString(rawData.title);
  if (sanitizedTitle.length > ARTICLE_CONFIG.limits.title) {
    throw new Error(`Title is too long: ${sanitizedTitle.length} chars (max ${ARTICLE_CONFIG.limits.title})`);
  }

  // Ensure date is in UTC format
  let utcDate: Date;
  try {
    const date = new Date(rawData.date);
    utcDate = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        12 // Set to noon UTC to avoid timezone issues
      )
    );
    if (isNaN(utcDate.getTime())) {
      throw new Error('Invalid date');
    }
  } catch (error) {
    throw new Error(`Invalid date format in frontmatter: ${rawData.date}`);
  }
  const formattedDate = utcDate.toISOString();

  // Description validation with sanitized string
  const description = sanitizeString(rawData.description || rawData.subtitle || '');
  if (description && description.length > ARTICLE_CONFIG.limits.description) {
    throw new Error(
      `Description is too long: ${description.length} chars (max ${ARTICLE_CONFIG.limits.description})`
    );
  }

  // Category validation with helpful error message
  let category: ArticleCategory | null = null;
  if (rawData.category) {
    const sanitizedCategory = sanitizeString(rawData.category);
    if (!CATEGORIES.includes(sanitizedCategory as ArticleCategory)) {
      throw new Error(
        `Invalid category "${sanitizedCategory}". Must be one of: ${CATEGORIES.join(', ')}`
      );
    }
    category = sanitizedCategory as ArticleCategory;
  }

  // Tags validation and normalization with sanitization
  const tags = new Set<ArticleTag>();
  if (rawData.tags && Array.isArray(rawData.tags)) {
    for (const tag of rawData.tags) {
      if (typeof tag !== 'string') {
        throw new Error(`Invalid tag type: ${typeof tag}. Tags must be strings`);
      }
      const sanitizedTag = sanitizeString(tag).toLowerCase();
      if (!TAGS.includes(sanitizedTag as ArticleTag)) {
        throw new Error(
          `Invalid tag "${sanitizedTag}". Must be one of: ${TAGS.join(', ')}`
        );
      }
      tags.add(sanitizedTag as ArticleTag);
    }
  }

  // Takeaways validation with sanitization
  const takeaways = rawData.takeaways 
    ? rawData.takeaways
        .map(takeaway => {
          if (typeof takeaway !== 'string') {
            console.warn(`Invalid takeaway type: ${typeof takeaway}. Takeaways must be strings`);
            return null;
          }
          return sanitizeString(takeaway);
        })
        .filter((t): t is string => t !== null)
    : null;

  // Image validation and sanitization
  const image = rawData.image ? transformImage(
    typeof rawData.image === 'string' 
      ? sanitizeString(rawData.image)
      : {
          src: sanitizeString(rawData.image.src),
          alt: rawData.image.alt ? sanitizeString(rawData.image.alt) : ''
        },
    sanitizedTitle
  ) : null;

  return {
    title: sanitizedTitle,
    date: formattedDate,
    description: description,
    category,
    tags: Array.from(tags),
    image,
    featured: Boolean(rawData.featured),
    draft: Boolean(rawData.draft),
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
    const fileContents = await fs.readFile(filePath, 'utf8');
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
    now - articleCache.timestamp < ARTICLE_CONFIG.cache.revalidate
  ) {
    return articleCache.articles;
  }

  try {
    const fileNames = await fs.readdir(articlesDirectory);
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

// Hooks
const CACHE_CONFIG = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshInterval: ARTICLE_CONFIG.cache.revalidate,
  dedupingInterval: ARTICLE_CONFIG.cache.staleWhileRevalidate,
} as const;

const fetchArticles = async (): Promise<Article[]> => {
  const response = await fetch('/api/articles', {
    headers: { Accept: 'application/json' },
    next: { revalidate: ARTICLE_CONFIG.cache.revalidate / 1000 },
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error('Invalid response format');
  return data;
};

export const useArticles = () => {
  const { data, error, isLoading, mutate } = useSWR<Article[], Error>(
    '/api/articles',
    fetchArticles,
    CACHE_CONFIG
  );

  return {
    articles: data || [],
    isLoading,
    error,
    refreshArticles: () => mutate(),
    lastUpdated: data ? new Date() : null,
  };
};

const seededShuffle = <T>(array: T[], seed: number): T[] => {
  const shuffled = [...array];
  let currentIndex = shuffled.length;
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(seededRandom() * currentIndex);
    currentIndex -= 1;
    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex]!,
      shuffled[currentIndex]!,
    ];
  }

  return shuffled;
};

const filterArticles = (articles: Article[], primaryArticleId: string): Article[] =>
  articles.filter(
    (article) =>
      !article.frontmatter.featured && article.id !== primaryArticleId && !article.frontmatter.draft
  );

export const useRandomArticles = (articles: Article[], primaryArticleId: string) => {
  const availableArticles = useMemo(
    () => filterArticles(articles, primaryArticleId),
    [articles, primaryArticleId]
  );

  const getRandomArticles = useCallback(
    (seed: number = Date.now()) => {
      if (availableArticles.length === 0) {
        console.warn('No articles available for randomization');
        return [];
      }

      return seededShuffle(availableArticles, seed).slice(
        0,
        Math.min(ARTICLE_CONFIG.pagination.featuredCount, availableArticles.length)
      );
    },
    [availableArticles]
  );

  return {
    randomArticles: useMemo(() => getRandomArticles(), [getRandomArticles]),
    refreshRandomArticles: () => getRandomArticles(Date.now()),
    isLoading: false,
  };
};
