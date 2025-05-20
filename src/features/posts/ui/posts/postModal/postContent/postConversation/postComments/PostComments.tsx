import { useGetCommentsQuery } from '@/features/posts/api/postsApi';
import s from './PostComments.module.scss';
import { CommentItem } from './commentItem/CommentItem';

type Props = {
  postId: number;
};

export const PostComments = ({ postId }: Props) => {
  const { data, isLoading } = useGetCommentsQuery({ postId });

  return (
    <div className={s.comments}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data?.items.map((comment) => <CommentItem key={comment.id} comment={comment} postId={postId} />)
      )}
    </div>
  );
};
