import { useSelector } from 'react-redux';
import { AppStore, useAppDispatch } from '@/app/store/store';
import { setAuth } from '@/redux/authSlice';

export const useAuth = () => {
  const isAuth = useSelector((state: AppStore) => state.auth.isAuth);
  const dispatch = useAppDispatch();

  const setAuthState = (value: boolean) => {
    dispatch(setAuth(value));
  };

  return { isAuth, setAuth: setAuthState };
};
