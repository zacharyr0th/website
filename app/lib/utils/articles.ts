import { ArticleFrontmatter, Article } from '@/app/lib/types/types';
import { ARTICLE_CONFIG } from '@/app/lib/config/articles';

interface RawFrontmatter {
  title?: string;
  date?: string;
  description?: string;
  subtitle?: string;
  category?: string;
  tags?: string[];
  image?: string | { src: string; alt?: string };
  featured?: boolean;
  draft?: boolean;
}

export function validateFrontmatter(data: unknown): ArticleFrontmatter {
  console.log('Validating frontmatter:', data); // Debug log

  const rawData = data as RawFrontmatter;

  const transformImage = (
    image: string | { src: string; alt?: string } | undefined,
    defaultAlt: string
  ): { src: string; alt: string } | undefined => {
    if (!image) return undefined;
    if (typeof image === 'string') {
      return {
        src: image,
        alt: defaultAlt,
      };
    }
    return {
      src: image.src,
      alt: image.alt || defaultAlt,
    };
  };

  const frontmatter: ArticleFrontmatter = {
    title: rawData.title || 'Untitled',
    date: rawData.date || new Date().toISOString(),
    featured: rawData.featured || false,
    draft: rawData.draft || false,
  };

  if (rawData.description || rawData.subtitle) {
    frontmatter.description = rawData.description || rawData.subtitle || '';
  }

  if (rawData.category) {
    frontmatter.category = rawData.category;
  }

  if (rawData.tags) {
    frontmatter.tags = rawData.tags;
  }

  const transformedImage = transformImage(rawData.image, rawData.title || 'Article image');
  if (transformedImage) {
    frontmatter.image = transformedImage;
  }

  // Validate title length
  if (frontmatter.title.length > ARTICLE_CONFIG.maxTitleLength) {
    console.warn(`Title exceeds maximum length: ${frontmatter.title}`);
    frontmatter.title = frontmatter.title.slice(0, ARTICLE_CONFIG.maxTitleLength);
  }

  // Validate description length if present
  if (
    frontmatter.description &&
    frontmatter.description.length > ARTICLE_CONFIG.maxDescriptionLength
  ) {
    console.warn(`Description exceeds maximum length: ${frontmatter.description}`);
    frontmatter.description = frontmatter.description.slice(0, ARTICLE_CONFIG.maxDescriptionLength);
  }

  // Convert tags to lowercase and remove duplicates
  frontmatter.tags = Array.from(new Set((frontmatter.tags || []).map((tag) => tag.toLowerCase())));

  return frontmatter;
}

export function createArticleFromFrontmatter(
  frontmatter: ArticleFrontmatter,
  content: string,
  slug: string
): Article {
  const createArticle = (
    slug: string,
    content: string,
    frontmatter: ArticleFrontmatter
  ): Article => {
    const article: Article = {
      id: slug,
      slug,
      title: frontmatter.title,
      content,
      date: frontmatter.date,
      link: `/writing/${slug}`,
      frontmatter,
    };

    if (frontmatter.description) {
      article.description = frontmatter.description;
    }

    if (frontmatter.category) {
      article.category = frontmatter.category;
    }

    if (frontmatter.tags) {
      article.tags = frontmatter.tags;
    }

    if (frontmatter.image) {
      article.image = frontmatter.image;
    }

    return article;
  };

  // Validate title length
  if (frontmatter.title.length > 100) {
    throw new Error('Title is too long (max 100 characters)');
  }

  return createArticle(slug, content, frontmatter);
}
