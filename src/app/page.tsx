'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { PATH } from '@/shared/const/PATH';
import { useEffect } from 'react';

export default function IndexPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();

  useEffect(() => {
    if (id === null) {
      // searchParams.get возвращает либо строку, либо null
      console.log('ID:', id);
      router.push(PATH.PUBLIC.PUBLIC_PAGE);
    } else {
      router.push(PATH.MAIN);
    }
  }, [id, router]);

  return null; // или можно вернуть какой-то индикатор загрузки
}
