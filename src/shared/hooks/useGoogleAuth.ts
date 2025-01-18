import { useRouter } from 'next/navigation';
import { useGoogleOAuthMutation } from '@/features/auth/api/authApi';
import { useGoogleLogin } from '@react-oauth/google';
import { PATH } from '@/shared/const/PATH';
import { getDecodedToken } from '@/shared/utils/getDecodedToken';

export const useGoogleAuth = () => {
  const [authMeGoogle] = useGoogleOAuthMutation();
  const { push } = useRouter();

  const login = useGoogleLogin({
    flow: 'auth-code',
    onError: (error) => {
      console.log('Login Failed:', error);
    },
    onSuccess: async (codeResponse) => {
      try {
        const resGoogleOAuth = await authMeGoogle({ code: codeResponse.code });
        const accessToken = resGoogleOAuth.data?.accessToken;

        localStorage.setItem('accessToken', JSON.stringify(accessToken));
        const userId = getDecodedToken(accessToken);
        if (userId) {
          push(`/profile/${userId}`);
        } else {
          console.error('Ошибка: userId не найден');
          push(PATH.AUTH.LOGIN);
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
