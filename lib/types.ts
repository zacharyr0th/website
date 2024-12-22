import { ReactNode } from 'react';

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

export type NavItem = {
  label: string;
  href: string;
};

export type NavButtonProps = {
  variant?: 'primary' | 'secondary' | 'default';
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export type ButtonProps = {
  primary?: boolean;
  secondary?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export type ContentType = 'article' | 'review' | 'project';
export type AudioType = 'composition' | 'dataset' | 'recording' | 'theory';

export type LearningProject = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  githubLink: string;
  demoLink: string;
  lastUpdated: string;
  articleLink?: string;
};

export type ProjectCategory = 'web' | 'blockchain' | 'ai' | 'system' | 'tools';

export type WritingCategory = {
  id: string;
  name: string;
  slug: string;
};

export type Theme = 'light' | 'dark';
