import { PostItemProps } from '@/features/public-posts/model/publicPostApi.types';
import s from '@/features/public-posts/ui/publicPost/PublicPost.module.scss';
import Link from 'next/link';
import TimeAgo from 'react-timeago';
import { ShowMoreButton } from '@/features/public-posts/ui/showMoreButton/ShowMoreButton';

export default function PostItem({ item }: PostItemProps) {
  return (
    <li className={s.postItem}>
      <div className={s.imageWrapper}>
        {item.images[0]?.url && (
          <img className={s.image} src={item.images[0].url} alt={item.description || 'Post image'} />
        )}
        <Link className={s.userLink} href={`/${item.ownerId}` /* ТУТ ДОПИСАТЬ ЛОГИКУ ПЕРЕХОДА НА ПОСТ ЮЗЕРА */}>
          <div className={s.userAvatarLink}>
            <img src={item.avatarOwner ?? '/images/noAvatar.png'} alt="avatar" className={s.userAvatar} />
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
