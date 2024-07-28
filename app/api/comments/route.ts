import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postSlug = searchParams.get('postSlug');
  
  // TODO: Fetch comments from your database based on postSlug
  const comments = [
    { id: '1', author: 'Test User', content: 'Test Comment', date: new Date().toISOString() }
  ];

  return NextResponse.json(comments);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { postSlug, comment } = body;

  // TODO: Save the new comment to your database
  console.log('Received comment for post:', postSlug, comment);

  return NextResponse.json({ message: 'Comment saved successfully' });
}