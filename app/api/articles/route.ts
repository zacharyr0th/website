/**
 * Articles API Route
 *
 * This endpoint handles article retrieval with:
 * - Static generation with hourly revalidation
 * - Markdown processing with frontmatter validation
 * - Draft article filtering in production
 * - Enhanced security headers and caching
 */

import { NextResponse } from 'next/server';
import { getArticles } from '@/writing/lib/articles';
import { ARTICLE_CONFIG } from '@/writing/types';

export const dynamic = 'force-static';
export const revalidate = 3600; // 1 hour

export async function GET() {
  try {
    const articles = await getArticles(); // Removed the true parameter
    
    const response = NextResponse.json(articles, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `public, s-maxage=${revalidate}, stale-while-revalidate=${ARTICLE_CONFIG.cache.staleWhileRevalidate / 1000}`,
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || '*',
        'Vary': 'Accept',
      },
    });

    return response;
  } catch (error) {
    console.error('Error in articles API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
          'Content-Type': 'application/json',
        }
      }
    );
  }
}
