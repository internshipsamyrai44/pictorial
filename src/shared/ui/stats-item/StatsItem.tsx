import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';

type Props = {
  value: number;
  title: string;
};
export const StatsItem = ({ value, title }: Props) => {
  return (
    <div>
      <Typography variant={'bold-text-14'}>{value}</Typography>
      <Typography variant={'bold-text-14'}>{title}</Typography>
    </div>
  );
};
