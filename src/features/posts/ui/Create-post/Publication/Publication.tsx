import Image from 'next/image';
import { Input, Textarea } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './Publication.module.scss';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';
import Link from 'next/link';
import placeholder from '../../../../../../public/images/photo-placeholder.png';
import { useMeQuery } from '@/features/auth/api/authApi';
import { Carousel } from '@/features/posts/ui/Create-post/Carousel/Carousel';
import { useTranslations } from 'next-intl';

type PropsType = {
  userPhotos: string[];
  textAreaValue: string;
  // eslint-disable-next-line no-unused-vars
  setTextAreaValue: (textAreaValue: string) => void;
};

export const Publication = (props: PropsType) => {
  const { userPhotos, setTextAreaValue, textAreaValue } = props;
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
            {userPhotos.map((photo, index) => (
              <Image
                src={photo || placeholder}
                className={s.image}
                alt={'User Photo'}
                layout="responsive"
                width={100}
                height={100}
                key={`user-photo-${index}`}
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
    </>
  );
};
