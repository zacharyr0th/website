import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { postSlug, liked } = await request.json();

    const post = await prisma.post.findUnique({
      where: { slug: postSlug },
    });

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    const updatedPost = await prisma.post.update({
      where: { slug: postSlug },
      data: {
        likeCount: {
          [liked ? 'increment' : 'decrement']: 1,
        },
      },
    });

    return NextResponse.json({
      liked,
      likeCount: updatedPost.likeCount,
    });
  } catch (error) {
    console.error('Error updating like status:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
