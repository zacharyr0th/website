import { Dispatch, SetStateAction } from 'react';

export const ContentTypes = ['article', 'review', 'interview'] as const;
export const AudioTypes = ['composition', 'dataset', 'recording', 'theory'] as const;
export type ContentType = typeof ContentTypes[number];
export type AudioType = typeof AudioTypes[number];
export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'it' | 'ja' | 'ko' | 'zh';
export type Url = string & { readonly brand: unique symbol };

interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: Url;
  keywords?: readonly string[];
  structuredData?: Record<string, unknown>;
  lastModified?: string;
  socialShareImage?: Url;
  alternateLanguages?: Readonly<Record<LanguageCode, Url>>;
}

interface BaseItem {
  id: string;
  slug: string;
  title: string;
  content: string;
  author: string;
  date: string; 
  language: LanguageCode;
  image?: Url; 
  tags?: readonly string[];
}

export interface ContentItem extends BaseItem, SEOData {
  type: ContentType;
  pageViews: number;
  subtitle?: string;
  imageCaption?: string;
  description?: string;
  readTime?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  bookAuthor?: string;
  composer?: string;
}

export interface AudioItem extends BaseItem {
  type: AudioType;
  artist?: string;
  duration: string; 
  fileType: string;
  fileSize: number;
}

export type SearchParams = Readonly<Record<string, string | readonly string[] | undefined>>;

export interface WritingPageProps {
  searchParams: SearchParams;
}

export interface WritingPageClientProps {
  initialContent: ContentItem[];
  contentType?: ContentType; 
}

export interface FeaturedSectionProps {
  content: FeaturedWriting;
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

export type WritingContentType = 'all' | ContentType; 

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

export interface FooterProps {
  changeLanguage: ChangeLanguageFunction;
}

export type ChangeLanguageFunction = (lng: string) => void;

export interface NavigationProps {
  setTheme: Dispatch<SetStateAction<string>>;
}

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Projects', href: '/projects' },
  { label: 'Writing', href: '/writing' },
  { label: 'Audio', href: '/audio' },
];

export interface Project {
  id: number;
  title: string;
  logo: string;
  description: string;
  link: string;
}

export interface ProjectsPageProps {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

export interface ProjectCardProps {
  project: Project;
  isActive: boolean;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export type ProjectRef = HTMLDivElement | null;
export type ProjectRefs = React.MutableRefObject<ProjectRef[]>;
