import { instance } from '@/services/instance';

import { newsSchema } from './schema';

export const NewsServices = {
  fetchNewsByKeywords: async (keywords: string) => {
    const response = await instance.get(`/everything`, {
      searchParams: {
        q: keywords,
      },
    }).json();
    return newsSchema.parse(response);
  },
};
