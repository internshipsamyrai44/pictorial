import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { inctagramApi } from '@/app/services/inctagram.api';
import { useDispatch } from 'react-redux';

export type AppStore = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    [inctagramApi.reducerPath]: inctagramApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(inctagramApi.middleware)
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

setupListeners(store.dispatch);
