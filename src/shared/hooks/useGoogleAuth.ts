import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { useGoogleOAuthMutation } from '@/features/auth/api/authApi';
import { useGoogleLogin } from '@react-oauth/google';
import { PATH } from '@/shared/const/PATH';

export const useGoogleAuth = () => {
  const [authMeGoogle] = useGoogleOAuthMutation();
  const router = useRouter();

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
        const decodedToken = jwtDecode<{ userId: string }>(accessToken ? accessToken : '');

        router.push(`${PATH.PROFILE}/${decodedToken.userId}`);
      } catch (error) {
        console.log('auth me Error', error);
      }
    }
  });
  return {
    login
  };
};
