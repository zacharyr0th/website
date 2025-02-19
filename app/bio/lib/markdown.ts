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
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'append',
      properties: { className: ['heading-link'], ariaHidden: true },
      content: { type: 'text', value: '' },
    })
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(content);

  // Additional sanitization with DOMPurify
  return DOMPurify.sanitize(result.toString(), {
    ADD_TAGS: ['img', 'figure', 'figcaption', 'pre', 'code', 'span'],
    ADD_ATTR: ['loading', 'alt', 'src', 'class', 'id', 'data-language', 'aria-hidden'],
  });
}
