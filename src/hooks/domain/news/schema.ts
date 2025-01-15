import { z } from 'zod';

export const newsSchema = z.object({
  source: z
    .object({
      id: z.string().nullable(),
      name: z.string().nullable(),
    })
    .nullable(),
  author: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  url: z.string().url().nullable(),
  urlToImage: z.string().url().nullable(),
  publishedAt: z.string().datetime().nullable(),
  content: z.string().nullable(),
});

export type News = z.infer<typeof newsSchema>;

export const newsListSchema = z.array(newsSchema);

export type NewsList = z.infer<typeof newsListSchema>;

export const newsApiResponseSchema = z.object({
  status: z.string(),
  totalResults: z.number(),
  articles: newsListSchema,
});

export type NewsApiResponse = z.infer<typeof newsApiResponseSchema>;
