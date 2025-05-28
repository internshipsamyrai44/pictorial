import { useGetCommentsQuery } from '@/features/posts/api/postsApi';
import s from './PostComments.module.scss';
import { CommentItem } from './commentItem/CommentItem';
import { useGetUnauthorizedCommentsQuery } from '@/features/public-posts/api/publicPostApi';
import { useSelector } from 'react-redux';
import { getIsAuth } from '@/redux/authSlice';

type Props = {
  postId: number;
};

export const PostComments = ({ postId }: Props) => {
  const isAuth = useSelector(getIsAuth);

  const { data: authComments } = useGetCommentsQuery(
    { postId },
    {
      skip: !isAuth
    }
  );
  const { data: unauthComments } = useGetUnauthorizedCommentsQuery(
    { postId },
    {
      skip: isAuth
    }
  );

  const comments = isAuth ? authComments : unauthComments;
  const isLoading = !comments;

  return (
    <div className={s.comments}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        comments?.items.map((comment) => (
          <CommentItem key={comment.id} comment={comment} postId={postId} isAuth={isAuth} />
        ))
      )}
    </div>
  );
};
