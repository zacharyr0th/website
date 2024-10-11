import { Dispatch, SetStateAction } from 'react';

export type ContentType = 'article' | 'review' | 'interview';
export type AudioType = 'composition' | 'dataset' | 'recording' | 'theory';
export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'it' | 'ja' | 'ko' | 'zh';
export type Url = string & { readonly brand: unique symbol };

type SEOData = {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: Url;
  keywords?: readonly string[];
  structuredData?: Record<string, unknown>;
  lastModified?: string;
  socialShareImage?: Url;
  alternateLanguages?: Readonly<Record<LanguageCode, Url>>;
};

type BaseItem = {
  id: string;
  slug: string;
  title: string;
  content: string;
  author: string;
  date: string;
  language: LanguageCode;
  image?: Url;
  tags?: readonly string[];
};

export type ContentItem = BaseItem & SEOData & {
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
};

export type AudioItem = BaseItem & {
  type: AudioType;
  artist?: string;
  duration: string;
  fileType: string;
  fileSize: number;
};

export type SearchParams = Readonly<Record<string, string | readonly string[] | undefined>>;

export type WritingPageProps = {
  searchParams: SearchParams;
};

export type WritingPageClientProps = {
  initialContent: ContentItem[];
  contentType?: ContentType;
};

export type FeaturedSectionProps = {
  content: FeaturedWriting;
};

export type CategoriesProps = {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
};

export type ContentGridProps = {
  content: ContentItem[];
};

export type ArticleCardProps = {
  article: Pick<ContentItem, 'title' | 'subtitle' | 'slug' | 'image' | 'type'>;
};

export type FeaturedCardProps = {
  article: ContentItem;
};

export type WritingContentType = 'all' | ContentType;

export type WritingMetadata = {
  slug: string;
  title: string;
};

export type RecommendedWritingContent = {
  title: string;
  image: Url;
  link: Url;
};

export type Category = {
  id: string;
  name: string;
};

export type FeaturedWritingItem = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
};

export type FeaturedWriting = FeaturedWritingItem[];

export type FooterProps = {
  changeLanguage: ChangeLanguageFunction;
};

export type ChangeLanguageFunction = (lng: string) => void;

export type NavigationProps = {
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

export type NavItem = {
  label: string;
  href: string;
};

export type Project = {
  id: number;
  title: string;
  logo: string;
  description: string;
  link: string;
};

export type ProjectsPageProps = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

export type ProjectCardProps = {
  project: Project;
  isActive: boolean;
  onKeyDown: (e: React.KeyboardEvent) => void;
};

export type ProjectRef = HTMLDivElement | null;
export type ProjectRefs = React.MutableRefObject<ProjectRef[]>;

export type ButtonProps = {
  primary?: boolean;
  secondary?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export type Theme = 'light' | 'dark' | 'sepia' | 'high-contrast';

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

// Add this to the existing types
export type NavButtonType = 'primary' | 'secondary' | 'tertiary';

export type NavButtonProps = ButtonProps & {
  variant: NavButtonType;
};