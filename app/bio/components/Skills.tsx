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
    className="flex flex-col gap-6"
  >
    <h3 className="text-xl font-semibold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
      {category}
    </h3>
    <div className="flex flex-wrap gap-3">
      {skills.map((skill, skillIndex) => (
        <motion.span
          key={skill}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ 
            scale: 1.05,
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-text-primary)'
          }}
          viewport={{ once: true }}
          transition={{ 
            delay: index * 0.1 + skillIndex * 0.05,
            duration: 0.2
          }}
          className="px-4 py-2 text-sm rounded-full bg-surface/50 text-text-secondary border border-white/5
                     backdrop-blur-sm transition-all shadow-sm hover:shadow-lg cursor-default"
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
    <div className="space-y-10">
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
