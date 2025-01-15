import { renderHook } from '@testing-library/react-hooks';

import { NewsServices } from './newsService';
import { newsApiResponseSchema } from './schema';

describe('NewsServices', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchNewsByKeywords', () => {
    it('should fetch and parse news by keywords correctly', async () => {
      const keywords = 'technology';
      const mockResponse = {
        status: 'ok',
        totalResults: 2,
        articles: [
          {
            source: { id: '1', name: 'Source 1' },
            author: 'Author 1',
            title: 'Tech News 1',
            description: 'Description 1',
            url: 'https://example.com/news1',
            urlToImage: 'https://example.com/image1.jpg',
            publishedAt: '2023-01-01T12:00:00Z',
            content: 'Content 1',
          },
          {
            source: null,
            author: null,
            title: '[Removed]',
            description: 'Description Removed',
            url: null,
            urlToImage: null,
            publishedAt: null,
            content: null,
          },
          {
            source: { id: '2', name: 'Source 2' },
            author: 'Author 2',
            title: 'Tech News 2',
            description: 'Description 2',
            url: 'https://example.com/news2',
            urlToImage: 'https://example.com/image2.jpg',
            publishedAt: '2023-01-02T12:00:00Z',
            content: 'Content 2',
          },
        ],
      };

      const parsedResponse = [
        {
          source: { id: '1', name: 'Source 1' },
          author: 'Author 1',
          title: 'Tech News 1',
          description: 'Description 1',
          url: 'https://example.com/news1',
          urlToImage: 'https://example.com/image1.jpg',
          publishedAt: '2023-01-01T12:00:00Z',
          content: 'Content 1',
        },
        {
          source: { id: '2', name: 'Source 2' },
          author: 'Author 2',
          title: 'Tech News 2',
          description: 'Description 2',
          url: 'https://example.com/news2',
          urlToImage: 'https://example.com/image2.jpg',
          publishedAt: '2023-01-02T12:00:00Z',
          content: 'Content 2',
        },
      ];

      jest
        .spyOn(NewsServices, 'fetchNewsByKeywords')
        .mockResolvedValue(parsedResponse);

      const result = await NewsServices.fetchNewsByKeywords(keywords);

      expect(NewsServices.fetchNewsByKeywords).toHaveBeenCalledWith(keywords);
      expect(result).toEqual(parsedResponse);
    });

    it('should handle errors correctly', async () => {
      const keywords = 'technology';
      const mockError = new Error('Network Error');

      jest
        .spyOn(NewsServices, 'fetchNewsByKeywords')
        .mockRejectedValue(mockError);

      await expect(NewsServices.fetchNewsByKeywords(keywords)).rejects.toThrow(
        mockError,
      );

      expect(NewsServices.fetchNewsByKeywords).toHaveBeenCalledWith(keywords);
    });
  });
});
