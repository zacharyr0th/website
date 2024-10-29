import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { ArticleTags } from './ArticleTags';

interface ArticleContentProps {
  title: string;
  description: string;
  link: string;
  tags?: string[];
  variant: 'default' | 'featured' | 'side';
  styles: {
    content: string;
    title: string;
    excerpt: string;
    link: string;
  };
}

export const ArticleContent = ({ title, description, link, tags, variant, styles }: ArticleContentProps) => (
  <div className={styles.content}>
    {tags && tags.length > 0 && <ArticleTags tags={tags} variant={variant} />}
    
    <h3 className={styles.title}>
      <Link 
        href={link} 
        className="focus:outline-none focus-visible:text-accent"
        aria-label={`Read ${title}`}
      >
        {title}
      </Link>
    </h3>
    <p className={styles.excerpt}>{description}</p>
    
    <Link 
      href={link} 
      className={`${styles.link} focus:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
      aria-hidden="true"
      tabIndex={-1}
    >
      {variant === 'side' ? 'Read more' : 'Read article'}
      <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  </div>
);