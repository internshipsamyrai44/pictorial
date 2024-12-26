import { useRouter } from 'next/navigation';
import { useLogoutMutation } from '@/features/auth/api/authApi';
import { PATH } from '@/shared/const/PATH';

type serverError = {
  status: number;
};

export function useLogout() {
  const router = useRouter();
  const [logout, { isError: isErrorLogout, isLoading: isLoadingLogout, isSuccess: isSuccessLogout }] =
    useLogoutMutation();

  const logoutCleaner = () => {
    localStorage.removeItem('accessToken');
    router.push(PATH.LOGIN);
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      logoutCleaner();
    } catch (error: unknown) {
      const serverError = error as serverError;

      if (serverError?.status === 401) {
        logoutCleaner();
      }
    }
  };

  return { handleLogout, isErrorLogout, isLoadingLogout, isSuccessLogout };
}
