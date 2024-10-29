import Image from 'next/image';

interface ArticleImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  variant: 'default' | 'featured' | 'side';
  className?: string;
}

export const ArticleImage = ({ src, alt, priority, variant, className }: ArticleImageProps) => (
  <Image
    src={src}
    alt={alt}
    fill
    priority={priority}
    className={className}
    sizes={variant === 'featured' ? '100vw' : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
  />
);