import { z } from 'zod';

export const cspReportSchema = z.object({
  'csp-report': z.object({
    'document-uri': z.string().optional(),
    referrer: z.string().optional(),
    'violated-directive': z.string(),
    'effective-directive': z.string().optional(),
    'original-policy': z.string().optional(),
    'blocked-uri': z.string().optional(),
    'status-code': z.number().optional(),
  }),
});

export const reportToSchema = z.object({
  age: z.number().optional(),
  type: z.string(),
  url: z.string(),
  'user-agent': z.string().optional(),
  body: z.object({
    'blocked-uri': z.string().optional(),
    'document-uri': z.string().optional(),
    'violated-directive': z.string(),
    'effective-directive': z.string().optional(),
    'original-policy': z.string().optional(),
    'status-code': z.number().optional(),
  }),
});
