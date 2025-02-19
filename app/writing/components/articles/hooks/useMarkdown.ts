import { useState, useEffect } from 'react';
import type { Article } from '../types';

interface UseArticleContentOptions {
  article: Article;
  contentHtml: string;
  addHeadingLinks?: boolean;
  addSyntaxHighlighting?: boolean;
}

interface UseArticleContentResult {
  processedContent: string;
  isProcessing: boolean;
  error: Error | null;
  tableOfContents: Array<{ text: string; id: string; level: number }>;
}

export function useArticleContent({
  contentHtml,
  addHeadingLinks = true,
  addSyntaxHighlighting = true,
}: UseArticleContentOptions): UseArticleContentResult {
  const [processedContent, setProcessedContent] = useState(contentHtml);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [tableOfContents, setTableOfContents] = useState<
    Array<{ text: string; id: string; level: number }>
  >([]);

  useEffect(() => {
    async function processContent() {
      setIsProcessing(true);
      setError(null);

      try {
        let processed = contentHtml;

        // Extract table of contents
        const headings: Array<{ text: string; id: string; level: number }> = [];
        const headingRegex = /<h([1-3])(.*?)>(.*?)<\/h[1-3]>/g;
        let match;

        while ((match = headingRegex.exec(contentHtml)) !== null) {
          const level = parseInt(match[1]!, 10);
          const text = match[3]!.replace(/<[^>]*>/g, '');
          const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

          headings.push({ text, id, level });
        }

        setTableOfContents(headings);

        // Add heading links if enabled
        if (addHeadingLinks) {
          processed = processed.replace(
            /<h([1-3])(.*?)>(.*?)<\/h[1-3]>/g,
            (_, level, attrs, text) => {
              const id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
              return `<h${level}${attrs} id="${id}">
                ${text}
                <a href="#${id}" class="heading-link" aria-label="Link to this section">
                  <span aria-hidden="true">#</span>
                </a>
              </h${level}>`;
            }
          );
        }

        setProcessedContent(processed);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to process content'));
      } finally {
        setIsProcessing(false);
      }
    }

    processContent();
  }, [contentHtml, addHeadingLinks, addSyntaxHighlighting]);

  return {
    processedContent,
    isProcessing,
    error,
    tableOfContents,
  };
}
