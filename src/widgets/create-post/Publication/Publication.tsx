import Image from 'next/image';
import * as React from 'react';
import { Button, Input, Textarea } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './Publication.module.scss';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';
import Link from 'next/link';

type PropsType = {
  userPhoto: string | null;
  // eslint-disable-next-line no-unused-vars
  setPage: (page: number | null) => void;
};

export const Publication = (props: PropsType) => {
  const { userPhoto, setPage } = props;
  return (
    <>
      <div className={s.buttons}>
        <Button variant={'ghost'} onClick={() => setPage(1)}>
          {'<'}
        </Button>{' '}
        <Button variant={'ghost'} onClick={() => alert('Post is Publish')}>
          {'Publish'}
        </Button>
      </div>
      <div className={s.wrapper}>
        <Image
          src={userPhoto as string}
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
          <Textarea label={'Add publication descriptions'} placeholder={'Add publication descriptions'} />

          <Input label={'Add location'} placeholder={'New-York'} />
        </div>
      </div>
    </>
  );
};
