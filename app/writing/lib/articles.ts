/**
 * Article utilities
 * Functions for processing, fetching, and managing article content
 */

import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';
import { SITE_INFO } from '../../lib/config/site.config';
import { getArticleStructuredData } from '../../lib/config/seo.config';

// Type definitions
export type ArticleCategory = 'technology' | 'finance' | 'music' | null;
export const TAGS = [
  'react',
  'typescript',
  'nextjs',
  'web',
  'ai',
  'guitar',
  'crypto',
  'computing',
  'theory',
  'trading',
] as const;
export type ArticleTag = (typeof TAGS)[number];

// Get the return type of the structured data function
type ArticleStructuredData = ReturnType<typeof getArticleStructuredData>;

export interface ArticleImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ArticleFrontmatter {
  title: string;
  date: string;
  description: string;
  category: ArticleCategory;
  tags: ArticleTag[];
  image: ArticleImage | null;
  featured: boolean;
  draft: boolean;
  takeaways: string[] | null;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  content: string;
  link: string;
  frontmatter: ArticleFrontmatter;
  description: string;
  date: string;
  category: ArticleCategory;
  tags: ArticleTag[];
  image: ArticleImage | null;
  takeaways: string[] | null;
  structuredData?: ArticleStructuredData;
}

export interface ArticleCache {
  [key: string]: {
    frontmatter: ArticleFrontmatter;
    content: string;
    processedContent?: string;
    timestamp: number;
    structuredData?: ArticleStructuredData;
  };
}

export interface FetchArticlesOptions {
  featured?: boolean;
  category?: ArticleCategory;
  tag?: ArticleTag;
  limit?: number;
  excludeDrafts?: boolean;
  offset?: number;
  concurrent?: boolean;
}

export interface RawFrontmatter {
  title: string;
  date?: string;
  description?: string;
  subtitle?: string;
  category?: string;
  tags?: string[];
  image?: ArticleImage | string;
  featured?: boolean;
  draft?: boolean;
  takeaways?: string[];
}

// Constants
export const CATEGORIES: ArticleCategory[] = ['technology', 'finance', 'music', null];

export const ARTICLE_CONFIG = {
  directory: 'public/articles',
  limits: {
    title: 100,
    description: 200,
  },
} as const;

// Constants for logging
const LOG_PREFIX = '[ArticleUtils]';

// In-memory cache for articles
const articleCache: ArticleCache = {};

// Mock data for client-side rendering
const MOCK_ARTICLES: Article[] = [
  // Add a few mock articles for development if needed
];

// Define Zod schema for article frontmatter validation
const ImageSchema = z
  .object({
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
  })
  .or(z.string());

const FrontmatterSchema = z.object({
  title: z.string().min(1).max(ARTICLE_CONFIG.limits.title).optional(),
  date: z.string().optional(),
  description: z.string().optional(),
  subtitle: z.string().optional(),
  category: z.enum(['technology', 'finance', 'music']).nullable().optional(),
  tags: z.array(z.string()).optional(),
  image: ImageSchema.optional(),
  featured: z.boolean().optional(),
  draft: z.boolean().optional(),
  takeaways: z.array(z.string()).optional(),
});

// Conditionally import fs only on the server side
const getFs = async () => {
  // Only import fs on the server side
  if (typeof window === 'undefined') {
    const fs = await import('fs');
    return fs.default;
  }
  return null;
};

/**
 * Get a list of all article files
 * This is a server-side only function that will be called via getStaticProps
 */
export const getArticleFiles = async () => {
  // In browser environments, return empty array or mock data
  if (typeof window !== 'undefined') {
    return [];
  }

  // In server environments, use dynamic import to load fs
  try {
    const fs = await getFs();
    if (!fs) {
      console.warn(`${LOG_PREFIX} File system module not available`);
      return [];
    }

    const articlesDirectory = path.join(process.cwd(), ARTICLE_CONFIG.directory);

    // Check if directory exists before trying to read it
    if (!fs.existsSync(articlesDirectory)) {
      console.warn(`${LOG_PREFIX} Articles directory does not exist: ${articlesDirectory}`);
      return [];
    }

    const files = fs.readdirSync(articlesDirectory);

    // Robust filtering to only include markdown files
    return files.filter((file) => {
      // Skip hidden files, system files, and non-markdown files
      if (file.startsWith('.')) return false;
      if (file === '.DS_Store') return false; // Explicitly exclude macOS system files
      if (file === 'Thumbs.db') return false; // Explicitly exclude Windows system files
      if (!file.endsWith('.md') && !file.endsWith('.mdx')) return false;

      return true;
    });
  } catch (error) {
    console.error(`${LOG_PREFIX} Error reading article directory:`, error);
    // Return empty array instead of throwing to prevent build failures
    return [];
  }
};

