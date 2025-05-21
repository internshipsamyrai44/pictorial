import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { GetUserByUsernameParams, UserItem } from '@/features/search/model/searchApi.types';
import { useLazySearchUsersByUsernameQuery } from '@/features/search/api/searchApi';

export const useSearch = () => {
  const [searchResult, setSearchResult] = useState<UserItem[]>([]);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [trigger, { data, isLoading }] = useLazySearchUsersByUsernameQuery();

  useEffect(() => {
    if (data?.items) {
      setSearchResult(data.items);
      setIsResultsVisible(true);
    } else if (data?.totalCount === 0) {
      setSearchResult([]);
      setIsResultsVisible(true);
    }
  }, [data]);

  const debouncedSearch = useCallback(
    debounce((name: string) => {
      if (name.length > 3) {
        const params: GetUserByUsernameParams = {
          userName: name,
          pageSize: 12,
          pageNumber: 1
        };
        setQuery(name);
        trigger(params);
      } else if (name.length === 0) {
        setIsResultsVisible(false);
        setSearchResult([]);
        setQuery('');
      }
    }, 300),
    [trigger, setIsResultsVisible, setSearchResult]
  );

  const sendQuery = useCallback(
    (name: string) => {
      debouncedSearch(name);
    },
    [debouncedSearch]
  );

  return {
    searchResult,
    isResultsVisible,
    isLoading,
    totalCount: data?.totalCount,
    sendQuery,
    query
  };
};
