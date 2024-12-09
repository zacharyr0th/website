import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article } from '@/lib/types';

const ARTICLE_CONFIG = {
  directory: path.join(process.cwd(), 'public/articles'),
  defaultImage: '/misc/placeholder.webp',
  excerptLength: 150,
} as const;

interface Frontmatter {
  title: string;
  subtitle?: string;
  excerpt?: string;
  image?: string;
  imageAlt?: string;
  category?: string;
  date: string;
  featured?: boolean;
  tags?: string[];
}

export function getAllArticles(): Article[] {
  const fileNames = fs.readdirSync(ARTICLE_CONFIG.directory);

  return fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(ARTICLE_CONFIG.directory, fileName);
      const { data: frontmatter, content } = matter(fs.readFileSync(fullPath, 'utf8')) as {
        data: Frontmatter;
        content: string;
      };

      return {
        id: slug,
        slug,
        ...createArticleFromFrontmatter(frontmatter, content, slug),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Helper function to create article from frontmatter
function createArticleFromFrontmatter(
  frontmatter: Frontmatter,
  content: string,
  slug: string
): Omit<Article, 'id' | 'slug'> {
  return {
    title: frontmatter.title,
    subtitle: frontmatter.subtitle ?? '',
    description: frontmatter.excerpt ?? `${content.slice(0, ARTICLE_CONFIG.excerptLength)}...`,
    content,
    image: {
      src: frontmatter.image ?? ARTICLE_CONFIG.defaultImage,
      alt: frontmatter.imageAlt ?? frontmatter.title,
    },
    category: frontmatter.category ?? 'Uncategorized',
    date: frontmatter.date,
    link: `/writing/${slug}`,
    tags: frontmatter.tags ?? [],
    frontmatter: {
      title: frontmatter.title,
      date: frontmatter.date,
      featured: frontmatter.featured ?? false,
      subtitle: frontmatter.subtitle ?? '',
    },
  };
}

export function getFeaturedArticles(): Article[] {
  const allArticles = getAllArticles();
  return allArticles.filter((article) => article.frontmatter?.featured).slice(0, 3);
}
