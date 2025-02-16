import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { inctagramApi } from '@/app/services/inctagram.api';
import { useDispatch } from 'react-redux';

export type AppStore = ReturnType<typeof store.getState>;
import { publicProfileApi } from '@/features/profile/api/publicProfileApi';
import { publicUserPostApi } from '@/features/public-posts/api/publicPostApi';
import { authReducer } from '@/redux/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [publicProfileApi.reducerPath]: publicProfileApi.reducer,
    [inctagramApi.reducerPath]: inctagramApi.reducer,
    [publicUserPostApi.reducerPath]: publicUserPostApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(publicProfileApi.middleware, inctagramApi.middleware, publicUserPostApi.middleware)
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

setupListeners(store.dispatch);