/**
 * Validate a date string and return a valid date or null
 */
export const validateDate = (dateString?: string): Date | null => {
  if (!dateString) return null;

  const date = new Date(dateString);
  // Check if date is valid - getTime() returns NaN for invalid dates
  return isNaN(date.getTime()) ? null : date;
};

/**
 * Process frontmatter data and validate it
 */
export const processFrontmatter = (rawFrontmatter: RawFrontmatter): ArticleFrontmatter => {
  // Ensure rawFrontmatter is an object with at least a title
  if (!rawFrontmatter || typeof rawFrontmatter !== 'object') {
    console.error(`${LOG_PREFIX} Invalid frontmatter: Not an object or null`);
    // Provide fallback for critical errors
    return {
      title: 'Untitled Article',
      date: new Date().toISOString(),
      description: '',
      category: null,
      tags: [],
      image: null,
      featured: false,
      draft: true,
      takeaways: null,
    };
  }

  // Check for empty object or missing title
  if (
    Object.keys(rawFrontmatter).length === 0 ||
    !rawFrontmatter.title ||
    typeof rawFrontmatter.title !== 'string'
  ) {
    console.warn(`${LOG_PREFIX} Missing required title field in frontmatter`);
    // Clone the object to avoid modifying input
    rawFrontmatter = {
      ...rawFrontmatter,
      title: 'Untitled Article',
      draft: true, // Mark as draft if missing title
    };
  }

  // Validate using Zod schema
  try {
    const validationResult = FrontmatterSchema.safeParse(rawFrontmatter);

    if (!validationResult.success) {
      // Log detailed error information
      console.error(
        `${LOG_PREFIX} Frontmatter validation failed for article "${rawFrontmatter.title || 'unknown'}":`,
        JSON.stringify(validationResult.error.format(), null, 2)
      );

      // Continue with best-effort processing instead of throwing
      console.warn(`${LOG_PREFIX} Proceeding with best-effort frontmatter processing`);
    }

    // If we got here, basic schema validation passed or we're proceeding with best effort
  } catch (error) {
    // Log but continue with best-effort processing
    console.warn(`${LOG_PREFIX} Schema validation error:`, error);
  }

  // Continue with existing validation logic for more detailed checks
  if (!rawFrontmatter.title) {
    console.warn(`${LOG_PREFIX} Article title is required in frontmatter`);
    // Create a new object instead of modifying the read-only properties
    rawFrontmatter = {
      ...rawFrontmatter,
      title: 'Untitled Article',
      draft: true, // Mark as draft if missing title
    };
  }

  // Validate date
  const validatedDate = validateDate(rawFrontmatter.date);
  if (rawFrontmatter.date && !validatedDate) {
    console.warn(
      `${LOG_PREFIX} Invalid date format in article "${rawFrontmatter.title}": ${rawFrontmatter.date}`
    );
  }

  // Normalize category to lowercase and validate
  const category = rawFrontmatter.category?.toLowerCase() as ArticleCategory;
  if (category && !['technology', 'finance', 'music'].includes(category)) {
    console.warn(
      `${LOG_PREFIX} Invalid category "${category}" in article "${rawFrontmatter.title}". Must be one of: technology, finance, music`
    );
  }

  // Validate and normalize tags
  const tags = (rawFrontmatter.tags || []).map((tag) => {
    const normalizedTag = String(tag).toLowerCase();
    if (!TAGS.includes(normalizedTag as ArticleTag)) {
      console.warn(
        `${LOG_PREFIX} Invalid tag "${tag}" in article "${rawFrontmatter.title}". Must be one of: ${TAGS.join(', ')}`
      );
    }
    return normalizedTag;
  }) as ArticleTag[];

  // Process image
  const image = rawFrontmatter.image
    ? typeof rawFrontmatter.image === 'string'
      ? { src: rawFrontmatter.image, alt: rawFrontmatter.title || 'Article image' }
      : rawFrontmatter.image
    : null;

  return {
    title: rawFrontmatter.title.substring(0, ARTICLE_CONFIG.limits.title),
    date: validatedDate ? validatedDate.toISOString() : new Date().toISOString(),
    description: (rawFrontmatter.description || rawFrontmatter.subtitle || '').substring(
      0,
      ARTICLE_CONFIG.limits.description
    ),
    category: category || null,
    tags,
    image,
    featured: Boolean(rawFrontmatter.featured),
    draft: Boolean(rawFrontmatter.draft),
    takeaways: rawFrontmatter.takeaways || null,
  };
};

