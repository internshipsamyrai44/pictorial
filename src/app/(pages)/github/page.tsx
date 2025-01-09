'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ContentPage } from '@/widgets/content-page/ContentPage';
import { PATH } from '@/shared/const/PATH';
import { getDecodedToken } from '@/shared/utils/getDecodedToken';
import { LoaderLinear } from '@internshipsamyrai44-ui-kit/components-lib';

export default function GithubPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    if (accessToken) {
      try {
        localStorage.setItem('accessToken', accessToken);
        const userId = getDecodedToken(accessToken);
        if (userId) {
          router.push(`${PATH.PROFILE.PROFILE_USERID}`);
        } else {
          console.error('Ошибка: userId не найден');
          router.push(PATH.AUTH.LOGIN);
        }
      } catch (error) {
        console.error('Ошибка при декодировании токена:', error);
        router.push(PATH.AUTH.LOGIN);
      }
    }
  }, [router, searchParams]);

  return (
    <ContentPage title={'Back to home page'} backHref={PATH.MAIN}>
      <LoaderLinear />
      Processing GitHub authorization...
    </ContentPage>
  );
}
