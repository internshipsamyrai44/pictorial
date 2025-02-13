import { useRouter } from 'next/navigation';
import { useGoogleOAuthMutation } from '@/features/auth/api/authApi';
import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import { PATH } from '@/shared/const/PATH';
import { getDecodedToken } from '@/shared/utils/getDecodedToken';
import { setCookie } from '@/shared/utils/cookieUtils';

export const useGoogleAuth = () => {
  const [authMeGoogle] = useGoogleOAuthMutation();
  const { push } = useRouter();

  const login = useGoogleLogin({
    flow: 'auth-code',
    onError: (error) => {
      console.log('Login Failed:', error);
    },
    onSuccess: async (credentialResponse: CodeResponse) => {
      try {
        const { accessToken } = await authMeGoogle({
          code: credentialResponse.code
        }).unwrap();
        if (accessToken) {
          setCookie('accessToken', accessToken, 7);
          const userId = getDecodedToken(accessToken);
          if (userId) {
            // push(`/profile/${userId}`);
            push(`/home`);
          } else {
            console.error('Ошибка: userId не найден');
            push(PATH.AUTH.LOGIN);
          }
        }
      } catch (error) {
        console.log('auth me Error', error);
      }
    }
  });

  return {
    login
  };
};
