'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { ContentPage } from '@/widgets/content-page/ContentPage';
import { PATH } from '@/shared/const/PATH';

export default function GithubPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');

    if (accessToken) {
      try {
        localStorage.setItem('accessToken', accessToken);
        const decoded = jwtDecode<{ userId: string }>(accessToken);
        router.push(`${PATH.PROFILE}/${decoded.userId}`);
      } catch (error) {
        console.error('Ошибка при декодировании токена:', error);
        router.push(PATH.LOGIN);
      }
    }
  }, [router, searchParams]);

  return (
    <ContentPage title={'Back to home page'} backHref={PATH.MAIN}>
      Processing GitHub authorization...
    </ContentPage>
  );
}
