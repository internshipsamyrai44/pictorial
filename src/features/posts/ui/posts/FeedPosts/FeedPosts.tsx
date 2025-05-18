'use client';

import { useEffect, useRef, useState } from 'react';
import { useGetFeedPostsQuery } from '@/features/posts/api/postsApi';
import s from './FeedPosts.module.scss';
import FeedPostItem from './FeedPostItem/FeedPostItem';
import { Loader } from '@/shared/ui/loader/Loader';
import { useTranslations } from 'next-intl';

export const FeedPosts = () => {
  const t = useTranslations('Post');
  const [endCursor, setEndCursor] = useState<number | undefined>(undefined);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data: feedData,
    isLoading,
    isFetching
  } = useGetFeedPostsQuery(
    { endCursorPostId: endCursor, pageSize: 5 },
    {
      skip: isLoadingMore && endCursor !== undefined
    }
  );

  useEffect(() => {
    if (feedData) {
      if (endCursor === undefined) {
        setAllPosts(feedData.items);
      } else {
        setAllPosts((prev) => [...prev, ...feedData.items]);
      }

      if (feedData.hasNextPage && feedData.endCursor) {
        setEndCursor(feedData.endCursor);
      }
      setIsLoadingMore(false);
    }
  }, [feedData, endCursor]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && feedData?.hasNextPage && !isLoading && !isFetching) {
          setIsLoadingMore(true);
        }
      },
      { threshold: 1.0 }
    );

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [feedData?.hasNextPage, isLoading, isFetching]);

  useEffect(() => {
    const currentLoadMoreRef = loadMoreRef.current;
    const currentObserver = observerRef.current;

    if (currentLoadMoreRef && currentObserver) {
      currentObserver.observe(currentLoadMoreRef);
    }

    return () => {
      if (currentLoadMoreRef && currentObserver) {
        currentObserver.unobserve(currentLoadMoreRef);
      }
    };
  }, [allPosts]);

  if (isLoading && !isLoadingMore) {
    return (
      <div className={s.loading}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={s.feedPosts}>
      {allPosts.length > 0 ? (
        <>
          <div className={s.posts}>
            {allPosts.map((post, index) => (
              <FeedPostItem key={`${post.id}-${index}`} post={post} />
            ))}
          </div>
          {feedData?.hasNextPage && (
            <div ref={loadMoreRef} className={s.loadMore}>
              {isLoadingMore && <Loader />}
            </div>
          )}
        </>
      ) : (
        <div className={s.noContent}>{t('NoContentYet')}</div>
      )}
    </div>
  );
};
