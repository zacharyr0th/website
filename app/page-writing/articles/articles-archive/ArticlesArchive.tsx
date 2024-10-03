'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { ContentItem } from '@/lib/types';

interface ArticlesArchiveProps {
  initialArticles: ContentItem[];
}

export default function ArticlesArchive({ initialArticles }: ArticlesArchiveProps) {
  const router = useRouter();
  const [articles, setArticles] = useState<ContentItem[]>(initialArticles);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredArticles = useMemo(() => {
    if (!searchTerm) return articles;
    const searchRegex = new RegExp(searchTerm.split('').join('.*'), 'i');
    return articles.filter(
      (article) =>
        searchRegex.test(article.title) ||
        article.tags?.some((tag) => searchRegex.test(tag)) ||
        (article.bookAuthor && searchRegex.test(article.bookAuthor))
    );
  }, [articles, searchTerm]);

  useEffect(() => {
    setArticles(initialArticles);
    console.log('ArticlesArchive mounted with', initialArticles.length, 'articles');
  }, [initialArticles]);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('default', { month: 'short', year: 'numeric' });
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prevState) => !prevState);
  }, []);

  const handleArticleClick = useCallback(
    (slug: string) => {
      router.push(`/writing/${slug || ''}`);
    },
    [router]
  );

  if (articles.length === 0) {
    return <div>No articles available. Please check the console for more information.</div>;
  }

  return (
    <div className="min-h-screen bg-inherit text-gray-300">
      <header className="bg-inherit shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="relative">
            <button onClick={toggleDropdown} className="text-4xl font-bold flex items-center">
              Articles Archive
            </button>
            {isDropdownOpen && (
              <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-gray-800">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <Link
                    href="/writing/reviews"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    role="menuitem"
                  >
                    Reviews Archive
                  </Link>
                  <Link
                    href="/writing/articles"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    role="menuitem"
                  >
                    Articles Archive
                  </Link>
                  <Link
                    href="/writing/interviews"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    role="menuitem"
                  >
                    Interviews Archive
                  </Link>
                </div>
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            className="w-1/3 px-4 py-2 rounded-full bg-inherit focus:outline-none focus:ring-2 focus:ring-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-inherit rounded-lg overflow-hidden">
            <thead className="bg-[#1a1a1a]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Read Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredArticles.map((article) => (
                <motion.tr
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ backgroundColor: 'rgba(26, 26, 26, 0.5)' }}
                  className="cursor-pointer"
                  onClick={() => handleArticleClick(article.slug || '')}
                >
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <div className="w-12 h-12">
                      <Image
                        src={article.image || '/images/placeholder.webp'}
                        alt={article.title}
                        width={50}
                        height={50}
                        className="rounded-full object-cover w-full h-full"
                        loading={process.env.NODE_ENV !== 'production' ? 'eager' : 'lazy'}
                      />
                    </div>
                    <div className="ml-4 text-sm font-medium text-gray-300">{article.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {article.tags ? (
                        article.tags.map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-700 text-gray-300"
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">No tags</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{formatDate(article.date)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">{article.readTime} min</div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
