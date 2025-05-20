import s from './CommentItem.module.scss';

import { CommentResponse } from '@/features/posts/model/postsApi.types';
import UserCommentContent from '../../userCommentContent/UserCommentContent';
import { useFormattedDateDistanceToNow } from '@/shared/hooks/useFormattedDateDistanceToNow';
import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import HeartOutline from '../../../../../../../../../../public/icons/HeartOutline';
import HeartFilled from '../../../../../../../../../../public/icons/HeartLike';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import AddComentForm from '../../../addComentForm/AddComentForm';
import {
  useCreateAnswerToCommentMutation,
  useGetAnswersToCommentQuery,
  useUpdateLikeStatusCommentMutation
} from '@/features/posts/api/postsApi';
import { AnswerItem } from './answerItem/AnswerItem';

type Props = {
  comment: CommentResponse;
  postId: number;
};

export const CommentItem = ({ comment, postId }: Props) => {
  const t = useTranslations('Post');
  const [isReplyFieldVisible, setIsReplyFieldVisible] = useState(false);

  const formatDateDistanceToNow = useFormattedDateDistanceToNow();
  const [createAnswerToComment] = useCreateAnswerToCommentMutation();
  const { data } = useGetAnswersToCommentQuery({ postId, commentId: comment.id }, { skip: comment.answerCount === 0 });
  const [updateLikeStatusComment, { isLoading }] = useUpdateLikeStatusCommentMutation();

  const handleAddAnswer = (value: string) => {
    createAnswerToComment({ postId, commentId: comment.id, content: value });
    setIsReplyFieldVisible(!isReplyFieldVisible);
  };

  const handleLike = () => {
    if (isLoading) return;
    updateLikeStatusComment({ postId, commentId: comment.id, likeStatus: comment.isLiked ? 'NONE' : 'LIKE' });
  };

  return (
    <div className={s.commentItem}>
      <div className={s.comment}>
        <UserCommentContent
          avatarSrc={comment.from.avatars?.[0]?.url}
          userName={comment.from.username}
          text={comment.content}
        />
        <div onClick={handleLike} className={isLoading ? s.disabled : ''}>
          {comment.isLiked ? <HeartFilled width={16} height={16} /> : <HeartOutline width={16} height={16} />}
        </div>
      </div>
      <div className={s.interaction}>
        <Typography variant={'small-text'} as={'span'}>
          {formatDateDistanceToNow(comment.createdAt)}
        </Typography>
        {comment.likeCount > 0 && (
          <Typography variant="small-text" as="span">
            {t('Like')}: {comment.likeCount}
          </Typography>
        )}
        <Typography onClick={() => setIsReplyFieldVisible(!isReplyFieldVisible)} variant={'small-text'} as={'span'}>
          {t('Answer')}
        </Typography>
      </div>
      {data?.items && (
        <div className={s.answers}>
          {data.items.map((answer) => (
            <AnswerItem key={answer.id} answer={answer} postId={postId} />
          ))}
        </div>
      )}
      {isReplyFieldVisible && <AddComentForm onClick={handleAddAnswer} isAnswer />}
    </div>
  );
};
