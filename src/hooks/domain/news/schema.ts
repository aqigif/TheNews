import { z } from 'zod';

export const newsSchema = z.object({
  source: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
  }),
  author: z.string().nullable(),
  title: z.string(),
  description: z.string(),
  url: z.string().url(),
  urlToImage: z.string().url().nullable(),
  publishedAt: z.string().datetime(),
  content: z.string(),
});

export type News = z.infer<typeof newsSchema>;
