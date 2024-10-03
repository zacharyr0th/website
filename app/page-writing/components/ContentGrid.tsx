import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArticleCard from './ArticleCard';
import { Content, ContentGridProps as BaseContentGridProps } from '@/lib/types'; // Adjust the import path based on the actual location

type ExtendedContentGridProps = BaseContentGridProps;

const ContentGrid: React.FC<ExtendedContentGridProps> = React.memo(({ content }) => {
  const gridItems = useMemo(
    () => content.map((item) => <ArticleCard key={item.id} article={item} />),
    [content]
  );

  return (
    <section className="py-6">
      <AnimatePresence>
        <motion.div
          key={content.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {gridItems}
        </motion.div>
      </AnimatePresence>
    </section>
  );
});

ContentGrid.displayName = 'ContentGrid';

export default ContentGrid;
