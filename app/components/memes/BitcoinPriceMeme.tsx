import Image from 'next/image';
import { memo } from 'react';

interface BitcoinPriceMemeProps {
  className?: string;
}

const BitcoinPriceMeme = ({ className }: BitcoinPriceMemeProps) => {
  return (
    <figure className={`relative w-full ${className}`}>
      <Image
        src="/images/bitcoin-price-meme.webp"
        alt="A humorous meme showing the psychological impact of Bitcoin price changes. The top panel shows regret at not buying Bitcoin at $49k when it reaches $74k in March 2024. The bottom panel shows resistance to buying at $49k in August 2024."
        width={800}
        height={600}
        className="w-full h-auto rounded-lg shadow-lg"
        priority={false}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
      />
      <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
        The cyclical nature of crypto market psychology
      </figcaption>
    </figure>
  );
};

export default memo(BitcoinPriceMeme); 