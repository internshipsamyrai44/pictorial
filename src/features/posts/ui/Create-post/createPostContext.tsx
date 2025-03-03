import React, { createContext, useState } from 'react';

type FeatureProviderProps = {
  children: React.ReactNode[];
};

export const CreatePostContext = createContext({});

export const FeatureProvider = ({ children }: FeatureProviderProps) => {
  const [createPostData, setCreatePostData] = useState({});

  return (
    <CreatePostContext.Provider value={{ CreatePostData: createPostData, setCreatePostData }}>
      {children}
    </CreatePostContext.Provider>
  );
};
