/**
 * Articles API Route
 * Provides endpoints for fetching article data
 */

import { NextRequest, NextResponse } from 'next/server';
import { getArticles } from '../../lib';
import type {
  ArticleCategory,
  ArticleTag,
  FetchArticlesOptions,
  MutableFetchArticlesOptions,
} from '../../../../components/writing-page/types';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate every minute

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Build options object from query params
    const options: MutableFetchArticlesOptions = {};

    // Only add properties that are present in the query
    if (searchParams.has('featured')) {
      options.featured = true;
    }

    if (searchParams.has('category')) {
      const category = searchParams.get('category');
      if (category) {
        options.category = category as ArticleCategory;
      }
    }

    if (searchParams.has('tag')) {
      const tag = searchParams.get('tag');
      if (tag) {
        options.tag = tag as ArticleTag;
      }
    }

    if (searchParams.has('limit')) {
      const limitStr = searchParams.get('limit');
      if (limitStr) {
        options.limit = parseInt(limitStr, 10);
      }
    }

    // Set excludeDrafts based on includeDrafts parameter
    options.excludeDrafts = !searchParams.has('includeDrafts');

    if (searchParams.has('offset')) {
      const offsetStr = searchParams.get('offset');
      if (offsetStr) {
        options.offset = parseInt(offsetStr, 10);
      }
    }

    // Get articles based on options
    const articles = await getArticles(options as FetchArticlesOptions);

    return NextResponse.json(articles, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
