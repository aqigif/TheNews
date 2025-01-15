import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

import { NewsServices } from './newsService';

const enum NewsQueryKey {
  fetchNewsByKeywords = 'fetchNewsByKeywords',
}

const useFetchNewsByKeywords = (keyword: string, debounceMs: number = 300) => {
  const [debouncedKeyword] = useDebounce(keyword, debounceMs);

  return useQuery({
    queryKey: [NewsQueryKey.fetchNewsByKeywords, debouncedKeyword],
    queryFn: () => NewsServices.fetchNewsByKeywords(debouncedKeyword),
    enabled: !!debouncedKeyword,
  });
};

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
