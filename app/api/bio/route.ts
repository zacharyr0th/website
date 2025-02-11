import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { processMarkdown } from '@/bio/lib/markdown';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const bioPath = path.join(process.cwd(), 'app/bio/fullbio.md');
    const rawContent = await fs.readFile(bioPath, 'utf8');
    const processedContent = await processMarkdown(rawContent);
    
    return new NextResponse(processedContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error in bio API route:', error);
    return new NextResponse('Failed to load bio', { status: 500 });
  }
} 