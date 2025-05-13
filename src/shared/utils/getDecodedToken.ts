import { jwtDecode } from 'jwt-decode';

export const getDecodedToken = (token: string): string | null => {
  try {
    const decoded: { userId: string } = jwtDecode(token);
    return decoded.userId;
  } catch (err) {
    console.error('Failed to decode token:', err);
    return null;
  }
};
