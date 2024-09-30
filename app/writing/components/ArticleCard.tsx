import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArticleCardProps } from '@/lib/types';

const ArticleCard: React.FC<ArticleCardProps> = React.memo(({ article }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '300px',
  });

  const { title, subtitle, slug, image, type } = article;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getHoverText = (contentType: string) => {
    switch (contentType) {
      case 'article':
        return 'Read Article';
      case 'review':
        return 'Read Review';
      case 'interview':
        return 'Read Interview';
      default:
        return 'Read More';
    }
  };

  const hoverText = getHoverText(type);

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <Link href={`/writing/${slug}`}>
        <div className="relative h-48 group">
          <Image
            src={image || '/placeholder.jpg'}
            alt={`Cover image for ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: 'cover' }}
            loading="eager"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-bold px-4 py-2 bg-primary-600 rounded-full">
              {hoverText}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
          {subtitle && <p className="text-gray-400">{subtitle}</p>}
        </div>
      </Link>
    </motion.div>
  );
});

ArticleCard.displayName = 'ArticleCard';

export default ArticleCard;
