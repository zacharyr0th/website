import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import remarkImages from 'remark-images';
import remarkParse from 'remark-parse';
import { validateFrontmatter, createArticleFromFrontmatter } from '../writing/articles';
import { ARTICLE_CONFIG } from '../writing/types';
import type { Article } from '../writing/types';

const articlesDirectory = path.join(process.cwd(), ARTICLE_CONFIG.directory);

// Process markdown content with enhanced configuration
async function processMarkdown(content: string): Promise<string> {
  const result = await remark()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkImages)
    .use(html)
    .process(content);

  return result.toString()
    // Add responsive image classes
    .replace(/<img/g, '<img class="responsive-image" loading="lazy"')
    // Add figure classes
    .replace(/<figure/g, '<figure class="image-figure"')
    // Add caption classes
    .replace(/<figcaption/g, '<figcaption class="image-caption"')
    // Add syntax highlighting classes
    .replace(/<pre><code class="language-(\w+)">/g, (_, lang) => 
      `<pre><code class="language-${lang} syntax-highlighted">`);
}

// Load and process a single article
export async function getArticle(slug: string) {
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
}

// Get all articles sorted by date
export async function getAllArticles(): Promise<Article[]> {
  try {
    const fileNames = await fs.readdir(articlesDirectory);
    const articles = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(async fileName => {
          const slug = fileName.replace(/\.md$/, '');
          const article = await getArticle(slug);
          if (!article) return null;
          return createArticleFromFrontmatter(article.frontmatter, article.content, slug);
        })
    );

    return articles
      .filter((article): article is Article => article !== null)
      .sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
      });
  } catch (error) {
    console.error('Error getting all articles:', error);
    return [];
  }
} 