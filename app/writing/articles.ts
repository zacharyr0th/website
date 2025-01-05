import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { 
  Article, 
  ArticleFrontmatter, 
  RawFrontmatter, 
  ARTICLE_CONFIG, 
  ArticleTag,
  ArticleCategory 
} from './types';

const articlesDirectory = path.join(process.cwd(), ARTICLE_CONFIG.directory);

// Utility Functions
export function validateFrontmatter(data: unknown): ArticleFrontmatter {
  console.log('Validating frontmatter:', data);

  const rawData = data as RawFrontmatter;

  // Build the frontmatter object immutably
  return {
    title: rawData.title || 'Untitled',
    date: rawData.date || new Date().toISOString(),
    description: rawData.description || rawData.subtitle || undefined,
    category: rawData.category && 
      ARTICLE_CONFIG.allowedCategories.includes(rawData.category as ArticleCategory) ? 
      rawData.category as ArticleCategory : 
      undefined,
    tags: rawData.tags && Array.isArray(rawData.tags) ? 
      Array.from(new Set(
        rawData.tags
          .filter((tag): tag is string => typeof tag === 'string')
          .map(tag => tag.toLowerCase())
          .filter((tag): tag is ArticleTag => 
            ARTICLE_CONFIG.allowedTags.map(t => t.toLowerCase()).includes(tag)
          )
      )) : 
      undefined,
    image: rawData.image ? {
      src: typeof rawData.image === 'string' ? rawData.image : rawData.image.src,
      alt: typeof rawData.image === 'string' ? 
        `Featured image for article: ${rawData.title || 'Untitled'}` : 
        rawData.image.alt || `Featured image for article: ${rawData.title || 'Untitled'}`
    } : undefined,
    featured: rawData.featured || false,
    draft: rawData.draft || false,
  };
}

export function createArticleFromFrontmatter(
  frontmatter: ArticleFrontmatter,
  content: string,
  slug: string
): Article {
  if (frontmatter.title.length > 100) {
    throw new Error('Title is too long (max 100 characters)');
  }

  const base = {
    id: slug,
    slug,
    title: frontmatter.title,
    content,
    link: `/writing/${slug}`,
    frontmatter,
  };

  const optionals = {
    ...(frontmatter.date && { date: frontmatter.date }),
    ...(frontmatter.description && { description: frontmatter.description }),
    ...(frontmatter.category && { category: frontmatter.category }),
    ...(frontmatter.tags && { tags: frontmatter.tags }),
    ...(frontmatter.image && { image: frontmatter.image })
  };

  return { ...base, ...optionals } as Article;
}

// Add memoization for getArticles
let cachedArticles: readonly Article[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getArticles(): Promise<readonly Article[]> {
  const now = Date.now();
  if (cachedArticles && now - lastFetchTime < CACHE_DURATION) {
    return cachedArticles;
  }

  try {
    const fileNames = fs.readdirSync(articlesDirectory);
    const articles = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        try {
          const slug = fileName.replace(/\.md$/, '');
          const fullPath = path.join(articlesDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);
          const validatedFrontmatter = validateFrontmatter(data);

          if (process.env.NODE_ENV === 'production' && validatedFrontmatter.draft) {
            return null;
          }

          return createArticleFromFrontmatter(validatedFrontmatter, content, slug);
        } catch (error) {
          console.error(`Error processing article ${fileName}:`, error);
          return null;
        }
      })
      .filter((article): article is Article => article !== null)
      .sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
      });

    cachedArticles = articles;
    lastFetchTime = now;
    return articles;
  } catch (error) {
    console.error('Error reading articles:', error);
    return [];
  }
}

export async function getFeaturedArticles(): Promise<readonly Article[]> {
  const articles = await getArticles();
  return articles.filter((article) => article.frontmatter.featured).slice(0, 3);
}
