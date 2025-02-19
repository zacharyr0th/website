import path from 'path';
import matter from 'gray-matter';
import type { Article, ArticleCategory, ArticleTag } from '../components/articles/types';
import { processMarkdown } from '@/bio/lib/markdown';

// Disable the security/detect-non-literal-fs-filename rule for this file since we're
// implementing a secure file reading mechanism with proper path validation
/* eslint-disable security/detect-non-literal-fs-filename */
import { readFile, readdir } from 'fs/promises';

// Get the articles directory path
function getArticlesDir(): string {
  return path.join(process.cwd(), 'public/articles');
}

// Read a single article file
async function readArticleFile(filePath: string): Promise<Article | null> {
  try {
    const content = await readFile(filePath, 'utf-8');
    const { data, content: articleContent } = matter(content);
    const slug = path.basename(filePath, '.md');

    // Process markdown content to HTML
    const processedContent = await processMarkdown(articleContent);

    // Validate and transform the frontmatter data
    const category = data.category as ArticleCategory | null;
    const tags = (data.tags || []) as ArticleTag[];

    return {
      slug,
      title: data.title,
      date: data.date,
      content: processedContent,
      description: data.description || '',
      category,
      tags,
      image: data.image || null,
      featured: data.featured || false,
      draft: data.draft || false,
      takeaways: data.takeaways || null,
      link: `/writing/${slug}`,
    };
  } catch (error) {
    console.error(`Error reading article file ${filePath}:`, error);
    return null;
  }
}

export async function readArticlesFromFilesystem(options: {
  excludeDrafts?: boolean;
  featured?: boolean;
  category?: ArticleCategory;
  tag?: ArticleTag;
  limit?: number;
  offset?: number;
}): Promise<Article[]> {
  try {
    const articlesDir = getArticlesDir();
    const resolvedArticlesDir = path.resolve(articlesDir);

    // Get list of markdown files
    const files = await readdir(resolvedArticlesDir);
    const markdownFiles = files.filter((file) => file.endsWith('.md'));

    // Read all articles in parallel
    const articles = await Promise.all(
      markdownFiles.map(async (file) => {
        const filePath = path.join(resolvedArticlesDir, file);
        // Ensure the file path is within the articles directory
        if (!filePath.startsWith(resolvedArticlesDir)) {
          console.error('Invalid file path:', filePath);
          return null;
        }
        return readArticleFile(filePath);
      })
    );

    // Filter and sort articles
    const validArticles = articles
      .filter((article): article is Article => article !== null)
      .filter((article) => !options.excludeDrafts || !article.draft)
      .filter((article) => !options.featured || article.featured)
      .filter((article) => !options.category || article.category === options.category)
      .filter((article) => !options.tag || article.tags.includes(options.tag))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Apply pagination
    let result = validArticles;
    if (typeof options.offset === 'number' && options.offset > 0) {
      result = result.slice(options.offset);
    }
    if (typeof options.limit === 'number' && options.limit > 0) {
      result = result.slice(0, options.limit);
    }

    return result;
  } catch (error) {
    console.error('Error reading articles from filesystem:', error);
    return [];
  }
}

// Read a single article by slug
export async function readArticleFromFilesystem(slug: string): Promise<Article | null> {
  try {
    const articlesDir = getArticlesDir();
    const resolvedArticlesDir = path.resolve(articlesDir);
    const filePath = path.join(resolvedArticlesDir, `${slug}.md`);

    // Ensure the file path is within the articles directory
    if (!filePath.startsWith(resolvedArticlesDir)) {
      console.error('Invalid file path:', filePath);
      return null;
    }

    return readArticleFile(filePath);
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

// Get adjacent articles from filesystem
export async function getAdjacentArticlesFromFilesystem(
  currentSlug: string
): Promise<{ next: Article | null; prev: Article | null }> {
  try {
    const articles = await readArticlesFromFilesystem({ excludeDrafts: true });
    const sortedArticles = articles.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const currentIndex = sortedArticles.findIndex((article) => article.slug === currentSlug);
    if (currentIndex === -1) return { next: null, prev: null };

    const nextArticle = currentIndex > 0 ? sortedArticles[currentIndex - 1] : null;
    const prevArticle =
      currentIndex < sortedArticles.length - 1 ? sortedArticles[currentIndex + 1] : null;

    return {
      next: nextArticle ?? null,
      prev: prevArticle ?? null,
    };
  } catch (error) {
    console.error('Error getting adjacent articles:', error);
    return { next: null, prev: null };
  }
}
