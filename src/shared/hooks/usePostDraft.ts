import { useCallback } from 'react';
import { clearDraft, loadDraft, PostDraft, saveDraft } from '@/shared/utils/postDraftIdb';
import { UserPhotoType } from '@/features/posts/ui/create-post/createPostContext';

export const usePostDraft = () => {
  // Сохраняем в IndexedDB
  const savePostDraft = useCallback(
    async (userPhotos: UserPhotoType[], textAreaValue: string, page: number): Promise<void> => {
      try {
        const draft: PostDraft = {
          userPhotos,
          textAreaValue,
          page
        };
        await saveDraft(draft);
      } catch (error) {
        console.error('Error saving post draft:', error);
      }
    },
    []
  );

  // Загружаем из IndexedDB
  const loadPostDraft = useCallback(async (): Promise<PostDraft | undefined> => {
    try {
      return await loadDraft();
    } catch (error) {
      console.error('Error loading post draft:', error);
      return undefined;
    }
  }, []);

  // Удаляем из IndexedDB
  const clearPostDraft = useCallback(async (): Promise<void> => {
    try {
      await clearDraft();
    } catch (error) {
      console.error('Error clearing post draft:', error);
    }
  }, []);

  return {
    savePostDraft,
    loadPostDraft,
    clearPostDraft
  };
};
