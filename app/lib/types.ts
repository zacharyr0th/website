import { ReactNode } from 'react';

export type Theme = 'light' | 'dark';
export type ContentType = 'article' | 'review' | 'project';
export type AudioType = 'composition' | 'dataset' | 'recording' | 'theory';

export interface WritingCategory {
  id: string;
  name: string;
  slug: string;
}

export interface LearningProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  githubLink: string;
  demoLink: string;
  lastUpdated: string;
  articleLink?: string;
}

export interface WritingProject {
  id: string;
  title: string;
  description: string;
  link: string;
}

export interface NavItem {
  label: string;
  href: string;
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
  status: {
    error: string;
    success: string;
    warning: string;
    info: string;
  };
}

export interface ThemedComponentProps {
  theme?: Theme;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
