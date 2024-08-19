import { getContentItems } from '../../../lib/content';
import { notFound } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';
import { ReactElement } from 'react';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';
import './writing.css'; // Adjust the path as necessary

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
  description?: string;
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

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
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
        let isFirstParagraph = true;
        return content.replace(
          /<(article|h[1-6]|p|ul|ol|li|blockquote|a)>([\s\S]*?)<\/\1>/g,
          (match, tag, text) => {
            switch (tag) {
              case 'article':
                return `<article class="space-y-6">${text}</article>`;
              case 'h1':
                return `<h1 class="text-4xl font-bold mt-10 mb-6">${text}</h1>`;
              case 'h2':
                return `<h2 class="text-3xl font-semibold mt-8 mb-4">${text}</h2>`;
              case 'h3':
                return `<h3 class="text-2xl font-semibold mt-6 mb-3">${text}</h3>`;
              case 'h4':
                return `<h4 class="text-xl font-semibold mt-5 mb-2">${text}</h4>`;
              case 'h5':
                return `<h5 class="text-lg font-semibold mt-4 mb-2">${text}</h5>`;
              case 'h6':
                return `<h6 class="text-base font-semibold mt-3 mb-2">${text}</h6>`;
              case 'p':
                if (isFirstParagraph) {
                  isFirstParagraph = false;
                  return `<p class="intro-paragraph"><span class="drop-cap">${text.charAt(
                    0
                  )}</span>${text.slice(1)}</p>`;
                }
                return `<p class="mb-4 leading-relaxed">${text}</p>`;
              case 'ul':
                return `<ul class="list-disc list-inside space-y-2 mb-4">${text}</ul>`;
              case 'ol':
                return `<ol class="list-decimal list-inside space-y-2 mb-4">${text}</ol>`;
              case 'li':
                return `<li class="mb-1">${text}</li>`;
              case 'blockquote':
                return `<blockquote class="border-l-4 border-gray-500 pl-4 italic my-6">${text}</blockquote>`;
              case 'a':
                return text.replace(
                  /<a\s+(?:[^>]*?\s+)?href="([^"]*)"([^>]*)>(.*?)<\/a>/g,
                  (_: string, href: string, attrs: string, linkText: string) =>
                    `<a href="${href}" class="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer"${attrs}>${linkText}</a>`
                );
              default:
                return match;
            }
          }
        );
      }
      return content;
    };

    const formattedContent = formatContent(sanitizedContent);

    // Get 2-3 random recommendations
    const getRandomRecommendations = (currentSlug: string, count: number) => {
      const filteredPosts = posts.filter((post) => post.slug !== currentSlug);
      const shuffled = filteredPosts.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const recommendations = getRandomRecommendations(params.slug, 3);

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
            {post.subtitle && <h2 className="text-2xl text-gray-400 mb-4">{post.subtitle}</h2>}
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
            <div className="mt-8 flex items-center">
              <h3 className="text-lg font-semibold mr-2 text-gray-300">Tags:</h3>
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

          {/* Recommendations Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-4">Recommended Reading</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendations.map((rec) => (
                <Link
                  key={rec.slug}
                  href={`/writing/${rec.slug}`}
                  className="block bg-[#1a1a1a] rounded-lg shadow-lg hover:bg-[#242424] transition-all duration-300 h-[400px] overflow-hidden"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={rec.image || '/placeholder.jpg'}
                      alt={`Cover image for ${rec.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className="rounded-t-lg"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <h4 className="text-xl font-semibold mb-2">{rec.title}</h4>
                    <p className="text-gray-400 mb-4 flex-grow overflow-hidden">
                      {truncateText(rec.description || '', 100)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </div>
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    notFound();
  }
}
