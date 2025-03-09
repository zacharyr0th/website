/**
 * Article content utilities
 * Functions for processing article content and retrieving specific articles
 */

import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';
import type { Article } from '../types';
import { getArticles, parseArticleFile, getArticleFiles } from './articleUtils';

/**
 * Get a single article by slug
 */
export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
  const files = await getArticleFiles();
  const filePath = files.find((file) => file.replace(/\.mdx?$/, '') === slug);

  if (!filePath) {
    return null;
  }

  return await parseArticleFile(filePath);
};

/**
 * Get adjacent articles (previous and next)
 */
export const getAdjacentArticles = async (
  slug: string
): Promise<{
  prevArticle: Article | null;
  nextArticle: Article | null;
}> => {
  const articles = await getArticles({ excludeDrafts: true });
  const currentIndex = articles.findIndex((article) => article.slug === slug);

  if (currentIndex === -1) {
    return { prevArticle: null, nextArticle: null };
  }

  // Ensure we handle the array bounds correctly
  const prevArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  const nextArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;

  return {
    prevArticle: prevArticle || null,
    nextArticle: nextArticle || null,
  };
};

/**
 * Process article content to HTML with enhanced typography support
 */
export const processArticleContent = async (content: string): Promise<string> => {
  const result = await remark()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug) // Add IDs to headings for anchor links
    .use(rehypePrism, { showLineNumbers: true }) // Syntax highlighting with line numbers
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  // Process the HTML to enhance typography
  let html = result.toString();
  
  // Add heading anchor links for better navigation
  html = html.replace(
    /<h([2-6]) id="([^"]+)">(.*?)<\/h\1>/g,
    '<h$1 id="$2"><a href="#$2" class="heading-anchor">$3</a></h$1>'
  );

  return html;
};

/**
 * Format a date for display
 */
export const formatArticleDate = (
  dateString: string,
  options?: Intl.DateTimeFormatOptions
): string => {
  const date = new Date(dateString);
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', options || defaultOptions);
};
