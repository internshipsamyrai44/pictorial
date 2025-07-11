'use client';
import React, { lazy, Suspense } from 'react';
import { Loader } from '@/shared/ui/loader/Loader';
import { MeResponse } from '@/features/auth/model/authApi.types';

type RemoteMessengerProps = {
  user: MeResponse;
};

const RemoteMessengerWidget = lazy(async (): Promise<{ default: React.ComponentType<RemoteMessengerProps> }> => {
  try {
    //@ts-ignore
    const moduleExports = await import(/* webpackIgnore: true */ 'http://localhost:3000/remoteEntry.js');

    await moduleExports.init({
      react: {
        '18.3.1': {
          get: () => Promise.resolve(() => React),
          loaded: true,
          eager: true
        }
      },
      'react-dom': {
        '18.3.1': {
          get: () => import('react-dom'),
          loaded: false,
          eager: true
        }
      }
    });

    const factory = await moduleExports.get('./widget');
    const Module = factory();

    if (Module.Component) {
      return {
        default: (props: RemoteMessengerProps) => <Module.Component {...props} />
      };
    }

    return {
      default: () => <div>Компонент недоступен</div>
    };
  } catch (error) {
    console.error('Ошибка загрузки удаленного модуля:', error);
    return {
      default: () => <div>Ошибка загрузки мессенджера</div>
    };
  }
});

export const Messenger = ({ user }: RemoteMessengerProps) => {
  return (
    <Suspense fallback={<Loader />}>
      <RemoteMessengerWidget user={user} />
    </Suspense>
  );
};
