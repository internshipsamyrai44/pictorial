import { cn } from '@/shared/utils';
import { Checkbox } from '@internshipsamyrai44-ui-kit/components-lib';

type Props = {
  className?: string;
};

export const CheckboxForm = ({ className }: Props) => {
  return <Checkbox className={cn('', className)} />;
};
