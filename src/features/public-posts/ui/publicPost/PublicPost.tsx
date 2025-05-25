import { PostItemProps } from '@/features/public-posts/model/publicPostApi.types';
import s from '@/features/public-posts/ui/publicPost/PublicPost.module.scss';
import Link from 'next/link';
import TimeAgo from 'react-timeago';
import { ShowMoreButton } from '@/features/public-posts/ui/showMoreButton/ShowMoreButton';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';

export default function PostItem({ item }: PostItemProps) {
  return (
    <li className={s.postItem}>
      <div className={s.imageWrapper}>
        <Link href={`/profile/${item.ownerId}/${item.id}`} className={s.postList}>
          {item.images[0]?.url && (
            <img className={s.image} src={item.images[0].url} alt={item.description || 'Post image'} />
          )}
        </Link>
        <Link className={s.userLink} href={`/profile/${item.ownerId}`}>
          <div className={s.userAvatarLink}>
            <ProfileAvatar src={item.avatarOwner} userName={item.userName} />
            <h3 className={s.userName}>{item.userName}</h3>
          </div>
        </Link>
        <TimeAgo className={s.time} date={item.createdAt} />
        <div className={s.description}>
          <ShowMoreButton maxLength={70} text={item.description} />
        </div>
      </div>
    </li>
  );
}
