import { Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useGetFollowingByUserNameQuery } from '@/features/profile/api/profileApi';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';
import s from './FollowingModal.module.scss';
import Link from 'next/link';
import { PATH } from '@/shared/const/PATH';
import { Loader } from '@/shared/ui/loader/Loader';

type FollowingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
};

export const FollowingModal = ({ isOpen, onClose, userName }: FollowingModalProps) => {
  const [open, setOpen] = useState(isOpen);
  const t = useTranslations('Profile');

  const {
    data: following,
    isLoading,
    isError
  } = useGetFollowingByUserNameQuery(userName, {
    skip: !open
  });

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      {open && (
        <Modal className={s.modal} title={t('Following')} onClose={onClose}>
          <div className={s.modalContent}>
            {isLoading && <Loader />}
            {isError && <div className={s.error}>{t('Error loading following')}</div>}
            {following && following.items.length === 0 && (
              <div className={s.emptyState}>
                <div className={s.noUsers}>{t('Not following anyone yet')}</div>
                <div className={s.emptyStateDescription}>{t('When you follow someone, they will appear here')}</div>
              </div>
            )}
            {following && following.items.length > 0 && (
              <ul className={s.userList}>
                {following.items.map((user) => (
                  <li key={user.id} className={s.userItem}>
                    <Link href={`${PATH.PROFILE}/${user.userId}`} className={s.userLink}>
                      <div className={s.userInfo}>
                        <ProfileAvatar src={user.avatars[0]?.url} height={40} width={40} userName={user.userName} />
                        <div className={s.userData}>
                          <div className={s.userName}>{user.userName}</div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};
