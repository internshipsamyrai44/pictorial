import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

type CreatePostContextProps = {
  userPhotos: string[];
  setUserPhotos: Dispatch<SetStateAction<string[]>>;
  modalCloseActive: boolean;
  setModalCloseActive: Dispatch<SetStateAction<boolean>>;
  // eslint-disable-next-line no-unused-vars
  paginate: (action: 'next' | 'prev' | 'close') => void;
  page: number;
  TOTAL_PAGES: number;
};

type CreatePostProviderProps = {
  children: ReactNode;
};

export const CreatePostContext = createContext<CreatePostContextProps | undefined>(undefined);

export const CreatePostProvider = ({ children }: CreatePostProviderProps) => {
  const TOTAL_PAGES = 4;
  const [userPhotos, setUserPhotos] = useState<string[]>([]);
  const [modalCloseActive, setModalCloseActive] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

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
        TOTAL_PAGES
      }}
    >
      {children}
    </CreatePostContext.Provider>
  );
};
