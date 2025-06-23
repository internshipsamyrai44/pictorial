import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { inctagramApi } from '@/app/services/inctagram.api';
import { useDispatch } from 'react-redux';
import { publicProfileApi } from '@/features/profile/api/publicProfileApi';
import { publicPostsApi } from '@/features/public-posts/api/publicPostApi';
import { authReducer } from '@/redux/authSlice';
import { messengerApi } from '@/features/messenger/api/messenger.api';

export type AppStore = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [publicProfileApi.reducerPath]: publicProfileApi.reducer,
    [inctagramApi.reducerPath]: inctagramApi.reducer,
    [publicPostsApi.reducerPath]: publicPostsApi.reducer,
    [messengerApi.reducerPath]: messengerApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      publicProfileApi.middleware,
      inctagramApi.middleware,
      publicPostsApi.middleware,
      messengerApi.middleware
    )
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

setupListeners(store.dispatch);
