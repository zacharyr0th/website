import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { BIO } from '../constants';

interface SkillCategoryProps {
  category: string;
  skills: readonly string[];
  index: number;
}

const SkillCategory = React.memo<SkillCategoryProps>(({ category, skills, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2 }}
    className="flex flex-col gap-4"
  >
    <h3 className="text-lg font-semibold text-heading">{category}</h3>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, skillIndex) => (
        <motion.span
          key={skill}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 + skillIndex * 0.1 }}
          className="px-3 py-1 text-sm rounded-full bg-surface-alt text-muted hover:text-accent 
                     hover:bg-accent/10 transition-all shadow-sm hover:shadow-md"
        >
          {skill}
        </motion.span>
      ))}
    </div>
  </motion.div>
));

SkillCategory.displayName = 'SkillCategory';

export const Skills = React.memo(() => (
  <Section title="Competencies" delay={0.4}>
    <div className="space-y-8">
      {BIO.skills.map((category, index) => (
        <SkillCategory
          key={category.category}
          category={category.category}
          skills={category.skills}
          index={index}
        />
      ))}
    </div>
  </Section>
));

Skills.displayName = 'Skills';
