import { Dispatch, SetStateAction } from 'react';

export type ContentType = 'article' | 'review' | 'project';
export type AudioType = 'composition' | 'dataset' | 'recording' | 'theory';
export type Url = string & { readonly brand: unique symbol };

type SEOData = {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: Url;
  keywords?: readonly string[];
  structuredData?: Record<string, unknown>;
  lastModified?: string;
  socialShareImage?: Url;
};

type BaseItem = {
  id: string;
  slug: string;
  title: string;
  content: string;
  author: string;
  date: string;
  image?: Url;
  tags?: readonly string[];
};

export type ContentItem = BaseItem &
  SEOData & {
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
  primaryArticle: Article;
  sideArticles: Article[];
  randomArticles: Article[];
  onRefreshRandomSelection: () => void;
  featuredArticles: Article[];
  currentFeaturedIndex: number;
  onNextArticle: () => void;
  onPrevArticle: () => void;
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
  className?: string;
  variant?: 'featured' | 'side';
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

export type FooterProps = {};

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
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
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

export type Theme = 'light' | 'dark';

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type NavButtonType = 'primary' | 'secondary' | 'tertiary';

export interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'default';
  children: React.ReactNode;
}

// Add these new types
export type LearningProject = {
  id: string;
  title: string;
  description: string;
  technologies?: string[];
  features?: string[];
  articleLink: string;
  githubLink?: string;
  demoLink?: string;
  lastUpdated: string;
};

export type ProjectPanelsProps = {
  visibleProjects: number;
};

export type HeroProps = {
  theme: Theme;
};
export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: {
    src: string;
    alt: string;
  };
  category: string;
  date: string;
  link: string;
  frontmatter: {
    title: string;
    date: string;
    featured: boolean;
    // Add any other frontmatter fields you might use
  };
}
