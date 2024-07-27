import { getContentItems } from '../../../lib/content';
import { notFound } from 'next/navigation';

type ContentItem = {
  slug: string;
  title: string;
  content?: string; // Make content optional
};

export async function generateStaticParams() {
  const posts = getContentItems(); // Ensure this returns the correct items
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function WritingPage({ params }: { params: { slug: string } }) {
  const post = getContentItems().find((post) => post.slug === params.slug);

  if (!post || !post.content) { // Check if post and post.content are valid
    notFound();
    return null;
  }

  // Optionally sanitize post.content here if needed

  return (
    <article className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} /> {/* Ensure post.content is valid */}
    </article>
  );
}