import { z } from 'zod';

/**
 * Common validation schemas for content-related data
 */
export const imageSchema = z.object({
  src: z.string(),
  alt: z.string().optional(),
});

export const frontmatterSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.string(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  image: imageSchema.optional(),
  takeaways: z.array(z.string()).optional(),
});

export const articleSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  content: z.string(),
  link: z.string(),
  description: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  image: imageSchema.optional(),
  takeaways: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
  frontmatter: frontmatterSchema,
});

export const articlesSchema = z.array(articleSchema);

export const audioRequestSchema = z.object({
  query: z.object({
    key: z.string().regex(/^[a-zA-Z0-9-_/]+$/),
    format: z.enum(['mp3', 'm4a', 'wav']).optional(),
    quality: z.enum(['high', 'medium', 'low']).optional(),
  }),
  headers: z.object({
    'x-request-id': z.string().optional(),
    'x-forwarded-for': z.string().optional(),
    'user-agent': z.string(),
  }),
});

export const articleRequestSchema = z.object({
  params: z.object({
    slug: z.string().regex(/^[a-zA-Z0-9-]+$/),
  }),
  query: z
    .object({
      version: z.string().optional(),
      format: z.enum(['html', 'markdown']).optional(),
    })
    .optional(),
  headers: z.object({
    'x-request-id': z.string().optional(),
    'user-agent': z.string(),
  }),
});

export const streamRequestSchema = z.object({
  query: z.object({
    key: z.string().regex(/^[a-zA-Z0-9-_/]+$/),
    range: z
      .string()
      .regex(/^bytes=\d+-\d*$/)
      .optional(),
  }),
  headers: z.object({
    range: z
      .string()
      .regex(/^bytes=\d+-\d*$/)
      .optional(),
    'if-range': z.string().optional(),
    'if-match': z.string().optional(),
    'if-none-match': z.string().optional(),
    'user-agent': z.string(),
  }),
});

export type AudioRequest = z.infer<typeof audioRequestSchema>;
export type ArticleRequest = z.infer<typeof articleRequestSchema>;
export type StreamRequest = z.infer<typeof streamRequestSchema>;
