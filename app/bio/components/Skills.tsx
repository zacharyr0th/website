import React from 'react';
import { Section } from './Section';
import clsx from 'clsx';
import type { SkillCategoryProps } from '../types';
import { GROUPED_SKILLS } from '../constants';

const SkillCategory = React.memo<SkillCategoryProps>(({ category, skillGroups }) => (
  <div>
    {/* Category Header */}
    <h3 className="text-2xl font-mono mb-6 text-text-primary">
      {category}
    </h3>

    {/* Skills List */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
      {skillGroups.map((group) => (
        <div key={group.title}>
          <h4 className="font-mono text-base text-accent mb-3">
            {group.title}
          </h4>
          <div className="space-y-2">
            {group.skills.map((skill) => (
              <div key={skill} className="font-mono text-lg text-text-secondary hover:text-text-primary transition-colors">
                {skill}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
));

SkillCategory.displayName = 'SkillCategory';

export const Skills = React.memo(() => (
  <Section title="">
    <div className="space-y-10">
      {Object.entries(GROUPED_SKILLS).map(([category, skillGroups], index, array) => (
        <div key={category} className={clsx(index === array.length - 1 && 'mb-0')}>
          <SkillCategory
            category={category}
            skillGroups={skillGroups}
          />
        </div>
      ))}
    </div>
  </Section>
));

Skills.displayName = 'Skills';
