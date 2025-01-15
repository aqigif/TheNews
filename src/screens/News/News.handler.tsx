import { useCallback, useState } from 'react';

import { useNews } from '@/hooks';

const useNewsHandler = () => {
  const [keyword, setKeyword] = useState('');
  const [tempKeyword, setTempKeyword] = useState('');

  const { useFetchNewsByKeywords } = useNews();
  const fetchNewsByKeywords = useFetchNewsByKeywords(keyword);

  const onSearch = useCallback(() => {
    setKeyword(tempKeyword);
  }, [tempKeyword]);

  return {
    onSearch,
    tempKeyword,
    setTempKeyword,
    ...fetchNewsByKeywords,
  };
};

export default useNewsHandler;
