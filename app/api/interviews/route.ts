import { getContentItems } from '@/lib/content';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const interviews = await getContentItems('interview');
    return NextResponse.json(interviews);
  } catch (error) {
    console.error('Error fetching interviews:', error);
    return NextResponse.json({ error: 'Failed to fetch interviews' }, { status: 500 });
  }
}
