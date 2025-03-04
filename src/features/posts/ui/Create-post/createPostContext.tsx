import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

type CreatePostContextProps = {
  userPhotos: string[];
  setUserPhotos: Dispatch<SetStateAction<string[]>>;
};

type CreatePostProviderProps = {
  children: ReactNode;
};

export const CreatePostContext = createContext<CreatePostContextProps | undefined>(undefined);

export const CreatePostProvider = ({ children }: CreatePostProviderProps) => {
  const [userPhotos, setUserPhotos] = useState<string[]>([]);

  return <CreatePostContext.Provider value={{ userPhotos, setUserPhotos }}>{children}</CreatePostContext.Provider>;
};
