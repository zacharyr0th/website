import path from 'path';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import { api, core, security } from '@/lib';
import { readFileSecure } from '@/lib/server';

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

// Validate and sanitize article slug
function validateSlug(slug: string): boolean {
  return /^[a-zA-Z0-9-]+$/.test(slug);
}

// Get secure file path for article
function getSecureArticlePath(slug: string): string | null {
  if (!validateSlug(slug)) {
    return null;
  }

  const filePath = path.join(env.ARTICLES_DIR, `${slug}.md`);
  const resolvedPath = path.resolve(filePath);

  if (!resolvedPath.startsWith(env.ARTICLES_DIR)) {
    return null;
  }

  return resolvedPath;
}

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
): Promise<Response> {
  try {
    const { slug } = params;

    // Get secure file path
    const filePath = getSecureArticlePath(slug);
    if (!filePath) {
      return api.createApiErrorResponse('Invalid article slug', { status: 400 });
    }

    // Read and process article
    const fileResult = await readFileSecure(filePath, {
      allowedExtensions: ['.md'],
      requiredPath: 'articles',
    });

    if (!fileResult.success) {
      return api.createApiErrorResponse('Article not found', { status: 404 });
    }

    if (typeof fileResult.data !== 'string') {
      logger.error('Invalid file content type', undefined, { type: typeof fileResult.data });
      return api.createApiErrorResponse('Invalid file content', { status: 500 });
    }

    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml)
      .use(rehypeSlug)
      .use(rehypeHighlight)
      .process(fileResult.data);

    return api.createApiResponse(
      {
        content: processedContent.toString(),
        slug,
      },
      {
        headers: {
          ...security.getStaticHeaders(3600), // 1 hour cache
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    logger.error('Error in article API route', err, {
      slug: params.slug,
      timestamp: new Date().toISOString(),
    });

    return api.createApiErrorResponse('Failed to load article', {
      status: 500,
      details: process.env.NODE_ENV === 'development' ? err : undefined,
    });
  }
}
