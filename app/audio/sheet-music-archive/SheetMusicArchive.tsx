'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ContentItem } from '@/lib/types';
import catalog from '../data/sheet_music_catalog.json';

type CatalogEntry = {
  title: string;
  composer?: string;
  tags?: string[];
  fileType: string;
};

const tabButtonStyle = `
  px-4 py-2 text-sm font-medium text-gray-300 bg-transparent 
  border border-gray-700 rounded-md transition-colors duration-300 
  hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 
  focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white
`;

interface SheetMusicArchiveProps {
  initialSheetMusic: ContentItem[];
}

const transformToContentItem = (slug: string, entry: CatalogEntry): ContentItem => ({
  id: slug,
  slug,
  title: entry.title,
  composer: entry.composer,
  tags: entry.tags,
  fileType: entry.fileType,
  image: '',
  pageViews: 0,
  type: 'sheet-music',
  content: '',
  author: entry.composer || 'Unknown', // Add author property
  date: new Date().toISOString(), // Add date property with current date
});

export default function SheetMusicArchive({ initialSheetMusic }: SheetMusicArchiveProps) {
  const [sheetMusic, setSheetMusic] = useState<ContentItem[]>(initialSheetMusic);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSheetMusic = useMemo(() => {
    return sheetMusic.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.composer?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sheetMusic, searchTerm]);

  useEffect(() => {
    const musicList = Object.entries(catalog as Record<string, CatalogEntry>).map(
      ([slug, metadata]) => transformToContentItem(slug, metadata)
    );
    setSheetMusic(musicList);
    console.log('SheetMusicArchive mounted with', musicList.length, 'items');
  }, []);

  if (sheetMusic.length === 0) {
    return <div>No sheet music available. Please check the console for more information.</div>;
  }

  return (
    <div className="min-h-screen bg-inherit text-gray-300">
      <header className="bg-inherit shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-4xl font-bold">Sheet Music</h1>
          <input
            type="text"
            placeholder="Search sheet music..."
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
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Composer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredSheetMusic.map((item) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ backgroundColor: 'rgba(26, 26, 26, 0.5)' }}
                  className="cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-300">{item.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{item.composer || 'Unknown'}</div>
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
                    <a
                      href={`/api/downloads?file=${item.slug}.${item.fileType}`}
                      className={tabButtonStyle}
                      download
                    >
                      Download
                    </a>
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