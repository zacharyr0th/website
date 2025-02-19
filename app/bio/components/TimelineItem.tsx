import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import type { TimelineItemProps } from '../types';

export function TimelineItem({
  date,
  title,
  company,
  description,
  highlights,
  '2024 Highlights': highlights2024,
  index,
}: TimelineItemProps) {
  const displayHighlights = highlights2024 || highlights;
  const highlightsTitle = highlights2024 ? '2024 Highlights' : 'Key Achievements';

  // Sanitize company HTML if present
  const sanitizedCompanyHtml = company
    ? DOMPurify.sanitize(company, {
        ALLOWED_TAGS: ['a', 'b', 'i', 'em', 'strong'],
        ALLOWED_ATTR: ['href', 'target', 'rel'],
      })
    : '';

  return (
    <div className={`flex flex-col gap-1.5 ${index > 0 ? 'mt-1 sm:mt-2' : ''}`}>
      <div>
        <h3 className="text-xl sm:text-2xl font-semibold text-text-primary">{title}</h3>
        {company && (
          <div className="text-lg sm:text-xl" dangerouslySetInnerHTML={{ __html: sanitizedCompanyHtml }} />
        )}
        <div className="flex items-center gap-2 mt-0.5 sm:mt-1">
          <time className="font-medium text-text-tertiary text-sm sm:text-base">{date}</time>
          <div className="h-px flex-1 bg-accent/10" />
        </div>
      </div>

      <div className="space-y-1.5">
        <ul className="space-y-1 text-text-secondary text-base sm:text-lg">
          {description.map((point, i) => (
            <li key={i} className="flex gap-2 items-baseline">
              <span className="text-accent/60">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        {displayHighlights && displayHighlights.length > 0 && (
          <div className="mt-1.5 pt-1.5 border-t border-accent/10">
            <h4 className="text-sm sm:text-base font-medium text-text-tertiary mb-1">{highlightsTitle}</h4>
            <ul className="space-y-1">
              {displayHighlights.map((highlight, i) => (
                <li key={i} className="flex gap-2 items-baseline text-base sm:text-lg text-text-secondary">
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
