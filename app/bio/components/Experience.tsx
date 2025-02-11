import React from 'react';
import type { Experience as ExperienceType } from '../types';
import { Section } from './Section';
import { TimelineItem } from './TimelineItem';

interface ExperienceProps {
  data: ExperienceType[];
}

export function Experience({ data }: ExperienceProps) {
  return (
    <Section>
      <div className="space-y-4">
        {data.map((experience, index) => (
          <TimelineItem
            key={`${experience.company}-${experience.date}`}
            {...experience}
            index={index}
          />
        ))}
      </div>
    </Section>
  );
}

Experience.displayName = 'Experience';
