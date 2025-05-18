import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useLazyGetUserByUsernameQuery } from '@/features/search/api/searchApi';
import { GetUserByUsernameParams, UserItem } from '@/features/search/model/searchApi.types';

export const useSearch = () => {
  const [searchResult, setSearchResult] = useState<UserItem[]>([]);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [trigger, { data, isLoading }] = useLazyGetUserByUsernameQuery();

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
        trigger(params);
      } else if (name.length === 0) {
        setIsResultsVisible(false);
        setSearchResult([]);
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
    sendQuery
  };
};
