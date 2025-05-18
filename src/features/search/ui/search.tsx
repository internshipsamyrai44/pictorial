'use client';
import s from '@/app/(pages)/search/page.module.scss';
import { useTranslations } from 'next-intl';
import { EmptySearch } from '@/features/search/ui/empty-search/empty-search';
import { SearchInput } from '@/features/search/ui/search-input/search-input';
import { useLazyGetUserByUsernameQuery } from '@/features/search/api/searchApi';
import { GetUserByUsernameParams, UserItem } from '@/features/search/model/searchApi.types';
import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { SearchResultItem } from '@/features/search/ui/search-result-item/search-result-item';
import { Loader } from '@/shared/ui/loader/Loader';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import clsx from 'clsx';

export const Search = () => {
  const [searchResult, setSearchResult] = useState<UserItem[]>([]);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [trigger, { data, isLoading }] = useLazyGetUserByUsernameQuery();

  const t = useTranslations('search');

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
    []
  );
  const sendQuery = (name: string) => {
    debouncedSearch(name);
  };

  return (
    <div className={s.container}>
      <Typography variant={'h1'}> {t('title')}</Typography>
      <SearchInput sendQuery={sendQuery} />
      <div className={clsx(s.searchResults, { [s.visible]: isResultsVisible || isLoading })}>
        <div className={s.resultsContainer}>
          {searchResult.length > 0 && searchResult.map((user) => <SearchResultItem user={user} key={user.id} />)}
          <div className={s.loader}>{isLoading && <Loader />}</div>
        </div>
      </div>

      {data?.totalCount === 0 && <EmptySearch />}
    </div>
  );
};
