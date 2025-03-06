import { useState } from 'react';
import { useCreatePostContext } from '@/shared/hooks/useCreatePostContext';

export const useUploadUserPhotoPreview = () => {
  const MAX_SIZE = 20 * 1024 * 1024;
  const [errorUploadModal, setErrorUploadModal] = useState(false);
  const { setUserPhotos } = useCreatePostContext();

  const isImageCorrect = (image: File) => {
    if (!image) {
      return false;
    }
    if (image.size > MAX_SIZE) {
      return false;
    }
    return !(!image.type.startsWith('image/jpeg') && !image.type.startsWith('image/png'));
  };

  const uploadUserPhotoPreview = (e: any) => {
    const userPhotoFile = e.target.files?.[0];

    if (!isImageCorrect(userPhotoFile)) {
      setErrorUploadModal(true);
      return;
    }
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        setUserPhotos((prevPhotos) => [
          ...prevPhotos,
          {
            id: Date.now().toString(),
            uri: reader.result as string,
            zoom: '1',
            aspectRatio: 'original',
            filter: 'normal'
          }
        ]);
      }
    };
    reader.readAsDataURL(userPhotoFile);
  };

  return { uploadUserPhotoPreview, errorUploadModal, setErrorUploadModal };
};
