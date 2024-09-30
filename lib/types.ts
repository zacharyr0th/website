type ContentType = 'article' | 'review' | 'interview' | 'sheet-music';
type AudioType = 'composition' | 'dataset' | 'recording' | 'sheet-music' | 'theory';

type LanguageCode = string;
type Url = string;

interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: Url;
  keywords?: string[];
  structuredData?: Record<string, unknown>;
  lastModified?: string;
  socialShareImage?: Url;
  alternateLanguages?: Record<LanguageCode, Url>;
}

interface BaseItem {
  id: string;
  slug: string;
  title: string;
  content: string;
  author: string;
  date: string;
  language: LanguageCode;
  image: Url;
  tags?: string[];
}

export interface ContentItem extends BaseItem, SEOData {
  type: ContentType;
  pageViews: number;
  subtitle?: string;
  imageCaption?: string;
  description?: string;
  readTime?: string | number;
  likes?: number;
  comments?: number;
  shares?: number;
  bookAuthor?: string;
  composer?: string;
  fileType?: string;
}

export interface AudioItem extends BaseItem {
  type: AudioType;
  artist?: string;
  duration: string;
  fileType: string;
  fileSize: number;
}

export type Content = ContentItem;

export const validContentTypes: readonly ContentType[] = ['article', 'review', 'interview'];

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export interface WritingPageProps {
  searchParams: SearchParams;
}

export interface WritingPageClientProps {
  initialContent: ContentItem[];
  contentType?: Exclude<ContentType, 'sheet-music'>;
}

export interface FeaturedSectionProps {
  content: Content[];
}

export interface CategoriesProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export interface ContentGridProps {
  content: ContentItem[];
}

export interface ArticleCardProps {
  article: Pick<ContentItem, 'title' | 'subtitle' | 'slug' | 'image' | 'type'>;
}

export interface FeaturedCardProps {
  article: ContentItem;
}

export type WritingContentType = 'all' | Exclude<ContentType, 'sheet-music'>;

export interface WritingMetadata {
  slug: string;
  title: string;
}

export interface RecommendedWritingContent {
  title: string;
  image: Url;
  link: Url;
}

export interface Category {
  id: string;
  name: string;
}

export interface FeaturedWritingItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

export type FeaturedWriting = FeaturedWritingItem[];
