import { instance } from '@/services/instance';

import { newsApiResponseSchema, newsListSchema } from './schema';

export const NewsServices = {
  fetchNewsByKeywords: async (keywords: string) => {
    const response = await instance
      .get(`everything`, {
        searchParams: {
          q: keywords,
        },
      })
      .json();
    const originalResponse = newsApiResponseSchema.parse(response);
    return newsListSchema.parse(
      originalResponse.articles.filter((item) => item.title !== '[Removed]'),
    );
  },
};
