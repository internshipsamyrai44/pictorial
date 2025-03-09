import { useContext } from 'react';
import { CreatePostContext } from '@/features/posts/ui/Create-post/createPostContext';

export const useCreatePostContext = () => {
  const context = useContext(CreatePostContext);
  if (!context) {
    throw new Error('useCreatePostContext should be used inside CreatePostContextProvider');
  }
  return context;
};
