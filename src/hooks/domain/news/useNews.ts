import { useQuery, useQueryClient } from '@tanstack/react-query';

import { NewsServices } from './newsService';

const enum NewsQueryKey {
  fetchNewsByKeywords = 'fetchNewsByKeywords',
}

const useFetchNewsByKeywords = (keyword: string) =>
  useQuery({
    enabled: !!keyword, 
    queryFn: () => NewsServices.fetchNewsByKeywords(keyword),
    queryKey: [NewsQueryKey.fetchNewsByKeywords, keyword],
  });

export const useNews = () => {
  const client = useQueryClient();

  const invalidateQuery = (queryKeys: NewsQueryKey[]) =>
    client.invalidateQueries({
      queryKey: queryKeys,
    });

  return {
    invalidateQuery,
    useFetchNewsByKeywords,
  };
};
