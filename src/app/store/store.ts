import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/features/auth/api/authApi';
import { signUpApi } from '@/features/signup/api/signUpApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { publicProfileApi } from '@/features/profile/api/publicProfileApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [signUpApi.reducerPath]: signUpApi.reducer,
    [publicProfileApi.reducerPath]: publicProfileApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, signUpApi.middleware, publicProfileApi.middleware)
});

setupListeners(store.dispatch);
