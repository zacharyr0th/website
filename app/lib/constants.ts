import { LearningProject, WritingProject, NavItem } from './types';

export const CONFIG = {
  visibleProjects: 6,
};

export const learningProjects: LearningProject[] = [
  {
    id: "project-1",
    title: "Project 1",
    description: "Description",
    technologies: ["Tech1", "Tech2"],
    features: ["Feature1", "Feature2"],
    githubLink: "https://github.com/...",
    articleLink: "https://...",
    lastUpdated: new Date("2024-01-01").toISOString()
  },
];

export const writingProjects: WritingProject[] = [
  // Add your writing projects here
];

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/in/zacharyr0th',
  twitter: 'https://twitter.com/zacharyr0th',
  email: 'mailto:zacharyroth@pm.me',
  github: 'https://github.com/zacharyroth'
};

export const COLORS = {
  surface: 'var(--color-surface)',
  primary: 'var(--color-primary)',
  accent: 'var(--color-accent)'
};

export const ANIMATIONS = {
  fadeIn: 'animate-fadeIn',
  slideIn: 'animate-slideIn'
};

export const navItems: NavItem[] = [
  { label: 'Projects', href: '/projects' },
  { label: 'Writing', href: '/writing' }
];

export { THEME_ICONS } from '../components/common/ThemeIcons';
export { ArrowPathIcon as RefreshIcon } from '@heroicons/react/24/solid';