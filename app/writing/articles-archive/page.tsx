'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

type Content = {
  id: string;
  slug: string;
  title: string;
  image: string;
  date?: string;
  author?: string;
  description?: string;
  tags?: string[] | string;
  pageViews: number;
  readTime?: number;
  type: 'article' | 'review' | 'interview';
};

export default function ArticlesArchive() {
  const [articles, setArticles] = useState<Content[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [articles, searchTerm]);

  return (
    <div className="min-h-screen bg-inherit text-gray-300">
      <header className="sticky top-0 z-10 bg-inherit shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-4xl font-bold">Articles Archive</h1>
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
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-inherit rounded-lg overflow-hidden">
              <thead className="bg-[#1a1a1a]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tags</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Read Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredArticles.map((article) => (
                  <motion.tr 
                    key={article.slug}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ backgroundColor: 'rgba(26, 26, 26, 0.5)' }}
                    className="cursor-pointer"
                    onClick={() => window.location.href = `/writing/${article.slug}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      <div className="w-12 h-12">
                        <Image
                          src={article.image}
                          alt={article.title}
                          width={50}
                          height={50}
                          className="rounded-full object-cover w-full h-full"
                        />
                      </div>
                      <div className="ml-4 text-sm font-medium text-gray-300">{article.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {article.tags ? (
                          Array.isArray(article.tags) ? (
                            article.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-700 text-gray-300">
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-700 text-gray-300">
                              {article.tags}
                            </span>
                          )
                        ) : (
                          <span className="text-gray-500">No tags</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400">{article.readTime} min</div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
