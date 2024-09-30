import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Content, FeaturedCardProps } from '@/lib/types';

interface ExtendedFeaturedCardProps extends FeaturedCardProps {
  priority?: boolean;
}

const FeaturedCard: React.FC<ExtendedFeaturedCardProps> = React.memo(({ article, priority = false }) => (
  <Link href={`/writing/${article.slug}`}>
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 mx-auto max-w-2xl">
      <div className="relative h-64">
        <Image
          src={article.image || '/placeholder.jpg'}
          alt={`Cover image for ${article.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
          loading="eager"
          priority={priority}
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-2">{article.title}</h3>
        {article.subtitle && <p className="text-gray-400 text-lg">{article.subtitle}</p>}
      </div>
    </div>
  </Link>
));

export default FeaturedCard;
