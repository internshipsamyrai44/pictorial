'use client';

import { PATH } from '@/shared/const/PATH';
import { setCookie } from '@/shared/utils/cookieUtils';
import { getDecodedToken } from '@/shared/utils/getDecodedToken';
import { ContentPage } from '@/widgets/content-page/ContentPage';
import { LoaderLinear } from '@internshipsamyrai44-ui-kit/components-lib';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function GithubPage() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    if (!accessToken) {
      window.location.assign('https://inctagram.work/api/v1/auth/github/login');
    } else {
      try {
        setCookie('accessToken', accessToken, 7);
        const userId = getDecodedToken(accessToken);
        if (userId) {
          // replace(`/profile/${userId}`);
          replace(`/home`);
        } else {
          console.error('Ошибка: userId не найден');
          replace(PATH.AUTH.LOGIN);
        }
      } catch (error) {
        console.error('Ошибка при декодировании токена:', error);
        replace(PATH.AUTH.LOGIN);
      }
    }
  }, [replace, searchParams]);

  return (
    <ContentPage title={'Back to home page'} backHref={PATH.MAIN}>
      <LoaderLinear />
      Processing GitHub authorization...
    </ContentPage>
  );
}
