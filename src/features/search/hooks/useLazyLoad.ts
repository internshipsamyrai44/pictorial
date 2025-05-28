import { useCallback, useEffect, useRef, useState } from 'react';
import { GetUserByUsernameParams, UserItem } from '@/features/search/model/searchApi.types';
import { useLazySearchUsersByUsernameQuery } from '@/features/search/api/searchApi';

export const useLazyLoad = (query: string, shouldStart: boolean = false) => {
  const [page, setPage] = useState(2);
  const [lazyLoadResults, setLazyLoadResults] = useState<UserItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [trigger] = useLazySearchUsersByUsernameQuery();

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading || !query || !shouldStart) return;
    setIsLoading(true);

    const params: GetUserByUsernameParams = {
      userName: query,
      pageSize: 12,
      pageNumber: page
    };

    try {
      const result = await trigger(params).unwrap();
      if (result.items?.length === 0) {
        setHasMore(false);
      } else {
        setLazyLoadResults((prev) => [...prev, ...result.items]);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error('Ошибка при загрузке данных:', err);
    } finally {
      setIsLoading(false);
    }
  }, [hasMore, isLoading, query, shouldStart, page, trigger]);

  useEffect(() => {
    if (query) {
      setLazyLoadResults([]);
      setPage(2);
      setHasMore(true);
    }
  }, [query]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current && shouldStart) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loadMore, hasMore, shouldStart]);

  return {
    lazyLoadResults,
    page,
    hasMore,
    loaderRef,
    isLoading,
    loadMore
  };
};
