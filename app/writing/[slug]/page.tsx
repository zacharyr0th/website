import { getContentItems } from '../../../lib/content';
import { notFound } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';
import CommentSection from '../../../components/CommentSection';
import LikeButton from '../../../components/LikeButton';
import ShareButton from '../../../components/ShareButton';

type ContentItem = {
  slug: string;
  title: string;
  content: string;
  image: string;
  author: string;
  date: string;
  type: 'article' | 'review' | 'interview';
};

export async function generateStaticParams() {
  const posts = getContentItems();
  console.log('Generated paths:', posts.map(post => ({ slug: post.slug })));
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function WritingPage({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    console.error('Slug is undefined');
    notFound();
  }

  const post = getContentItems().find((post) => post.slug === params.slug);
  
  console.log('Requested slug:', params.slug);
  console.log('Found post:', post);

  if (!post || !post.content) {
    console.error('Post not found or content missing for slug:', params.slug);
    notFound();
  }

  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <Image
        src={`/images/writing/${post.type}s/${post.slug}/${post.image}`}
        alt={post.title}
        width={800}
        height={400}
        className="rounded-lg mb-8"
      />
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600 mb-6">
        <span>{post.author}</span> • <span>{post.date}</span> • <span>{post.type}</span>
      </div>
      <div 
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
      />
      <div className="flex items-center space-x-4 mb-8">
        <LikeButton postSlug={post.slug} />
        <ShareButton postSlug={post.slug} />
      </div>
      <CommentSection postSlug={post.slug} />
    </article>
  );
}