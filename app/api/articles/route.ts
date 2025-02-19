import path from 'path';
import matter from 'gray-matter';
import { api, core, security } from '@/lib';
import { readFileSecure, readDirSecure } from '@/lib/server';

const logger = core.createLogger('articles-api', { category: core.LogCategory.API });

// Validate environment variables
const validateEnvironment = () => {
  const requiredVars = {
    ARTICLES_DIR: process.env.ARTICLES_DIR || path.join(process.cwd(), 'public/articles'),
  };

  // Validate directory path
  const articlesDir = requiredVars.ARTICLES_DIR;
  if (!articlesDir || !articlesDir.includes('articles')) {
    throw new Error('Invalid articles directory path');
  }

  // Resolve to absolute path and validate
  const resolvedPath = path.resolve(articlesDir);
  if (!resolvedPath.includes(process.cwd())) {
    throw new Error('Articles directory must be within project directory');
  }

  return { ARTICLES_DIR: resolvedPath };
};

const env = validateEnvironment();

export const dynamic = 'force-dynamic';
export const revalidate = 300; // 5 minutes

export async function GET(request: Request) {
  try {
    logger.info('Fetching articles...');

    // Parse URL parameters
    const url = new URL(request.url);
    const featured = url.searchParams.get('featured') === 'true';
    const category = url.searchParams.get('category');
    const tag = url.searchParams.get('tag');
    const excludeDrafts = url.searchParams.get('excludeDrafts') === 'true';
    const limit = url.searchParams.get('limit')
      ? parseInt(url.searchParams.get('limit')!)
      : undefined;
    const offset = url.searchParams.get('offset') ? parseInt(url.searchParams.get('offset')!) : 0;

    // Read directory securely
    const dirResult = await readDirSecure(env.ARTICLES_DIR, {
      allowedExtensions: ['.md'],
      requiredPath: 'articles',
    });

    if (!dirResult.success || !dirResult.data) {
      return api.createApiErrorResponse('Failed to read articles directory', {
        status: 500,
        code: 'STORAGE_ERROR',
        details: dirResult.error,
      });
    }

    // Read and process each file
    const articles = await Promise.all(
      dirResult.data.map(async (file) => {
        const filePath = path.join(env.ARTICLES_DIR, file);
        const fileResult = await readFileSecure(filePath, {
          allowedExtensions: ['.md'],
          requiredPath: 'articles',
        });

        if (!fileResult.success || !fileResult.data) {
          logger.warn(`Error reading article file: ${file}`, {
            error: new Error(String(fileResult.error || 'Unknown file read error')),
          });
          return null;
        }

        try {
          const { data, content } = matter(fileResult.data);
          return {
            slug: file.replace('.md', ''),
            title: data.title,
            date: data.date,
            content,
            description: data.description || '',
            category: data.category || null,
            tags: data.tags || [],
            image: data.image || null,
            featured: data.featured || false,
            draft: data.draft || false,
            takeaways: data.takeaways || null,
            link: `/writing/${file.replace('.md', '')}`,
          };
        } catch (error) {
          const err = error instanceof Error ? error : new Error('Unknown error parsing file');
          logger.warn(`Error parsing article file: ${file}`, { error: err });
          return null;
        }
      })
    );

    // Filter out any failed reads and apply filters
    let validArticles = articles
      .filter((article): article is NonNullable<typeof article> => article !== null)
      .filter((article) => !excludeDrafts || !article.draft)
      .filter((article) => !featured || article.featured)
      .filter((article) => !category || article.category === category)
      .filter((article) => !tag || article.tags.includes(tag))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Apply pagination
    if (typeof offset === 'number' && offset > 0) {
      validArticles = validArticles.slice(offset);
    }
    if (typeof limit === 'number' && limit > 0) {
      validArticles = validArticles.slice(0, limit);
    }

    return api.createApiResponse(validArticles, {
      headers: {
        ...security.getStaticHeaders(3600), // 1 hour cache
        'x-total-count': validArticles.length.toString(),
      },
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    logger.error('Error in articles API route', {
      error: err,
      context: {
        timestamp: new Date().toISOString(),
      },
    });

    return api.createApiErrorResponse('Failed to fetch articles', {
      status: 500,
      code: 'INTERNAL_ERROR',
      details: process.env.NODE_ENV === 'development' ? err : undefined,
    });
  }
}

export async function HEAD() {
  try {
    const dirResult = await readDirSecure(env.ARTICLES_DIR, {
      allowedExtensions: ['.md'],
      requiredPath: 'articles',
    });

    if (!dirResult.success || !dirResult.data) {
      return new Response(null, { status: 500 });
    }

    return new Response(null, {
      status: 200,
      headers: {
        'x-total-count': dirResult.data.length.toString(),
      },
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    logger.error('Error in articles HEAD route:', { error: err });
    return new Response(null, { status: 500 });
  }
}
