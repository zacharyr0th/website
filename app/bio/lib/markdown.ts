import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeStringify from 'rehype-stringify';
import DOMPurify from 'isomorphic-dompurify';

export async function processMarkdown(content: string) {
  if (typeof content !== 'string') {
    console.error('Invalid content type:', typeof content);
    throw new Error('Content must be a string');
  }

  // First, process any existing HTML links to ensure consistent styling
  const processedContent = content.replace(
    /<a\s+href="([^"]+)"[^>]*>/g,
    '<a href="$1" class="text-accent hover:text-accent/80 transition-colors" target="_blank" rel="noopener noreferrer">'
  );

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, {
      allowDangerousHtml: true,
      footnoteLabel: 'Footnotes',
      footnoteBackLabel: 'Back to content',
    })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'append',
      properties: {
        className: ['heading-link'],
        ariaHidden: true,
      },
      content: { type: 'text', value: '' },
    })
    .use(rehypePrism, {
      ignoreMissing: true,
      showLineNumbers: true,
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(processedContent);

  // Additional sanitization with DOMPurify
  const sanitizedContent = DOMPurify.sanitize(result.toString(), {
    ADD_TAGS: [
      'img',
      'figure',
      'figcaption',
      'pre',
      'code',
      'span',
      'a',
      'h1',
      'h2',
      'h3',
      'h4',
      'p',
      'ul',
      'li',
      'ol',
      'blockquote',
      'hr',
    ],
    ADD_ATTR: [
      'loading',
      'alt',
      'src',
      'class',
      'id',
      'data-language',
      'aria-hidden',
      'data-line-numbers',
      'style',
      'target',
      'rel',
      'href',
    ],
  });

  return sanitizedContent;
}
