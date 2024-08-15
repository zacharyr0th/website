import { getContentItems } from '../../../lib/content';
import { notFound } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';
import { ReactElement } from 'react';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type Post = {
  slug: string;
  title: string;
  author: string;
  date: string;
  type: string;
  image: string;
  content: string | ReactElement;
  subtitle?: string;
  readTime?: number;
  tags?: string[];
};

export async function generateStaticParams() {
  const items = await getContentItems(undefined);
  console.log(
    'Generated paths:',
    items.map((post) => ({ slug: post.slug }))
  );
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
    console.log(
      'All posts:',
      posts.map((p) => p.slug)
    );
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
    if (!content) {
      try {
        const ContentComponent = (
          await import(`../../../content/writing/${post.type}s/${params.slug}.tsx`)
        ).default;
        content = <ContentComponent />;
      } catch (error) {
        console.error('Error importing content component:', error);
        notFound();
      }
    }

    const sanitizedContent = typeof content === 'string' ? DOMPurify.sanitize(content) : content;

    const formatContent = (content: string | ReactElement) => {
      if (typeof content === 'string') {
        return content.replace(
          /<(article|h[1-6]|p|ul|ol|li|blockquote)>([\s\S]*?)<\/\1>/g,
          (match, tag, text) => {
            switch (tag) {
              case 'article':
                return `<article class="space-y-6">${text}</article>`;
              case 'h1':
                return `<h1 class="text-3xl font-bold mt-8 mb-4">${text}</h1>`;
              case 'h2':
                return `<h2 class="text-2xl font-semibold mt-8 mb-4">${text}</h2>`;
              case 'h3':
                return `<h3 class="text-xl font-semibold mt-6 mb-3">${text}</h3>`;
              case 'h4':
                return `<h4 class="text-base font-semibold mt-4 mb-2">${text}</h4>`;
              case 'p':
                return `<p class="mb-4 leading-relaxed">${text}</p>`;
              case 'ul':
                return `<ul class="list-disc list-inside space-y-2 mb-4">${text}</ul>`;
              case 'ol':
                return `<ol class="list-decimal list-inside space-y-2 mb-4">${text}</ol>`;
              case 'li':
                return `<li class="mb-1">${text}</li>`;
              case 'blockquote':
                return `<blockquote class="border-l-4 border-gray-500 pl-4 italic my-6">${text}</blockquote>`;
              default:
                return match;
            }
          }
        );
      }
      return content;
    };

    const formattedContent = formatContent(sanitizedContent);

    return (
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-inherit">
        {prevPost && (
          <Link
            href={`/writing/${prevPost.slug}`}
            className="fixed left-4 top-1/2 transform -translate-y-1/2"
          >
            <button className="bg-inherit text-gray-600 p-3 rounded-full hover:bg-gray-200 transition-all duration-300">
              <FaChevronLeft size={24} />
            </button>
          </Link>
        )}
        {nextPost && (
          <Link
            href={`/writing/${nextPost.slug}`}
            className="fixed right-4 top-1/2 transform -translate-y-1/2"
          >
            <button className="bg-inherit text-gray-600 p-3 rounded-full hover:bg-gray-200 transition-all duration-300">
              <FaChevronRight size={24} />
            </button>
          </Link>
        )}
        <article className="bg-inherit">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
            {post.subtitle && (
              <h2 className="text-2xl text-gray-400 mb-4">{post.subtitle}</h2>
            )}
            <div className="flex items-center text-sm text-gray-400">
              <span>{post.author}</span>
              <span className="mx-2">•</span>
              <span>{post.date}</span>
              <span className="mx-2">•</span>
              <span>{post.type.charAt(0).toUpperCase() + post.type.slice(1)}</span>
              {post.readTime && (
                <>
                  <span className="mx-2">•</span>
                  <span>{post.readTime} min read</span>
                </>
              )}
            </div>
          </header>

          <div className="prose prose-lg max-w-none prose-invert">
            {typeof formattedContent === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
            ) : (
              formattedContent
            )}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2 text-gray-300">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    notFound();
  }
}