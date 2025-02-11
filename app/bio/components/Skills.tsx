import React, { memo } from 'react';
import { motion } from 'framer-motion';
import type { Skill } from '../types';
import { Section } from './Section';

interface SkillsProps {
  data: Skill[];
}

interface SkillCategoryProps {
  category: string;
  skills: Skill[];
}

const SkillTag = memo<{ name: string }>(({ name }) => (
  <span
    className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-white/5 text-zinc-400 !rounded-lg transition-colors hover:bg-white/10"
  >
    {name}
  </span>
));

SkillTag.displayName = 'SkillTag';

const SkillCategory = memo<SkillCategoryProps>(({ category, skills }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: [0.17, 0.55, 0.55, 1] }}
  >
    <div 
      className="group h-full p-4 rounded-xl bg-inherit hover:bg-zinc-800/50 transition-all duration-200 ease-in-out will-change-transform hover:scale-[1.02]"
    >
      <div className="flex flex-col h-full justify-between space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-zinc-100 group-hover:text-accent transition-colors mb-3">
            {category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(skill => (
                <SkillTag key={skill.name} name={skill.name} />
              ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
));

SkillCategory.displayName = 'SkillCategory';

export function Skills({ data }: SkillsProps) {
  const categories = Array.from(new Set(data.map(skill => skill.category))).sort();
  
  return (
    <Section title="Skills">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <SkillCategory
            key={category}
            category={category}
            skills={data.filter(skill => skill.category === category)}
          />
        ))}
      </div>
    </Section>
  );
}
