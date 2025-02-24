import Image from 'next/image';
import { Button, Input, Textarea } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './Publication.module.scss';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';
import Link from 'next/link';
import placeholder from '../../../../../../public/images/photo-placeholder.png';
import { useCreatePostMutation } from '@/features/posts/api/postsApi';

type PropsType = {
  userPhotos: string[];
};

export const Publication = (props: PropsType) => {
  const { userPhotos } = props;
  const formData = new FormData();

  const [createPost] = useCreatePostMutation();

  const uploadPhotos = () => {
    userPhotos.forEach((file, index) => {
      formData.append(`photo[${index}]`, file);
    });
    createPost(formData);
  };

  return (
    <>
      <div className={s.wrapper}>
        <Image
          src={userPhotos[0] || placeholder}
          className={s.image}
          alt={'User Photo'}
          layout="responsive"
          width={100}
          height={100}
        />
        <div className={s.info}>
          <Link href={`/public-user/profile/#`}>
            <div className={s.avatar}>
              <ProfileAvatar src={''} userName={'userName'} />
              <h3 className={s.userName}>{'userName'}</h3>
            </div>
          </Link>
          <Textarea
            label={'Add publication descriptions'}
            placeholder={'Add publication descriptions'}
            className={s.text}
          />

          <Input label={'Add location'} placeholder={'New-York'} />
          <Button onClick={uploadPhotos}>Publish</Button>
        </div>
      </div>
    </>
  );
};
