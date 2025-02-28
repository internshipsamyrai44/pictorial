import { useState } from 'react';

export const useCheckUploadedImage = () => {
  const MAX_SIZE = 20 * 1024 * 1024;
  const [errorUploadModal, setErrorUploadModal] = useState(false);

  const isImageCorrect = (image: File) => {
    if (!image) {
      return false;
    }
    if (image.size > MAX_SIZE) {
      return false;
    }
    return !(!image.type.startsWith('image/jpeg') && !image.type.startsWith('image/png'));
  };

  return { isImageCorrect, errorUploadModal, setErrorUploadModal };
};
