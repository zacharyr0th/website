import { getContentItems } from '@/lib/content';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const reviews = await getContentItems('review');
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}