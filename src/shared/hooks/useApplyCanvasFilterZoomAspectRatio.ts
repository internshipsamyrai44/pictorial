import { UserPhotoType } from '@/features/posts/ui/create-post/createPostContext';

export const useApplyCanvasFilterZoomAspectRatio = () => {
  const filterMap = {
    normal: 'none',
    clarendon: 'sepia(0.15) contrast(1.25) brightness(1.25) hue-rotate(5deg)',
    lark: 'sepia(0.25) contrast(1.2) brightness(1.3) saturate(1.25)',
    gingham: 'contrast(1.1) brightness(1.1)',
    moon: 'brightness(1.4) contrast(0.95) saturate(0) sepia(0.35)',
    inkwell: 'brightness(1.25) contrast(0.85) grayscale(1)',
    nashville: 'sepia(0.25) contrast(1.5) brightness(0.9) hue-rotate(-15deg)',
    toaster: ' sepia(0.25) contrast(1.5) brightness(0.95) hue-rotate(-15deg)',
    brooklyn: 'sepia(0.25) contrast(1.25) brightness(1.25) hue-rotate(5deg)'
  };

  const aspectRatioMap = {
    original: undefined,
    square: 1,
    horizontal: 16 / 9,
    vertical: 4 / 5
  };

  const applyCanvasFilterZoomAspectRatio = (userPhoto: UserPhotoType): Promise<string> => {
    const { uri, filter, zoom, aspectRatio } = userPhoto;

    const aspectRatioNumber = Number(aspectRatioMap[aspectRatio]);
    const filterSettings = filterMap[filter];

    return new Promise((resolve, reject) => {
      const image = new Image();

      image.src = uri;
      image.onload = () => {
        const imgWidth = image.width;
        const imgHeight = image.height;

        let cropWidth = imgWidth / Number(zoom);
        let cropHeight = imgHeight / Number(zoom);

        const currentRatio = cropWidth / cropHeight;

        if (currentRatio > aspectRatioNumber) {
          cropWidth = cropHeight * aspectRatioNumber;
        } else if (currentRatio < aspectRatioNumber) {
          cropHeight = cropWidth / aspectRatioNumber;
        }

        const cropX = (imgWidth - cropWidth) / 2;
        const cropY = (imgHeight - cropHeight) / 2;

        const canvas = document.createElement('canvas');
        canvas.width = cropWidth;
        canvas.height = cropHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context не поддерживается'));
          return;
        }

        ctx.filter = filterSettings;

        ctx.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

        const dataUrl = canvas.toDataURL('image/jpeg');
        resolve(dataUrl);
      };

      image.onerror = (err) => {
        reject(err);
      };
    });
  };

  return { applyCanvasFilterZoomAspectRatio };
};
