import { PublishedPostResponse } from '@/features/posts/model/postsApi.types';
import s from './postConversation.module.scss';
import UserCommentContent from './userCommentContent/UserCommentContent';
import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { useFormattedDateDistanceToNow } from '@/shared/hooks/useFormattedDateDistanceToNow';
import { PostComments } from './postComments/PostComments';

type Props = {
  post: PublishedPostResponse;
};

export const PostConversation = ({ post }: Props) => {
  const formatDateDistanceToNow = useFormattedDateDistanceToNow();

  return (
    <div className={s.conversation}>
      {post.description && (
        <div>
          <UserCommentContent avatarSrc={post.avatarOwner} userName={post.userName} text={post.description} />
          <Typography variant={'small-text'} as={'span'} className={s.date}>
            {formatDateDistanceToNow(post.updatedAt)}
          </Typography>
        </div>
      )}
      <PostComments postId={post.id} />
    </div>
  );
};
