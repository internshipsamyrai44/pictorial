import s from './CreatePost.module.scss';
import { Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import * as React from 'react';

import { useState } from 'react';
import { Startlayout } from '@/widgets/create-post/Start-layout/Startlayout';

type PropsType = {
  // eslint-disable-next-line no-unused-vars
  setCreatePostActive: (value: boolean) => void;
};

export const CreatePost = (props: PropsType) => {
  const { setCreatePostActive } = props;

  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  return (
    <Modal title={'Add Photo'} className={s.wrapper} onClose={() => setCreatePostActive(false)}>
      <Startlayout userPhoto={userPhoto} setUserPhoto={setUserPhoto} />
    </Modal>
  );
};

//<Image src={userPhoto} alt={'User Photo'} layout="responsive" width={100} height={100} />
