import React from 'react';
import type { TimelineItemProps } from '../types';

export function TimelineItem({ date, title, company, description, highlights, '2024 Highlights': highlights2024, index }: TimelineItemProps) {
  const displayHighlights = highlights2024 || highlights;
  const highlightsTitle = highlights2024 ? '2024 Highlights' : 'Key Achievements';

  return (
    <div className={`flex flex-col gap-3 relative pl-6 ${index > 0 ? 'mt-3' : ''}`}>
      <div className="absolute left-0 top-[0.6rem] w-1.5 h-1.5 bg-accent rounded-full" />
      
      <div>
        <h3 className="text-2xl font-semibold text-text-primary">{title}</h3>
        {company && <div className="text-xl" dangerouslySetInnerHTML={{ __html: company }} />}
        <div className="flex items-center gap-4 mt-2">
          <time className="font-medium text-text-tertiary text-base">{date}</time>
          <div className="h-px flex-1 bg-accent/10" />
        </div>
      </div>

      <div className="space-y-3">
        <ul className="space-y-2 text-text-secondary text-lg">
          {description.map((point, i) => (
            <li key={i} className="flex gap-2 items-baseline">
              <span className="text-accent/60">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
        
        {displayHighlights && displayHighlights.length > 0 && (
          <div className="mt-3 pt-3 border-t border-accent/10">
            <h4 className="text-base font-medium text-text-tertiary mb-2">{highlightsTitle}</h4>
            <ul className="space-y-2">
              {displayHighlights.map((highlight, i) => (
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
  );
} 