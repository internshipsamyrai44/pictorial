import s from './search-result-item.module.scss';
import Link from 'next/link';
import { UserItem } from '@/features/search/model/searchApi.types';
import defaultAvatar from './../../../../../public/images/noAvatar.png';
import Image from 'next/image';

type Props = {
  user: UserItem;
};

export const SearchResultItem = ({ user }: Props) => {
  return (
    <div className={s.container}>
      <Image
        src={user.avatars?.[0]?.url || defaultAvatar}
        className={s.avatar}
        alt={user.userName || 'User avatar'}
        width={60}
        height={60}
      />
      <div className={s.name}>
        <Link href={`/profile/${user.id}`} className={s.link}>
          {user?.userName}
        </Link>
        <p className={s.userName}>
          {user.firstName} {user.lastName}
        </p>
      </div>
    </div>
  );
};
