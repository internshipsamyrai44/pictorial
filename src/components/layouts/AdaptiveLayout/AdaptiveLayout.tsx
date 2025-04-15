'use client';

import { useSelector } from 'react-redux';
import { getIsAuth } from '@/redux/authSlice';
import { ReactNode } from 'react';
import { AuthorizedLayout } from '@/components/layouts/AuthorizedLayout/AuthorizedLayout';
import { BaseLayout } from '@/components/layouts/BaseLayout/BaseLayout';

type Props = {
  children: ReactNode;
};

export const AdaptiveLayout = ({ children }: Props) => {
  const isAuth = useSelector(getIsAuth);

  return isAuth ? <AuthorizedLayout>{children}</AuthorizedLayout> : <BaseLayout>{children}</BaseLayout>;
};
