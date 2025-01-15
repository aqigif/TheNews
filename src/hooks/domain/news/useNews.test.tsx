import type { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, cleanup, renderHook } from '@testing-library/react-hooks';
import { useDebounce } from 'use-debounce';

import { NewsServices } from './newsService';
import { NewsQueryKey, useNews } from './useNews';

jest.mock('use-debounce', () => ({
  useDebounce: jest.fn(),
}));

jest.mock('./newsService', () => ({
  NewsServices: {
    fetchNewsByKeywords: jest.fn(),
  },
}));

let queryClient: QueryClient;

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useFetchNewsByKeywords', () => {
  beforeEach(() => {
    queryClient = new QueryClient();
    jest.clearAllMocks();
  });
  afterAll(() => {
    queryClient.clear(); // Clear all queries
    jest.clearAllMocks(); // Clear mocks
    cleanup(); // Cleanup React Testing Library resources
  });

  it('should fetch news by keywords when debouncedKeyword is set', async () => {
    const keyword = 'react';
    const mockedNews = [{ title: 'React News' }];

    (useDebounce as jest.Mock).mockReturnValue([keyword]);
    (NewsServices.fetchNewsByKeywords as jest.Mock).mockResolvedValue(
      mockedNews,
    );

    const { result, waitFor } = renderHook(
      () => useNews().useFetchNewsByKeywords(keyword),
      { wrapper },
    );

    await waitFor(() => result.current.isSuccess);

    expect(NewsServices.fetchNewsByKeywords).toHaveBeenCalledWith(keyword);
    expect(result.current.data).toEqual(mockedNews);
  });

  it('should not fetch news when debouncedKeyword is empty', async () => {
    const keyword = '';

    (useDebounce as jest.Mock).mockReturnValue([keyword]);

    const { result } = renderHook(
      () => useNews().useFetchNewsByKeywords(keyword),
      { wrapper },
    );

    expect(result.current.isFetching).toBe(false);
    expect(NewsServices.fetchNewsByKeywords).not.toHaveBeenCalled();
  });
});

describe('useNews', () => {
  it('should invalidate queries correctly', async () => {
    const queryKey = [NewsQueryKey.fetchNewsByKeywords];

    const { result } = renderHook(() => useNews(), { wrapper });

    const spyInvalidateQueries = jest.spyOn(queryClient, 'invalidateQueries');

    act(() => {
      result.current.invalidateQuery(queryKey);
    });

    expect(spyInvalidateQueries).toHaveBeenCalledWith({
      queryKey,
    });
  });
});
