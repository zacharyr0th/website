import React, { memo } from 'react';
import { motion } from 'framer-motion';
import type { Skill } from '../types';
import { Section } from './Section';
import { cn } from '@/lib';

interface SkillsProps {
  data: Skill[];
}

interface SkillCategoryProps {
  category: string;
  skills: Skill[];
}

const SkillTag = memo<{ name: string }>(({ name }) => (
  <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-white/5 text-zinc-400 rounded-md transition-colors hover:bg-white/10">
    {name}
  </span>
));

SkillTag.displayName = 'SkillTag';

const SkillCategory = memo<SkillCategoryProps>(({ category, skills }) => (
  <div className="p-1.5 group/card">
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.17, 0.55, 0.55, 1] }}
      className={cn(
        'group relative p-6 backdrop-blur-sm rounded-2xl border border-white/5',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-accent/50',
        'flex flex-col gap-4 h-full',
        'bg-white/[0.02] hover:bg-white/[0.06]'
      )}
    >
      <h3 className="text-xl font-semibold text-white group-hover/card:text-accent transition-colors">
        {category}
      </h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {skills
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((skill) => (
            <SkillTag key={skill.name} name={skill.name} />
          ))}
      </div>
    </motion.article>
  </div>
));

SkillCategory.displayName = 'SkillCategory';

export function Skills({ data }: SkillsProps) {
  const categories = Array.from(new Set(data.map((skill) => skill.category))).sort();

  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <SkillCategory
            key={category}
            category={category}
            skills={data.filter((skill) => skill.category === category)}
          />
        ))}
      </div>
    </Section>
  );
}
