import { Dispatch, SetStateAction } from 'react';

export type ContentType = 'article' | 'review' | 'project';
export type AudioType = 'composition' | 'dataset' | 'recording' | 'theory';
export type Url = string & { readonly brand: unique symbol };
export type Theme = 'light' | 'dark';

export type SEOData = {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: Url;
  keywords?: readonly string[];
  structuredData?: Record<string, unknown>;
  lastModified?: string;
  socialShareImage?: Url;
};

export type BaseMediaItem = {
  id: string;
  slug: string;
  title: string;
  content: string;
  author: string;
  date: string;
  image?: Url;
  tags?: readonly string[];
};

export type ContentItem = BaseMediaItem &
  SEOData & {
    type: ContentType;
    pageViews: number;
    description: string;
    image: {
      src: string;
      alt: string;
    };
    // Optional fields grouped together
    subtitle?: string;
    imageCaption?: string;
    readTime?: number;
    likes?: number;
    comments?: number;
    shares?: number;
    bookAuthor?: string;
    composer?: string;
    frontmatter?: ArticleFrontmatter;
  };

export type AudioItem = BaseMediaItem & {
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

export type FooterProps = Record<string, never>;

export type NavigationProps = {
  setTheme: Dispatch<SetStateAction<Theme>>;
  showHomeButton?: boolean;
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

export interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface NavButtonProps extends ButtonProps {
  variant: 'primary' | 'secondary';
  active?: boolean;
}

export type LearningProject = {
  id: string;
  title: string;
  description: string;
  technologies?: string[];
  features?: string[];
  articleLink?: string;
  githubLink?: string;
  demoLink?: string;
  lastUpdated: string;
};

export type ProjectPanelsProps = {
  visibleProjects: number;
};

export interface ArticleFrontmatter {
  title: string;
  date: string;
  featured: boolean;
  subtitle?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  category?: string;
  tags?: readonly string[];
}

export interface AdjacentArticle {
  slug: string;
  title: string;
  date: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  content: string;
  image: {
    src: string;
    alt: string;
  };
  category?: string;
  date: string;
  link: string;
  tags?: readonly string[];
  frontmatter: ArticleFrontmatter;
  adjacentArticles?: {
    prev: AdjacentArticle | null;
    next: AdjacentArticle | null;
  };
}

export type HeroProps = {
  primaryArticle: Article;
  featuredArticles: Article[];
  onRefresh: () => void;
};

export type WritingProject = {
  id: string;
  title: string;
  description: string;
  link: string;
};

export interface ArchiveSectionProps {
  content: Article[];
  tags: string[];
  selectedTag: string;
  onTagChange: (tag: string) => void;
}

export type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'background'
  | 'surface'
  | 'muted'
  | 'subtle'
  | 'privvy';
export type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  muted: string;
  subtle: string;
  privvy: string;
};

export type HeroSection = {
  title: string;
  content: string;
  backgroundColor: string;
};

export type HeroContent = {
  name: string;
  title: string;
  aptosLink: string;
  sections: HeroSection[];
  chainLogos: readonly string[];
};

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';
export type Breakpoints = Record<Breakpoint, number>;

export type Config = {
  readonly maxContentLength: number;
  readonly supportedFileTypes: readonly string[];
  readonly breakpoints: Readonly<Breakpoints>;
  readonly visibleProjects: number;
};

export type SocialPlatform = 'twitter' | 'github' | 'linkedin';
export type SocialLinks = Record<SocialPlatform, string>;

export type ThemeIcons = {
  readonly [K in Theme]: React.ReactElement;
};

export type WritingCategory = {
  id: string;
  name: string;
  slug: string;
};

export type WritingTag = {
  id: string;
  name: string;
  count: number;
};

export type ProjectStatus = 'active' | 'completed' | 'archived';
export type ProjectCategory = 'web' | 'blockchain' | 'ai' | 'system' | 'tools';

export type ProjectMetadata = {
  status: ProjectStatus;
  category: ProjectCategory;
  startDate: string;
  endDate?: string;
  teamSize?: number;
  role?: string;
};

export type ExperienceItem = {
  date: string;
  title: string;
  company: string;
  description: readonly string[] | string[];
};

export type SkillCategory = {
  category: string;
  skills: readonly string[] | string[];
};

export type SectionProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export type TimelineItemProps = {
  item: ExperienceItem;
  index: number;
};

export type SkillCategoryProps = {
  category: {
    category: string;
    skills: readonly string[] | string[];
  };
};
