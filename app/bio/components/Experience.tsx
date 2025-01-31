import React from 'react';
import { Section } from './Section';
import { BIO } from '../constants';
import clsx from 'clsx';
import type { TimelineItemProps } from '../types';

const TimelineItem = React.memo<TimelineItemProps>(({ date, title, company, description, highlights, index }) => (
  <div className={clsx('flex flex-col gap-4 relative pl-6', index > 0 && 'mt-8')}>
    <div className="absolute left-0 top-[0.6rem] w-1.5 h-1.5 bg-accent rounded-full" />
    
    <div>
      <h3 className="text-2xl font-semibold text-text-primary">{title}</h3>
      {company && <div className="text-accent font-medium mt-1 text-xl">{company}</div>}
      <div className="flex items-center gap-4 mt-2">
        <time className="font-medium text-text-tertiary text-base">{date}</time>
        <div className="h-px flex-1 bg-accent/10" />
      </div>
    </div>

    <div className="space-y-4">
      <ul className="space-y-2 text-text-secondary text-lg">
        {description.map((point, i) => (
          <li key={i} className="flex gap-2 items-baseline">
            <span className="text-accent/60">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
      
      {highlights && highlights.length > 0 && (
        <div className="mt-4 pt-4 border-t border-accent/10">
          <h4 className="text-base font-medium text-text-tertiary mb-3">Key Achievements</h4>
          <ul className="space-y-2">
            {highlights.map((highlight, i) => (
              <li key={i} className="flex gap-2 items-baseline text-lg text-text-secondary">
                <span className="text-accent/60">→</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
));

TimelineItem.displayName = 'TimelineItem';

export const Experience = React.memo(() => (
  <Section title="" className="py-8">
    <div className="relative">
      <div
        className="absolute left-[2px] top-3 h-[calc(100%-2rem)] w-px bg-accent/10"
        aria-hidden="true"
      />
      {BIO.experience.map((item, index) => (
        <TimelineItem key={item.title} {...item} index={index} />
      ))}
    </div>
  </Section>
));

Experience.displayName = 'Experience';
