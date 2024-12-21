export const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') return `${window.location.protocol}//${window.location.host}`;

  if (process.env.NODE_ENV === 'development') return 'https://pictorial.work/';

  return 'test';
};
