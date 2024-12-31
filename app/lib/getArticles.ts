import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { validateFrontmatter } from '@/app/lib/utils/articles';
import type { Article, ArticleFrontmatter } from '@/app/lib/types/types';

const ARTICLE_CONFIG = {
  directory: path.join(process.cwd(), 'public/articles'),
  defaultImage: '/misc/placeholder.webp',
  excerptLength: 150,
} as const;

function createArticleFromFrontmatter(
  frontmatter: ArticleFrontmatter,
  content: string,
  slug: string
): Omit<Article, 'id'> {
  const article: Omit<Article, 'id'> = {
    slug,
    title: frontmatter.title,
    content,
    link: `/writing/${slug}`,
    date: frontmatter.date,
    ...(frontmatter.description && { description: frontmatter.description }),
    ...(frontmatter.image && { image: frontmatter.image }),
    ...(frontmatter.tags && { tags: frontmatter.tags }),
    ...(frontmatter.category && { category: frontmatter.category }),
    frontmatter: {
      featured: Boolean(frontmatter.featured),
      draft: Boolean(frontmatter.draft),
      title: frontmatter.title,
      date: frontmatter.date,
      ...(frontmatter.description && { description: frontmatter.description }),
      ...(frontmatter.category && { category: frontmatter.category }),
      ...(frontmatter.tags && { tags: frontmatter.tags }),
      ...(frontmatter.image && { image: frontmatter.image }),
    },
  };

  return article;
}

export async function getArticles(): Promise<Article[]> {
  try {
    const fileNames = fs.readdirSync(ARTICLE_CONFIG.directory);
    const articles = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(ARTICLE_CONFIG.directory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const validatedFrontmatter = validateFrontmatter(data);

        // Skip draft articles in production
        if (process.env.NODE_ENV === 'production' && validatedFrontmatter.draft) {
          return null;
        }

        const article = {
          id: slug,
          ...createArticleFromFrontmatter(validatedFrontmatter, content, slug),
        };

        return article;
      })
      .filter((article): article is Article => article !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
