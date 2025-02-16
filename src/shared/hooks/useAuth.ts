import { useSelector } from 'react-redux';
import { AppStore } from '@/app/store/store';

export const useAuth = (): boolean => {
  const isAuth = useSelector((state: AppStore) => state.auth.isAuth);
  return isAuth;
};
