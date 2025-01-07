import { cn } from '@/shared/utils';
import { Checkbox } from '@internshipsamyrai44-ui-kit/components-lib';
import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form';
import React from 'react';

type Props<T extends FieldValues> = Omit<UseControllerProps<T>, 'control'> &
  React.ComponentProps<typeof Checkbox> & {
    control: Control<T>;
  };

export const CheckboxControl = <T extends FieldValues>(props: Props<T>) => {
  const { control, name, children, className, ...rest } = props;

  const {
    field: { onChange, value, ...field }
  } = useController({
    control,
    name
  });

  return (
    <div className={cn('', className)}>
      <Checkbox {...rest} {...field} value={value} defaultValue={value} onChange={onChange}>
        {children}
      </Checkbox>
    </div>
  );
};
