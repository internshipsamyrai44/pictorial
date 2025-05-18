import { Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useGetFollowersByUserNameQuery } from '@/features/profile/api/profileApi';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';
import s from './FollowersModal.module.scss';
import Link from 'next/link';
import { PATH } from '@/shared/const/PATH';
import { Loader } from '@/shared/ui/loader/Loader';

type FollowersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
};

export const FollowersModal = ({ isOpen, onClose, userName }: FollowersModalProps) => {
  const [open, setOpen] = useState(isOpen);
  const t = useTranslations('Profile');

  const {
    data: followers,
    isLoading,
    isError
  } = useGetFollowersByUserNameQuery(userName, {
    skip: !open
  });

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      {open && (
        <Modal className={s.modal} title={t('Followers')} onClose={onClose}>
          <div className={s.modalContent}>
            {isLoading && <Loader />}
            {isError && <div className={s.error}>{t('Error loading followers')}</div>}
            {followers && followers.length === 0 && <div className={s.noUsers}>{t('No followers yet')}</div>}
            {followers && followers.length > 0 && (
              <ul className={s.userList}>
                {followers.map((follower) => (
                  <li key={follower.id} className={s.userItem}>
                    <Link href={`${PATH.PROFILE}/${follower.id}`} className={s.userLink}>
                      <div className={s.userInfo}>
                        <ProfileAvatar
                          src={follower.avatars[0]?.url}
                          height={40}
                          width={40}
                          userName={follower.userName}
                        />
                        <div className={s.userData}>
                          <div className={s.userName}>{follower.userName}</div>
                          {(follower.firstName || follower.lastName) && (
                            <div className={s.fullName}>
                              {follower.firstName} {follower.lastName}
                            </div>
                          )}
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
