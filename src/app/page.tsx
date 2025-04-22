'use server';

import { redirect } from 'next/navigation';
import { PATH } from '@/shared/const/PATH';
import { baseUrl } from '@/shared/const/baseApi';
import { cookies } from 'next/headers';

export default async function IndexPage() {
  let me;
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    me = await fetch(`${baseUrl}v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Refresh-Token': refreshToken || ''
      }
    }).then((res) => res.json());
  } catch (error) {
    console.error(error);
  }

  if (!me?.userId) {
    redirect(PATH.PUBLIC.PUBLIC_PAGE);
  }

  redirect(PATH.HOME);
}
