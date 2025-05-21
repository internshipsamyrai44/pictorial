'use client';
import s from '@/app/(pages)/search/page.module.scss';
import { useTranslations } from 'next-intl';
import { EmptySearch } from '@/features/search/ui/empty-search/empty-search';
import { SearchInput } from '@/features/search/ui/search-input/search-input';

import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { SearchResultItem } from '@/features/search/ui/search-result-item/search-result-item';
import { Loader } from '@/shared/ui/loader/Loader';

import clsx from 'clsx';
import { useSearch } from '@/features/search/hooks/useSearch';

import { LazyLoadResults } from '@/features/search/ui/lazy-load-results/lazy-load-results';

export const Search = () => {
  const t = useTranslations('search');

  const { isLoading, sendQuery, searchResult, isResultsVisible, totalCount, query } = useSearch();
  // const [resentSearch, setResentSearch] = useState<UserItem[]>(searchResult);

  return (
    <div className={s.container}>
      <Typography variant={'h1'}> {t('title')}</Typography>
      <SearchInput sendQuery={sendQuery} />
      <div className={clsx(s.searchResults, { [s.visible]: isResultsVisible || isLoading })}>
        <div className={s.resultsContainer}>
          {searchResult.length > 0 &&
            searchResult.map((user, i) => <SearchResultItem user={user} key={`${user.userName}-${i}`} />)}
          <div className={s.loader}>{isLoading && <Loader />}</div>
        </div>

        <LazyLoadResults query={query} searchResult={searchResult} />

        {totalCount === 0 && <EmptySearch />}
      </div>
    </div>
  );
};
