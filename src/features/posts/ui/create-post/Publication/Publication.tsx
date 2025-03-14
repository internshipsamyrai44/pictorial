import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Input, Textarea } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './Publication.module.scss';
import { QueryStatus } from '@reduxjs/toolkit/query';
import Link from 'next/link';

import { useMeQuery } from '@/features/auth/api/authApi';
import { useCreatePostContext } from '@/shared/hooks/useCreatePostContext';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';
import { Loader } from '@/shared/ui/loader/Loader';
import placeholder from '../../../../../../public/images/photo-placeholder.png';
import { Carousel } from '../Carousel/Carousel';

type PropsType = {
  textAreaValue: string;
  // eslint-disable-next-line no-unused-vars
  setTextAreaValue: (textAreaValue: string) => void;
  status: QueryStatus;
};

export const Publication = (props: PropsType) => {
  const { userPhotos } = useCreatePostContext();
  const { setTextAreaValue, textAreaValue, status } = props;
  const { data: me } = useMeQuery();
  const t = useTranslations('Post');

  const textAreaHandler = (e: any) => {
    setTextAreaValue(e.target.value);
  };

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.image}>
          <Carousel>
            {userPhotos.map((photo) => (
              <Image
                src={photo.uri || placeholder}
                className={`${s.image} ${s[photo.filter]}  ${s[photo.aspectRatio]}`}
                alt={'User `Photo'}
                layout="responsive"
                width={100}
                height={100}
                key={`user-photo-${photo.id}`}
                style={{
                  transform: `scale(${photo.zoom})`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.2s ease-in-out'
                }}
              />
            ))}
          </Carousel>
        </div>

        <div className={s.info}>
          <Link href={`/public-user/profile/${me?.userId}`}>
            <div className={s.avatar}>
              <ProfileAvatar src={''} userName={`${me?.userName}`} />
              <h3 className={s.userName}>{me?.userName}</h3>
            </div>
          </Link>
          <div className={s.textarea}>
            <Textarea
              label={t('CreatePost.AddDescriptions')}
              placeholder={t('CreatePost.AddDescriptions')}
              className={s.text}
              value={textAreaValue}
              onChange={textAreaHandler}
              maxLength={500}
            />
            <span>{textAreaValue.length} / 500</span>
          </div>

          <div className={s.location}>
            <Input label={t('CreatePost.AddLocation')} placeholder={'New-York'} className={s.input} />
          </div>
        </div>
      </div>
      {status === 'pending' && (
        <div className={s.loaderWrapper}>
          <Loader />
        </div>
      )}
    </>
  );
};
