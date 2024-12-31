import { ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export type ContentType = 'article' | 'review' | 'project' | 'audio';

export type AudioType =
  | 'composition'
  | 'dataset'
  | 'recording'
  | 'theory'
  | 'song'
  | 'album'
  | 'playlist';

export type NavItem = {
  label: string;
  href: string;
};

export type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'default' | 'icon';
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
  ref?: React.RefObject<HTMLButtonElement>;
  asChild?: boolean;
};

export interface ArticleImage {
  src: string;
  alt: string;
}

export interface ArticleFrontmatter {
  title: string;
  date: string;
  description?: string;
  image?: ArticleImage;
  featured?: boolean;
  draft?: boolean;
  category?: string;
  tags?: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  description?: string;
  content: string;
  image?: {
    src: string;
    alt: string;
  };
  category?: string;
  date: string;
  tags?: string[];
  link: string;
  frontmatter: ArticleFrontmatter;
}

export interface LearningProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubLink?: string;
  link?: string;
  tags?: string[];
  features?: string[];
  demoLink?: string;
  lastUpdated?: string;
  articleLink?: string;
}

export interface WritingProject {
  id: string;
  title: string;
  description: string;
  link: string;
  publishDate: string;
  tags: string[];
  readTime: number;
}

export interface ArticleSwitcherProps {
  prev?: {
    title: string;
    link: string;
  };
  next?: {
    title: string;
    link: string;
  };
}

export interface NavButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  label?: string;
}

export type ProjectCategory = 'web' | 'mobile' | 'blockchain' | 'ai' | 'system' | 'tools' | 'other';

export interface WritingCategory {
  id: string;
  name: string;
  slug: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  muted: string;
  subtle: string;
  privvy: string;
  text: {
    primary: string;
    secondary: string;
  };
  border: string;
}
