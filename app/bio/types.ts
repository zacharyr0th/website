import type { IconType } from 'react-icons';

export interface Experience {
  date: string;
  title: string;
  company: string;
  description: string[];
  highlights?: string[];
  '2024 Highlights'?: string[];
}

export interface Skill {
  name: string;
  level: 'expert' | 'advanced' | 'intermediate';
  category: string;
}

export interface SocialLink {
  icon: IconType;
  url: string;
  label: string;
}

export interface BioData {
  basics: {
    name: string;
    title: string;
    location: string;
    intro: string;
    socialLinks: SocialLink[];
  };
  experience: Experience[];
  skills: Skill[];
}

export interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export interface TimelineItemProps extends Experience {
  index: number;
}
