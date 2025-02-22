'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedContentProps {
  content: string;
  className?: string;
}

export default function AnimatedContent({ content, className = '' }: AnimatedContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
} 