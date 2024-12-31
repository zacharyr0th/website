import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Article } from '@/app/lib/types/types';
import { ARTICLE_CONFIG } from '@/app/lib/config/articles';
import { validateFrontmatter, createArticleFromFrontmatter } from '@/app/lib/utils/articles';

export async function getArticles(): Promise<Article[]> {
  try {
    console.log('Reading articles from:', ARTICLE_CONFIG.directory);
    const fileNames = fs.readdirSync(ARTICLE_CONFIG.directory);
    console.log('Found files:', fileNames);

    const articles = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        try {
          console.log('Processing article:', fileName);
          const slug = fileName.replace(/\.md$/, '');
          const fullPath = path.join(ARTICLE_CONFIG.directory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);
          console.log('Article frontmatter:', data);

          const validatedFrontmatter = validateFrontmatter(data);

          // Skip draft articles in production
          if (process.env.NODE_ENV === 'production' && validatedFrontmatter.draft) {
            console.log('Skipping draft article:', fileName);
            return null;
          }

          const article = createArticleFromFrontmatter(validatedFrontmatter, content, slug);
          console.log('Successfully processed article:', slug);
          return article;
        } catch (error) {
          console.error(`Error processing article ${fileName}:`, error);
          return null;
        }
      })
      .filter((article): article is Article => article !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    console.log('Total articles processed:', articles.length);
    return articles;
  } catch (error) {
    console.error('Error reading articles:', error);
    return [];
  }
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const articles = await getArticles();
  return articles.filter((article) => article.frontmatter.featured).slice(0, 3);
}
