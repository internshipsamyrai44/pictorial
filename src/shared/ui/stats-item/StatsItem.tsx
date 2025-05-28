import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './StatsItem.module.scss';

type Props = {
  value: number;
  title: string;
  onClick?: () => void;
};

export const StatsItem = ({ value, title, onClick }: Props) => {
  return (
    <div className={onClick ? s.clickable : ''} onClick={onClick}>
      <Typography variant={'bold-text-14'}>{value}</Typography>
      <Typography variant={'bold-text-14'}>{title}</Typography>
    </div>
  );
};
