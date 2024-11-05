import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article } from '@/lib/types';

const articlesDirectory = path.join(process.cwd(), 'public/articles');
const DEFAULT_IMAGE = '/misc/placeholder.webp';

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
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticles = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents) as {
      data: Frontmatter;
      content: string;
    };

    return {
      id: slug,
      slug,
      title: frontmatter.title,
      subtitle: frontmatter.subtitle || '',
      description: frontmatter.excerpt || content.slice(0, 150) + '...',
      content,
      image: {
        src: frontmatter.image || DEFAULT_IMAGE,
        alt: frontmatter.imageAlt || frontmatter.title,
      },
      category: frontmatter.category || 'Uncategorized',
      date: frontmatter.date,
      link: `/writing/${slug}`,
      tags: frontmatter.tags || [],
      frontmatter: {
        title: frontmatter.title,
        date: frontmatter.date,
        featured: frontmatter.featured || false,
        subtitle: frontmatter.subtitle || '',
      },
    };
  });

  return allArticles.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
}

export function getFeaturedArticles(): Article[] {
  const allArticles = getAllArticles();
  return allArticles.filter((article) => article.frontmatter?.featured).slice(0, 3);
}
