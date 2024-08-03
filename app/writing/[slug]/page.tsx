import { getContentItems } from '../../../lib/content';
import { notFound } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';
import LikeButton from '../../../components/LikeButton';
import ShareButton from '../../../components/ShareButton';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CommentSection = dynamic(() => import('@/components/comment-section/CommentSection'), {
  ssr: false,
});

type Post = {
  slug: string;
  title: string;
  author: string;
  date: string;
  type: string;
  image: string;
  content: string | ReactElement;
};

export async function generateStaticParams() {
  const items = await getContentItems(undefined);
  console.log('Generated paths:', items.map((post) => ({ slug: post.slug })));
  return items.map((post) => ({
    slug: post.slug,
  }));
}

export default async function WritingPage({ params }: { params: { slug: string } }) {
  console.log('Rendering page for slug:', params.slug);

  if (!params.slug) {
    console.error('Slug is undefined');
    notFound();
  }

  try {
    const posts = await getContentItems(undefined);
    console.log('All posts:', posts.map(p => p.slug));
    const currentPostIndex = posts.findIndex((post) => post.slug === params.slug);

    if (currentPostIndex === -1) {
      console.error('Post not found for slug:', params.slug);
      notFound();
    }

    const post = posts[currentPostIndex];
    const prevPost = currentPostIndex > 0 ? posts[currentPostIndex - 1] : null;
    const nextPost = currentPostIndex < posts.length - 1 ? posts[currentPostIndex + 1] : null;

    let content: string | ReactElement = post.content;

    // If content is empty, try to import the component
    if (!content && post.type === 'review') {
      try {
        const ReviewComponent = (await import(`../../../content/writing/reviews/${params.slug}.tsx`)).default;
        content = <ReviewComponent />;
      } catch (error) {
        console.error('Error importing review component:', error);
        notFound();
      }
    }

    const sanitizedContent = typeof content === 'string' ? DOMPurify.sanitize(content) : content;

    return (
      <div className="relative">
        {prevPost && (
          <Link href={`/writing/${prevPost.slug}`} className="fixed left-4 top-1/2 transform -translate-y-1/2">
            <button className="bg-inherit text-white p-3 rounded-full hover:bg-black/60 transition-all duration-300">
              <FaChevronLeft size={24} />
            </button>
          </Link>
        )}
        {nextPost && (
          <Link href={`/writing/${nextPost.slug}`} className="fixed right-4 top-1/2 transform -translate-y-1/2">
            <button className="bg-inherit text-white p-3 rounded-full hover:bg-black/60 transition-all duration-300">
              <FaChevronRight size={24} />
            </button>
          </Link>
        )}
        <article className="container mx-auto px-4 py-8 max-w-3xl">
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={400}
            className="rounded-lg mb-8"
          />
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-gray-600 mb-6">
            <span>{post.author}</span> • <span>{post.date}</span> • <span>{post.type.charAt(0).toUpperCase() + post.type.slice(1)}</span>
          </div>
          {typeof sanitizedContent === 'string' ? (
            <div
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          ) : (
            <div className="prose prose-lg max-w-none mb-12">
              {sanitizedContent}
            </div>
          )}
          <div className="flex items-center space-x-4 mb-8">
            <LikeButton postSlug={post.slug} />
            <ShareButton postSlug={post.slug} />
          </div>
          <CommentSection postSlug={post.slug} />
        </article>
      </div>
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    notFound();
  }
}