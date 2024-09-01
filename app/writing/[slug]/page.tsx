import React, { ReactElement } from 'react';
import { getContentItems } from '../../../lib/content';
import { notFound } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';
import './writing.css';

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
  bookAuthor?: string;
};

export async function generateStaticParams() {
  const items = await getContentItems(undefined);
  return items.map((post) => ({ slug: post.slug }));
}

function truncateText(text: string, maxLength: number) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

const CustomLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(href, '_blank');
  };

  return (
    <a href={href} onClick={handleClick} className="text-blue-400 hover:text-blue-300 underline font-bold">
      {children}
    </a>
  );
};

export default async function WritingPage({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    notFound();
  }

  try {
    const posts = await getContentItems(undefined);
    const currentPostIndex = posts.findIndex((post) => post.slug === params.slug);

    if (currentPostIndex === -1) {
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
          /<(article|h[1-6]|p|ul|ol|li|blockquote|a|github-embed|twitter-embed)>([\s\S]*?)<\/\1>/g,
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
                  (_: string, href: string, attrs: string, linkText: string) => {
                    const formattedHref = href.startsWith('http') ? href : `https://${href}`;
                    return `<a href="${formattedHref}" class="text-blue-400 hover:text-blue-300 underline" target="_blank"${attrs}>${linkText}</a>`;
                  }
                );
              case 'github-embed':
                const [owner, repo, path] = text.split('/');
                return `<div class="my-4"><GitHubEmbed owner="${owner}" repo="${repo}" path="${path}" /></div>`;
              case 'twitter-embed':
                return `<div class="my-4"><TwitterEmbed tweetId="${text}" /></div>`;
              default:
                return match;
            }
          }
        );
      }
      return content;
    };

    const formattedContent = formatContent(sanitizedContent);

    const getRandomRecommendations = (currentSlug: string, count: number, posts: Post[]) => {
      const filteredPosts = posts.filter((post) => post.slug !== currentSlug);
      return filteredPosts.sort(() => 0.5 - Math.random()).slice(0, count);
    };

    const recommendations = getRandomRecommendations(params.slug, 3, posts);

    return (
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-inherit">
        {renderNavigationButtons(prevPost, nextPost)}
        <article className="bg-inherit">
          {renderHeader(post)}
          {renderContent(formattedContent)}
          {renderTags(post.tags)}
          {renderRecommendations(recommendations)}
        </article>
      </div>
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    notFound();
  }
}

function renderNavigationButtons(prevPost: Post | null, nextPost: Post | null) {
  return (
    <>
      {prevPost && (
        <Link href={`/writing/${prevPost.slug}`} className="fixed left-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <button className="bg-inherit text-gray-600 p-3 rounded-full hover:bg-gray-200 transition-all duration-300">
            <FaChevronLeft size={24} />
          </button>
        </Link>
      )}
      {nextPost && (
        <Link href={`/writing/${nextPost.slug}`} className="fixed right-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <button className="bg-inherit text-gray-600 p-3 rounded-full hover:bg-gray-200 transition-all duration-300">
            <FaChevronRight size={24} />
          </button>
        </Link>
      )}
    </>
  );
}

function renderHeader(post: Post) {
  return (
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
  );
}

function renderContent(formattedContent: string | ReactElement) {
  return (
    <div className="prose prose-lg max-w-none prose-invert article-content">
      {typeof formattedContent === 'string' ? (
        <div
          dangerouslySetInnerHTML={{
            __html: formattedContent
              .replace(/<GitHubEmbed([^>]*)>/g, (_, props) => `<GitHubEmbed ${props} />`)
              .replace(/<TwitterEmbed([^>]*)>/g, (_, props) => `<TwitterEmbed ${props} />`),
          }}
        />
      ) : (
        formattedContent
      )}
    </div>
  );
}

function renderTags(tags: string[] | undefined) {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="mt-8 flex items-center">
      <h3 className="text-lg font-semibold mr-2 text-gray-300">Tags:</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function renderRecommendations(recommendations: Post[]) {
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-semibold mb-4">Recommended Reading</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recommendations.map((rec) => (
          <Link
            key={rec.slug}
            href={`/writing/${rec.slug}`}
            className="block bg-[#1a1a1a] rounded-lg shadow-lg hover:bg-[#242424] transition-all duration-300 h-[360px] overflow-hidden"
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
            <div className="p-4 flex flex-col h-[calc(100%-12rem)] justify-between">
              <div>
                <h4 className="text-lg font-semibold mb-1 line-clamp-2">{rec.title}</h4>
                {rec.type === 'review' ? (
                  <p className="text-sm text-gray-400 mb-1">Book by {rec.bookAuthor}</p>
                ) : (
                  <p className="text-sm text-gray-400 mb-1">by Zachary Roth</p>
                )}
                <p className="text-xs text-gray-500">
                  {rec.type.charAt(0).toUpperCase() + rec.type.slice(1)}
                </p>
              </div>
              {rec.tags && rec.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-auto">
                  {rec.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