/**
 * Parse an article file and extract its metadata and content
 * This is a server-side only function
 */
export const parseArticleFile = async (fileName: string): Promise<Article | null> => {
  // In browser environments, return null or mock data
  if (typeof window !== 'undefined') {
    return null;
  }

  try {
    const fs = await getFs();
    if (!fs) return null;

    const articlesDirectory = path.join(process.cwd(), ARTICLE_CONFIG.directory);
    const fullPath = path.join(articlesDirectory, fileName);

    // Skip non-markdown files explicitly
    if (!fileName.endsWith('.md') && !fileName.endsWith('.mdx')) {
      console.warn(`${LOG_PREFIX} Skipping non-markdown file: ${fileName}`);
      return null;
    }

    // Check if the file is a binary file by attempting to read it as UTF-8
    let fileContents: string;
    try {
      fileContents = fs.readFileSync(fullPath, 'utf8');

      // Basic check for binary content - if the first few characters contain null bytes or weird control chars
      if (
        fileContents.slice(0, 100).includes('\0') ||
        !/^[\x20-\x7E\t\r\n]*/.test(fileContents.slice(0, 100))
      ) {
        console.warn(`${LOG_PREFIX} Skipping likely binary file: ${fileName}`);
        return null;
      }
    } catch (readError) {
      console.warn(`${LOG_PREFIX} Error reading file ${fileName}, skipping:`, readError);
      return null;
    }

    // Parse the markdown with gray-matter
    let data, content;
    try {
      // Check that the file has proper frontmatter delimiters before parsing
      if (!fileContents.trimStart().startsWith('---')) {
        console.warn(`${LOG_PREFIX} File ${fileName} doesn't start with frontmatter delimiter ---`);
        // Attempt to handle as if it's just content with no frontmatter
        data = {};
        content = fileContents;
      } else {
        const matterResult = matter(fileContents);
        data = matterResult.data;
        content = matterResult.content;

        // Check if data is empty even with frontmatter delimiters
        if (data && typeof data === 'object' && Object.keys(data).length === 0) {
          console.warn(`${LOG_PREFIX} File ${fileName} has empty frontmatter between delimiters`);
        }
      }
    } catch (matterError) {
      console.error(`${LOG_PREFIX} Error parsing frontmatter in ${fileName}:`, matterError);
      // Attempt to recover by assuming everything is content
      data = {};
      content = fileContents;
    }

    // Add validation before processing frontmatter
    if (!data || typeof data !== 'object') {
      console.warn(
        `${LOG_PREFIX} Invalid frontmatter in file ${fileName}: frontmatter is missing or not an object. Using empty object.`
      );
      data = {};
    }

    // Log the raw frontmatter for debugging
    console.log(`${LOG_PREFIX} Processing frontmatter for ${fileName}:`, data);
    if (data && typeof data === 'object') {
      console.log(`${LOG_PREFIX} Frontmatter keys: [${Object.keys(data).join(', ')}]`);
      if (!data.title) {
        console.warn(`${LOG_PREFIX} Title is missing in ${fileName}`);
      }
    }

    const slug = fileName.replace(/\.mdx?$/, '');

    try {
      const frontmatter = processFrontmatter(data as RawFrontmatter);
      const articleUrl = `${SITE_INFO.url}/writing/${slug}`;

      // Generate structured data for the article
      const structuredData = getArticleStructuredData({
        title: frontmatter.title,
        description: frontmatter.description,
        url: articleUrl,
        datePublished: frontmatter.date,
        dateModified: frontmatter.date, // Use published date if no modified date available
        authorName: SITE_INFO.authorName,
        authorUrl: SITE_INFO.url,
        imageUrl: frontmatter.image?.src || SITE_INFO.defaultOgImage || '',
      });

      // Update cache
      articleCache[slug] = {
        frontmatter,
        content,
        timestamp: Date.now(),
        structuredData,
      };

      return {
        id: slug,
        slug,
        title: frontmatter.title,
        content,
        link: `/writing/${slug}`,
        frontmatter,
        description: frontmatter.description,
        date: frontmatter.date,
        category: frontmatter.category,
        tags: frontmatter.tags,
        image: frontmatter.image,
        takeaways: frontmatter.takeaways,
        structuredData, // Add structured data to the article object
      };
    } catch (frontmatterError) {
      console.error(`${LOG_PREFIX} Error processing frontmatter in ${fileName}:`, frontmatterError);

      // Instead of throwing, return a fallback article object
      const fallbackFrontmatter = {
        title: `Error in ${fileName}`,
        date: new Date().toISOString(),
        description: 'This article has frontmatter formatting issues and is being fixed.',
        category: null,
        tags: [],
        image: null,
        featured: false,
        draft: true,
        takeaways: null,
      };

      // Update cache with the fallback
      articleCache[slug] = {
        frontmatter: fallbackFrontmatter,
        content,
        timestamp: Date.now(),
      };

      return {
        id: slug,
        slug,
        title: fallbackFrontmatter.title,
        content,
        link: `/writing/${slug}`,
        frontmatter: fallbackFrontmatter,
        description: fallbackFrontmatter.description,
        date: fallbackFrontmatter.date,
        category: fallbackFrontmatter.category,
        tags: fallbackFrontmatter.tags,
        image: fallbackFrontmatter.image,
        takeaways: fallbackFrontmatter.takeaways,
      };
    }
  } catch (error) {
    console.error(`${LOG_PREFIX} Error parsing article file ${fileName}:`, error);

    // Create a fallback slug
    const slug = fileName.replace(/\.mdx?$/, '');

    // Instead of re-throwing, return a fallback article object
    const fallbackFrontmatter = {
      title: `Error in ${fileName}`,
      date: new Date().toISOString(),
      description: 'This article could not be parsed due to an error. It will be fixed soon.',
      category: null,
      tags: [],
      image: null,
      featured: false,
      draft: true,
      takeaways: null,
    };

    // Don't update cache for outer errors as they might be more severe

    return {
      id: slug,
      slug,
      title: fallbackFrontmatter.title,
      content: `Error parsing file: ${(error as Error).message}`,
      link: `/writing/${slug}`,
      frontmatter: fallbackFrontmatter,
      description: fallbackFrontmatter.description,
      date: fallbackFrontmatter.date,
      category: fallbackFrontmatter.category,
      tags: fallbackFrontmatter.tags,
      image: fallbackFrontmatter.image,
      takeaways: fallbackFrontmatter.takeaways,
    };
  }
};

