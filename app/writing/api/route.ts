import { NextResponse } from 'next/server';
import { getArticles } from '../lib/articles';

export const dynamic = 'force-static';
export const revalidate = 3600; // 1 hour

export async function GET() {
  try {
    const articles = await getArticles();

    const response = NextResponse.json(articles, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      },
    });

    return response;
  } catch (error) {
    console.error('Error in articles API route:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
