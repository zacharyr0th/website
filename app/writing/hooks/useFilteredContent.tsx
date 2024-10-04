import { useMemo } from 'react';
import { Content } from '@/lib/types';

export const useFilteredContent = (content: Content[], activeCategory: string) => {
  return useMemo(() => {
    return activeCategory === 'all'
      ? content
      : content.filter((item) => item.type === activeCategory);
  }, [content, activeCategory]);
};
