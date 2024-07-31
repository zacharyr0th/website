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

export interface AudioItem {
  id: string;
  slug: string;
  title: string;
  artist?: string;
  type: 'composition' | 'dataset' | 'recording' | 'sheet-music' | 'theory';
  tags?: string[];
  date: string;
  duration: string;
  image?: string;
  content: string;
  fileType: string;
  fileSize: number;
}