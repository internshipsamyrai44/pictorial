import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { AspectRatioType } from '@/features/posts/ui/create-post/ResizePhoto/ResizePhoto';
import { FiltersType } from '@/features/posts/ui/create-post/Filters/Filters';

type CreatePostContextProps = {
  userPhotos: UserPhotoType[];
  setUserPhotos: Dispatch<SetStateAction<UserPhotoType[]>>;
  modalCloseActive: boolean;
  setModalCloseActive: Dispatch<SetStateAction<boolean>>;
  // eslint-disable-next-line no-unused-vars
  paginate: (action: 'next' | 'prev' | 'close') => void;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  TOTAL_PAGES: number;
  currentPhotoId: string | undefined;
  setCurrentPhotoId: Dispatch<SetStateAction<string | undefined>>;
};

type CreatePostProviderProps = {
  children: ReactNode;
};

export type UserPhotoType = {
  id: string;
  uri: string;
  filter: FiltersType;
  aspectRatio: AspectRatioType;
  zoom: string;
};

export const CreatePostContext = createContext<CreatePostContextProps | undefined>(undefined);

export const CreatePostProvider = ({ children }: CreatePostProviderProps) => {
  const TOTAL_PAGES = 4;
  const [userPhotos, setUserPhotos] = useState<UserPhotoType[]>([]);
  const [modalCloseActive, setModalCloseActive] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [currentPhotoId, setCurrentPhotoId] = useState<string | undefined>(undefined);

  const paginate = (action: 'next' | 'prev' | 'close') => {
    switch (action) {
      case 'next': {
        if (page < TOTAL_PAGES - 1) {
          setPage((prev) => prev + 1);
        }
        break;
      }

      case 'prev': {
        if (page > 0) {
          setPage((prev) => prev - 1);
        } else {
          setPage(0);
        }
        break;
      }

      case 'close': {
        setModalCloseActive(true);
        break;
      }
    }
  };

  return (
    <CreatePostContext.Provider
      value={{
        userPhotos,
        setUserPhotos,
        modalCloseActive,
        setModalCloseActive,
        paginate,
        page,
        setPage,
        TOTAL_PAGES,
        currentPhotoId,
        setCurrentPhotoId
      }}
    >
      {children}
    </CreatePostContext.Provider>
  );
};
