'use client';

import { PATH } from '@/shared/const/PATH';
import { setCookie } from '@/shared/utils/cookieUtils';
import { getDecodedToken } from '@/shared/utils/getDecodedToken';
import { ContentPage } from '@/widgets/content-page/ContentPage';
import { LoaderLinear } from '@internshipsamyrai44-ui-kit/components-lib';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

export default function GithubPage() {
  const t = useTranslations('GithubPage');
  return (
    <ContentPage title={t('BackHomePage')} backHref={PATH.MAIN}>
      <Suspense fallback={<LoaderLinear />}>
        <GithubPageContent />
      </Suspense>
    </ContentPage>
  );
}

const GithubPageContent = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('GithubPage');
  const tError = useTranslations('Errors');
  const accessToken = searchParams.get('accessToken');

  useEffect(() => {
    if (!accessToken) {
      window.location.assign('https://inctagram.work/api/v1/auth/github/login');
    } else {
      try {
        setCookie('accessToken', accessToken, 7);
        const userId = getDecodedToken(accessToken);
        if (userId) {
          replace(PATH.HOME);
        } else {
          console.error(tError('ErrorUserIdNotFound'));
          replace(PATH.AUTH.LOGIN);
        }
      } catch (error) {
        console.error(tError('ErrorDecodingToken'), error);
        replace(PATH.AUTH.LOGIN);
      }
    }
  }, [accessToken, replace, tError]);

  return (
    <>
      <LoaderLinear />
      {t('ProcessingAuthorization')}
    </>
  );
};
