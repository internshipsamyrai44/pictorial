import { AnswerResponse } from '@/features/posts/model/postsApi.types';
import UserCommentContent from '../../../userCommentContent/UserCommentContent';
import s from './AnswerItem.module.scss';
import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { useFormattedDateDistanceToNow } from '@/shared/hooks/useFormattedDateDistanceToNow';
import { useTranslations } from 'next-intl';
import HeartOutline from '../../../../../../../../../../../public/icons/HeartOutline';
import HeartFilled from '../../../../../../../../../../../public/icons/HeartLike';
import { useUpdateLikeStatusAnswerMutation } from '@/features/posts/api/postsApi';

type Props = {
  answer: AnswerResponse;
  postId: number;
};

export const AnswerItem = ({ answer, postId }: Props) => {
  const t = useTranslations('Post');
  const formatDateDistanceToNow = useFormattedDateDistanceToNow();
  const [updateLikeStatusAnswer] = useUpdateLikeStatusAnswerMutation();

  const handleLike = () => {
    updateLikeStatusAnswer({
      postId,
      commentId: answer.commentId,
      answerId: answer.id,
      likeStatus: answer.isLiked ? 'NONE' : 'LIKE'
    });
  };

  return (
    <div className={s.answerItem}>
      <div className={s.answer}>
        <UserCommentContent
          avatarSrc={answer.from.avatars?.[0]?.url}
          userName={answer.from.username}
          text={answer.content}
        />
        <div onClick={handleLike}>{answer.isLiked ? <HeartFilled /> : <HeartOutline width={16} height={16} />}</div>
      </div>
      <div className={s.interaction}>
        <Typography variant={'small-text'} as={'span'}>
          {formatDateDistanceToNow(answer.createdAt)}
        </Typography>
        {answer.likeCount > 0 && (
          <Typography variant="small-text" as="span">
            {t('Like')}: {answer.likeCount}
          </Typography>
        )}
      </div>
    </div>
  );
};
