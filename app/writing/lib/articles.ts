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
import type {
  Article,
  ArticleFrontmatter,
  RawFrontmatter,
  ArticleCache,
  ArticleImage,
  ArticleCategory,
  ArticleTag,
} from '../types';
import { ARTICLE_CONFIG } from '../types';

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

const validateFrontmatter = (data: RawFrontmatter): ArticleFrontmatter => {
  const title = data.title?.trim();
  if (!title) throw new Error('Article title is required');

  const date = data.date || new Date().toISOString().split('T')[0];
  if (!date) throw new Error('Article date is required');

  const description = data.description?.trim() || data.subtitle?.trim() || '';
  const category = (data.category?.toLowerCase() || null) as ArticleCategory | null;
  const tags = (data.tags || []).map((tag) => tag.toLowerCase()) as ArticleTag[];
  const image = transformImage(data.image, title);
  const featured = data.featured || false;
  const draft = data.draft || false;
  const takeaways = data.takeaways || null;

  return {
    title,
    date,
    description,
    category,
    tags,
    image,
    featured,
    draft,
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
    const validatedFrontmatter = validateFrontmatter(data as RawFrontmatter);
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
