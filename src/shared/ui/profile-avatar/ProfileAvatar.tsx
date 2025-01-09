import Image from 'next/image';
import emptyAvatar from './../../../../public/images/noAvatar.png';
type Props = {
  height?: number;
  src: string;
  width?: number;
};

export const ProfileAvatar = ({ height = 36, src, width = 36 }: Props) => {
  return (
    <Image
      alt={'Profile avatar'}
      style={{ borderRadius: '50%' }}
      height={height}
      src={src || emptyAvatar}
      width={width}
    />
  );
};
