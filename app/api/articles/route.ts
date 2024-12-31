/**
 * Articles API Route
 *
 * This endpoint handles article retrieval with the following features:
 * - Static generation with hourly revalidation
 * - Markdown processing with frontmatter validation
 * - Security measures including:
 *   - Path traversal protection
 *   - File size limits
 *   - Draft article filtering in production
 * - Error handling and monitoring
 *
 * @see {@link lib/markdown.ts} for Markdown processing
 * @see {@link lib/cache.ts} for cache configuration
 * @see {@link middleware.ts} for rate limiting and security headers
 */

import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { Article } from '@/app/lib/types/types';
import { logger, logError } from '@/app/lib/utils/logger';
import { withMonitoring } from '@/app/lib/utils/monitoring';
import { ARTICLE_CONFIG } from '@/app/lib/config/articles';
import { validateFrontmatter, createArticleFromFrontmatter } from '@/app/lib/utils/articles';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  return withMonitoring('GET /api/articles', async () => {
    try {
      // Verify articles directory exists
      try {
        await fs.access(ARTICLE_CONFIG.directory);
      } catch (error) {
        logError(error, 'Articles directory not found');
        return NextResponse.json({ error: 'Articles directory not found' }, { status: 404 });
      }

      const fileNames = await fs.readdir(ARTICLE_CONFIG.directory);
      const validFiles = fileNames.filter((fileName) => fileName.endsWith('.md'));

      const articlesPromises = validFiles.map(async (fileName) => {
        try {
          const slug = fileName.replace(/\.md$/, '');
          const fullPath = path.join(ARTICLE_CONFIG.directory, fileName);

          // Validate file path
          const realPath = await fs.realpath(fullPath);
          if (!realPath.startsWith(await fs.realpath(ARTICLE_CONFIG.directory))) {
            throw new Error('Invalid file path');
          }

          // Check file size
          const stats = await fs.stat(fullPath);
          if (stats.size > ARTICLE_CONFIG.maxFileSize) {
            throw new Error(`File ${fileName} exceeds maximum allowed size`);
          }

          const fileContents = await fs.readFile(fullPath, 'utf8');
          const { data, content } = matter(fileContents);
          const validatedFrontmatter = validateFrontmatter(data);

          // Skip draft articles in production
          if (process.env.NODE_ENV === 'production' && validatedFrontmatter.draft) {
            return null;
          }

          return createArticleFromFrontmatter(validatedFrontmatter, content, slug);
        } catch (error) {
          logError(error, `Error processing article ${fileName}`);
          return null;
        }
      });

      const articles = (await Promise.all(articlesPromises))
        .filter((article: Article | null): article is Article => article !== null)
        .sort((a: Article, b: Article) => new Date(b.date).getTime() - new Date(a.date).getTime());

      logger('info', `Successfully fetched ${articles.length} articles`);
      return NextResponse.json(articles);
    } catch (error) {
      logError(error, 'Error fetching articles');
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  });
}
