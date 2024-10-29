interface ArticleTagsProps {
    tags: string[];
    variant: 'default' | 'featured' | 'side';
  }
  
  export const ArticleTags = ({ tags, variant }: ArticleTagsProps) => (
    <div className="flex flex-wrap gap-1.5 mb-2" role="list" aria-label="Article tags">
      {tags.slice(0, variant === 'featured' ? 3 : 2).map((tag) => (
        <span 
          key={tag} 
          role="listitem"
          className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-accent/10 text-accent"
        >
          {tag}
        </span>
      ))}
    </div>
  );