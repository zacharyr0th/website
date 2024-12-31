import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Article, ArticleFrontmatter } from '@/app/lib/types/types';

const ARTICLE_CONFIG = {
  directory: path.join(process.cwd(), 'public/articles'),
  defaultImage: '/misc/placeholder.webp',
  excerptLength: 150,
} as const;

interface RawFrontmatter {
  title?: string;
  date?: string;
  description?: string;
  category?: string;
  tags?: string[];
  image?: { src: string; alt: string };
  featured?: boolean;
  draft?: boolean;
}

function validateFrontmatter(data: RawFrontmatter): ArticleFrontmatter {
  const image = data.image ? {
    src: data.image.src,
    alt: data.image.alt || data.title || 'Article image'
  } : undefined;

  const frontmatter: ArticleFrontmatter = {
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString(),
  };

  if (data.description) frontmatter.description = data.description;
  if (data.category) frontmatter.category = data.category;
  if (data.tags) frontmatter.tags = data.tags;
  if (image) frontmatter.image = image;
  frontmatter.featured = Boolean(data.featured);
  frontmatter.draft = Boolean(data.draft);

  return frontmatter;
}

function createArticleFromFrontmatter(
  frontmatter: ArticleFrontmatter,
  content: string,
  slug: string
): Omit<Article, 'id'> {
  return {
    slug,
    title: frontmatter.title,
    content,
    link: `/writing/${slug}`,
    date: frontmatter.date,
    description: frontmatter.description ?? `${content.slice(0, ARTICLE_CONFIG.excerptLength)}...`,
    image: frontmatter.image ?? { src: ARTICLE_CONFIG.defaultImage, alt: frontmatter.title },
    category: frontmatter.category ?? 'Uncategorized',
    tags: frontmatter.tags ?? [],
    frontmatter,
  };
}

export function getAllArticles(): Article[] {
  try {
    const fileNames = fs.readdirSync(ARTICLE_CONFIG.directory);
    const articles = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(ARTICLE_CONFIG.directory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const validatedFrontmatter = validateFrontmatter(data as RawFrontmatter);

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

export function getFeaturedArticles(): Article[] {
  const articles = getAllArticles();
  return articles.filter((article) => article.frontmatter.featured).slice(0, 3);
}
