export interface Content {
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
  bookAuthor?: string; // For reviews
}

export interface WritingPageClientProps {
  initialContent: Content[];
  contentType?: 'article' | 'review' | 'interview';
}