/**
 * Diagnostic function to validate article frontmatter
 * This is useful for development and debugging
 */
export const validateArticleFrontmatter = async (
  fileName: string,
  verbose = false
): Promise<{ valid: boolean; errors: string[] }> => {
  try {
    const fs = await getFs();
    if (!fs) return { valid: false, errors: ['File system not available'] };

    const articlesDirectory = path.join(process.cwd(), ARTICLE_CONFIG.directory);
    const fullPath = path.join(articlesDirectory, fileName);

    if (!fs.existsSync(fullPath)) {
      return { valid: false, errors: [`File does not exist: ${fullPath}`] };
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const errors: string[] = [];

    // Check for empty file
    if (!fileContents.trim()) {
      errors.push(`File is empty: ${fileName}`);
      return { valid: false, errors };
    }

    // Check frontmatter delimiters
    if (!fileContents.startsWith('---')) {
      errors.push(`Missing opening frontmatter delimiter (---) in ${fileName}`);
    }

    const secondDelimiter = fileContents.substring(3).indexOf('---');
    if (secondDelimiter === -1) {
      errors.push(`Missing closing frontmatter delimiter (---) in ${fileName}`);
    }

    // Parse with gray-matter
    let data;
    try {
      const matterResult = matter(fileContents);
      data = matterResult.data;
    } catch (matterError) {
      errors.push(`Error parsing frontmatter: ${(matterError as Error).message}`);
      return { valid: false, errors };
    }

    // Check for required fields
    if (!data.title) errors.push('Missing required field: title');

    // Validate with Zod schema
    const validationResult = FrontmatterSchema.safeParse(data);
    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();
      for (const [field, error] of Object.entries(formattedErrors)) {
        if (field === '_errors') continue;
        errors.push(`Field "${field}": ${JSON.stringify(error)}`);
      }
    }

    if (verbose) {
      console.log(
        `${LOG_PREFIX} Validation results for ${fileName}:`,
        errors.length ? { valid: false, errors } : { valid: true }
      );
    }

    return { valid: !errors.length, errors };
  } catch (error) {
    return {
      valid: false,
      errors: [`Unexpected error validating ${fileName}: ${(error as Error).message}`],
    };
  }
};

