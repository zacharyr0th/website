/**
 * Articles API Route
 *
 * This endpoint handles article retrieval with:
 * - Static generation with hourly revalidation
 * - Markdown processing with frontmatter validation
 * - Draft article filtering in production
 */

import { NextResponse } from 'next/server';
import { getArticles } from '../../writing/[slug]/articles';

export const dynamic = 'force-static';
export const revalidate = 3600; // 1 hour

export async function GET() {
  try {
    const articles = await getArticles(true); // Force refresh on API calls
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error in articles API route:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
