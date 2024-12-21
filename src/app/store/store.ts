import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/features/auth/api/authApi';
import { signUpApi } from '@/features/signup/api/signUpApi';
import { confirmRegistrationApi, registrationEmailResendingApi } from '@/features/signup/';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [signUpApi.reducerPath]: signUpApi.reducer,
    [confirmRegistrationApi.reducerPath]: confirmRegistrationApi.reducer,
    [registrationEmailResendingApi.reducerPath]: registrationEmailResendingApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      signUpApi.middleware,
      confirmRegistrationApi.middleware,
      registrationEmailResendingApi.middleware
    )
});

setupListeners(store.dispatch);
