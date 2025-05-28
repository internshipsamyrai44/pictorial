import HeartFilled from '../../../../../../../../../../../public/icons/HeartLike';
import HeartOutline from '../../../../../../../../../../../public/icons/HeartOutline';
import s from './LikeToggle.module.scss';

type Props = {
  handleLike: () => void;
  isLoading: boolean;
  isLiked: boolean;
};

export const LikeToggle = ({ handleLike, isLoading, isLiked }: Props) => {
  return (
    <div onClick={handleLike} className={isLoading ? s.disabled : ''}>
      {isLiked ? <HeartFilled width={16} height={16} /> : <HeartOutline width={16} height={16} />}
    </div>
  );
};
