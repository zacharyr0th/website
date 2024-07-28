export interface ContentItem {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  image: string;
  imageCaption?: string;
  pageViews: number;
  type: 'article' | 'review' | 'interview';
  description?: string;
  content: string;
  author: string;
  date: string;
  tags?: string[];
  readTime?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  bookAuthor?: string; 
}

export interface WritingPageClientProps {
  initialContent: ContentItem[];
  contentType?: 'article' | 'review' | 'interview';
}