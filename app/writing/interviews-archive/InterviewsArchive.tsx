'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { ContentItem } from '@/lib/types';

interface InterviewsArchiveProps {
  initialInterviews: ContentItem[];
}

export default function InterviewsArchive({ initialInterviews }: InterviewsArchiveProps) {
  const router = useRouter();
  const [interviews, setInterviews] = useState<ContentItem[]>(initialInterviews);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInterviews = useMemo(() => {
    return interviews.filter((interview) =>
      interview.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [interviews, searchTerm]);

  useEffect(() => {
    console.log('InterviewsArchive mounted with', interviews.length, 'interviews');
  }, [interviews]);

  if (interviews.length === 0) {
    return <div>No interviews available. Please check the console for more information.</div>;
  }

  return (
    <div className="min-h-screen bg-inherit text-gray-300">
      <header className="sticky top-0 z-10 bg-inherit shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-4xl font-bold">Interviews Archive</h1>
          <input
            type="text"
            placeholder="Search interviews..."
            className="w-1/3 px-4 py-2 rounded-full bg-inherit focus:outline-none focus:ring-2 focus:ring-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInterviews.map((interview) => (
            <motion.div
              key={interview.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={interview.image || '/images/placeholder.webp'}
                alt={interview.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
                priority={true}
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{interview.title}</h2>
                <p className="text-gray-400 mb-4">{interview.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {interview.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-700 text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => router.push(`/writing/${interview.slug}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Read More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}