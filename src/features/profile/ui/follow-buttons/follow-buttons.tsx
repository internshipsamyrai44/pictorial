import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import React from 'react';
import { useTranslations } from 'next-intl';

type Props = {
  isMyProfile: boolean;
};

export const FollowButtons = ({ isMyProfile }: Props) => {
  const t = useTranslations('Profile');
  return !isMyProfile && <Button variant={'primary'}>{t('Follow')}</Button>;
};
