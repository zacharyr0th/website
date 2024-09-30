'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { ContentItem } from '@/lib/types';
import SearchBar from './SearchBar';

interface HeroSectionProps {
  initialContent: ContentItem[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ initialContent }) => {
  const [content, setContent] = useState<ContentItem[]>(initialContent || []);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('HeroSection mounted with', content?.length || 0, 'content items');
    }
  }, [content]);

  return (
    <section className="bg-inherit text-white py-4 pt-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Writing</h1>
        <p className="text-xl mb-10 max-w-3xl mx-auto text-center text-gray-300">
          Articles, reviews, and interviews on tech, finance, and more.
        </p>
        <SearchBar content={content} />
      </div>
      <hr className="mt-12 border-t border-gray-700 w-full pb-4 max-w-4xl mx-auto" />
    </section>
  );
};

export default HeroSection;
