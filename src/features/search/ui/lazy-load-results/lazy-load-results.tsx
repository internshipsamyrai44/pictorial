import s from '@/app/(pages)/search/page.module.scss';
import { SearchResultItem } from '@/features/search/ui/search-result-item/search-result-item';
import { Loader } from '@/shared/ui/loader/Loader';

import { useLazyLoad } from '@/features/search/hooks/useLazyLoad';
import { UserItem } from '@/features/search/model/searchApi.types';

type Props = {
  query: string;
  searchResult: UserItem[];
};

export const LazyLoadResults = ({ query, searchResult }: Props) => {
  const shouldStart = searchResult.length > 0;

  const { lazyLoadResults, loaderRef, isLoading } = useLazyLoad(query, shouldStart);

  return (
    <div className={s.lazy}>
      {lazyLoadResults.map((user, i) => (
        <SearchResultItem user={user} key={`${user.userName}-${i}`} />
      ))}
      <div ref={loaderRef} className={s.loaderTrigger}>
        {isLoading && <Loader />}
      </div>
    </div>
  );
};
