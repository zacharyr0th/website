'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { AudioItem } from '@/lib/types';

interface AudioArchiveProps {
  initialAudioItems: AudioItem[];
}

export default function AudioArchive({ initialAudioItems }: AudioArchiveProps) {
  const router = useRouter();
  const [audioItems, setAudioItems] = useState<AudioItem[]>(initialAudioItems);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAudioItems = useMemo(() => {
    return audioItems.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [audioItems, searchTerm]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('AudioArchive mounted with', audioItems.length, 'audio items');
    }
  }, [audioItems]);

  if (audioItems.length === 0) {
    return <div>No audio items available. Please check the console for more information.</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <div className="min-h-screen bg-inherit text-gray-300">
      <header className="bg-inherit shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-4xl font-bold">Audio Archive</h1>
          <input
            type="text"
            placeholder="Search audio..."
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
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredAudioItems.map((item) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ backgroundColor: 'rgba(26, 26, 26, 0.5)' }}
                  className="cursor-pointer"
                  onClick={() => router.push(`/audio/${item.slug || ''}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <div className="w-12 h-12">
                      <Image
                        src={item.image || '/images/audio-placeholder.webp'}
                        alt={item.title}
                        width={50}
                        height={50}
                        className="rounded-full object-cover w-full h-full"
                        loading={process.env.NODE_ENV !== 'production' ? 'eager' : 'lazy'}
                      />
                    </div>
                    <div className="ml-4 text-sm font-medium text-gray-300">{item.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {item.tags ? (
                        item.tags.map((tag: string, index: number) => (
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
                    <div className="text-sm text-gray-300">{formatDate(item.date)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">{item.duration}</div>
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
