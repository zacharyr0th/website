/**
 * Articles API Route
 *
 * This endpoint handles article retrieval with the following features:
 * - Static generation with hourly revalidation
 * - Markdown processing with frontmatter validation
 * - Draft article filtering in production
 */

import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { Article } from '../../writing/types';
import {
  ARTICLE_CONFIG,
  validateFrontmatter,
  createArticleFromFrontmatter,
} from '../../writing/articles';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    // Verify articles directory exists
    try {
      await fs.access(ARTICLE_CONFIG.directory);
    } catch (error) {
      console.error('Articles directory not found');
      return NextResponse.json({ error: 'Articles directory not found' }, { status: 404 });
    }

    const fileNames = await fs.readdir(ARTICLE_CONFIG.directory);
    const validFiles = fileNames.filter((fileName) => fileName.endsWith('.md'));

    const articlesPromises = validFiles.map(async (fileName) => {
      try {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(ARTICLE_CONFIG.directory, fileName);
        const fileContents = await fs.readFile(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const validatedFrontmatter = validateFrontmatter(data);

        // Skip draft articles in production
        if (process.env.NODE_ENV === 'production' && validatedFrontmatter.draft) {
          return null;
        }

        return createArticleFromFrontmatter(validatedFrontmatter, content, slug);
      } catch (error) {
        console.error(`Error processing article ${fileName}:`, error);
        return null;
      }
    });

    const articles = (await Promise.all(articlesPromises))
      .filter((article: Article | null): article is Article => article !== null)
      .sort((a: Article, b: Article) => new Date(b.date).getTime() - new Date(a.date).getTime());

    console.log(`Successfully fetched ${articles.length} articles`);
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
