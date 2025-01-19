import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { inctagramApi } from '@/app/services/inctagram.api';
import { useDispatch } from 'react-redux';

export type AppStore = ReturnType<typeof store.getState>;
import { publicProfileApi } from '@/features/profile/api/publicProfileApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [signUpApi.reducerPath]: signUpApi.reducer,
    [publicProfileApi.reducerPath]: publicProfileApi.reducer,
    [inctagramApi.reducerPath]: inctagramApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, signUpApi.middleware, publicProfileApi.middleware, inctagramApi.middleware)
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

setupListeners(store.dispatch);
