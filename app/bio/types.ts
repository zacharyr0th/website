export interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export interface TimelineItemProps {
  date: string;
  title: string;
  company?: string;
  description: readonly string[];
  highlights?: readonly string[];
  index: number;
}

export interface Achievement {
  title: string;
  organization: string;
  year: string;
  description: string;
}

export interface SkillGroup {
  title: string;
  skills: readonly string[];
  description?: string;
}

export interface SkillCategoryProps {
  category: string;
  skillGroups: readonly SkillGroup[];
} 