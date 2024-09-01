'use client';

import React, { useState, ReactElement } from 'react';

interface ContentRendererProps {
  content: string | ReactElement;
}

export default function ContentRenderer({ content }: ContentRendererProps) {
  const [isTableExpanded, setIsTableExpanded] = useState(false);

  const toggleTableExpansion = () => {
    setIsTableExpanded(!isTableExpanded);
  };

  return (
    <div className="prose prose-lg max-w-none prose-invert article-content">
      {typeof content === 'string' ? (
        <div
          dangerouslySetInnerHTML={{
            __html: content
              .replace(/<GitHubEmbed([^>]*)>/g, (_, props) => `<GitHubEmbed ${props} />`)
              .replace(/<TwitterEmbed([^>]*)>/g, (_, props) => `<TwitterEmbed ${props} />`)
              .replace(/<table/g, '<div class="table-wrapper"><table')
              .replace(/<\/table>/g, '</table></div>')
          }}
        />
      ) : (
        content
      )}
    </div>
  );
}