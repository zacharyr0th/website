'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ContentItem } from '@/lib/types';
import catalog from '../data/sheet_music_catalog.json';

// Type definitions
type CatalogEntry = {
  title: string;
  composer?: string;
  tags?: string[];
  fileType: string;
  filename: string;
};

type SheetMusicItem = ContentItem & { filename: string };

type DownloadStatus = 'Downloading...' | 'Downloaded' | 'Error' | undefined;

interface SheetMusicArchiveProps {
  initialSheetMusic: SheetMusicItem[];
}

// Styles
const tabButtonStyle = `
  px-4 py-2 text-sm font-medium text-gray-300 bg-transparent 
  border border-gray-700 rounded-md transition-colors duration-300 
  hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 
  focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white
`;

// Animation variants
const buttonVariants = {
  idle: { backgroundColor: 'rgba(0, 0, 0, 0)' },
  downloading: { backgroundColor: 'rgba(74, 85, 104, 1)' },
  downloaded: { backgroundColor: 'rgba(74, 85, 104, 1)' },
  error: { backgroundColor: 'rgba(245, 101, 101, 1)' },
};

const textVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

// Helper functions
const transformToContentItem = (slug: string, entry: CatalogEntry): SheetMusicItem => ({
  id: slug,
  slug,
  title: entry.title,
  composer: entry.composer,
  tags: entry.tags,
  fileType: entry.fileType,
  filename: entry.filename,
  image: '',
  pageViews: 0,
  type: 'sheet-music',
  content: '',
  author: entry.composer || 'Unknown',
  date: new Date().toISOString(),
  language: 'en',
});

export default function SheetMusicArchive({ initialSheetMusic }: SheetMusicArchiveProps) {
  const [sheetMusic, setSheetMusic] = useState<SheetMusicItem[]>(initialSheetMusic);
  const [searchTerm, setSearchTerm] = useState('');
  const [downloadStatus, setDownloadStatus] = useState<Record<string, DownloadStatus>>({});

  // Memoize filtered sheet music
  const filteredSheetMusic = useMemo(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return sheetMusic.filter(
      (item) =>
        item.title.toLowerCase().includes(lowercasedSearchTerm) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(lowercasedSearchTerm)) ||
        item.composer?.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [sheetMusic, searchTerm]);

  // Load sheet music and download status on mount
  useEffect(() => {
    const musicList = Object.entries(catalog as Record<string, CatalogEntry>).map(
      ([slug, metadata]) => transformToContentItem(slug, metadata)
    );
    setSheetMusic(musicList);

    const storedStatus = localStorage.getItem('downloadStatus');
    if (storedStatus) {
      setDownloadStatus(JSON.parse(storedStatus));
    }
  }, []);

  // Save download status to localStorage
  useEffect(() => {
    localStorage.setItem('downloadStatus', JSON.stringify(downloadStatus));
  }, [downloadStatus]);

  // New useEffect hook to remove data-np-intersection-state attribute
  useEffect(() => {
    const input = document.querySelector('input[data-np-intersection-state]');
    if (input) {
      input.removeAttribute('data-np-intersection-state');
    }
  }, []);

  // Download file function
  const downloadFile = useCallback(
    async (item: SheetMusicItem) => {
      if (downloadStatus[item.slug] === 'Downloaded') {
        return; // Prevent re-downloading if already downloaded
      }
      setDownloadStatus((prev) => ({ ...prev, [item.slug]: 'Downloading...' }));
      try {
        const response = await fetch(`/api/downloads?file=${item.filename}`);
        if (!response.ok) throw new Error('Download failed');
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = item.filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        setDownloadStatus((prev) => ({ ...prev, [item.slug]: 'Downloaded' }));
      } catch (error) {
        console.error('Download error:', error);
        setDownloadStatus((prev) => ({ ...prev, [item.slug]: 'Error' }));
      }
    },
    [downloadStatus]
  );

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
            aria-label="Search sheet music"
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
                  Download
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
                  className="cursor-pointer hover:bg-gray-800/50"
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
                    <motion.button
                      className={`${tabButtonStyle} w-28`}
                      variants={buttonVariants}
                      animate={downloadStatus[item.slug] || 'idle'}
                      onClick={() => downloadFile(item)}
                      disabled={downloadStatus[item.slug] === 'Downloading...'}
                      aria-label={`Download ${item.title}`}
                    >
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={downloadStatus[item.slug] || 'Download'}
                          variants={textVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={{ duration: 0.2 }}
                        >
                          {downloadStatus[item.slug] || 'Download'}
                        </motion.span>
                      </AnimatePresence>
                    </motion.button>
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
