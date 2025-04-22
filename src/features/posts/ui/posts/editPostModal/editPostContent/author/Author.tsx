import { PublishedPostResponse } from '@/features/posts/model/postsApi.types';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';
import s from './Author.module.scss';

type Props = {
  post: PublishedPostResponse;
};

export const Author = ({ post }: Props) => {
  return (
    <div className={s.author}>
      <ProfileAvatar src={post.avatarOwner} userName={post.userName} />
      <h3>{post.userName}</h3>
    </div>
  );
};
