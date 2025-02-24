export const dataURLtoFile = (dataURL: string): File => {
  const arr = dataURL.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) {
    throw new Error('Invalid Data URL');
  }
  const mime = mimeMatch[1];

  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  const ext = mime.split('/')[1];
  const filename = `file.${ext}`;
  return new File([u8arr], filename, { type: mime });
};