/**
 * Get all articles, optionally filtered by options
 * This function works both client and server side by using pre-fetched data
 */
export const getArticles = async (options: FetchArticlesOptions = {}): Promise<Article[]> => {
  const {
    featured = false,
    category,
    tag,
    limit,
    excludeDrafts = true,
    offset = 0,
    concurrent = false,
  } = options;

  // In browser environments during development, return mock data
  if (typeof window !== 'undefined') {
    return MOCK_ARTICLES;
  }

  try {
    const files = await getArticleFiles();
    if (!files || files.length === 0) {
      console.warn(`${LOG_PREFIX} No article files found.`);
      return [];
    }

    // In development, run frontmatter validation on all files
    if (process.env.NODE_ENV === 'development') {
      console.log(`${LOG_PREFIX} Validating frontmatter for ${files.length} files`);
      for (const file of files) {
        const validation = await validateArticleFrontmatter(file, true);
        if (!validation.valid) {
          console.warn(`${LOG_PREFIX} Invalid frontmatter in ${file}:`, validation.errors);
        }
      }
    }

    const articles: Article[] = [];
    const errors: { file: string; error: Error }[] = [];

    // Use concurrent or sequential processing based on the options
    if (concurrent) {
      // Process articles concurrently for faster builds
      console.log(`${LOG_PREFIX} Using concurrent article processing for ${files.length} files`);
      const results = await Promise.allSettled(files.map(parseArticleFile));

      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value) {
          articles.push(result.value);
        } else if (result.status === 'rejected') {
          const fileName = files[index] || 'unknown';
          errors.push({ file: fileName, error: result.reason });
          console.error(`${LOG_PREFIX} Failed to parse article ${fileName}:`, result.reason);
        }
      });
    } else {
      // Process articles sequentially to better identify issues (default for debugging)
      console.log(`${LOG_PREFIX} Using sequential article processing for ${files.length} files`);
      for (const file of files) {
        try {
          const article = await parseArticleFile(file);
          if (article) {
            articles.push(article);
          }
        } catch (error) {
          errors.push({ file, error: error as Error });
          console.error(`${LOG_PREFIX} Failed to parse article ${file}:`, error);
        }
      }
    }

    // Log summary of parsing results
    console.log(`${LOG_PREFIX} Successfully parsed ${articles.length} articles`);
    if (errors.length > 0) {
      console.error(`${LOG_PREFIX} Failed to parse ${errors.length} articles:`, errors);
    }

    if (articles.length === 0) {
      console.warn(`${LOG_PREFIX} No valid articles parsed from files.`);
      return [];
    }

    // Apply filters
    let filteredArticles = [...articles];

    if (excludeDrafts) {
      filteredArticles = filteredArticles.filter((article) => !article.frontmatter.draft);
    }

    if (featured) {
      filteredArticles = filteredArticles.filter((article) => article.frontmatter.featured);
    }

    if (category) {
      filteredArticles = filteredArticles.filter((article) => article.category === category);
    }

    if (tag) {
      filteredArticles = filteredArticles.filter((article) => article.tags.includes(tag));
    }

    // Sort by date (newest first)
    filteredArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Apply pagination
    if (offset > 0) {
      filteredArticles = filteredArticles.slice(offset);
    }

    if (limit) {
      filteredArticles = filteredArticles.slice(0, limit);
    }

    return filteredArticles;
  } catch (error) {
    console.error(`${LOG_PREFIX} Error in getArticles:`, error);
    // During build, return empty array instead of throwing to prevent build failures
    return [];
  }
};

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
 * Format a date for display
 */
export const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions): string => {
  const date = new Date(dateString);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    console.warn(`${LOG_PREFIX} Invalid date format: ${dateString}`);
    return 'Invalid Date';
  }

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', options || defaultOptions);
};
