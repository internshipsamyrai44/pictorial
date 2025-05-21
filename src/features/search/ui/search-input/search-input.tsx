import { Input } from '@internshipsamyrai44-ui-kit/components-lib';
import { useTranslations } from 'next-intl';
import { ChangeEvent, useState } from 'react';

type Props = {
  // eslint-disable-next-line no-unused-vars
  sendQuery: (name: string) => void;
  initialValue?: string;
};

export const SearchInput = ({ sendQuery, initialValue = '' }: Props) => {
  const t = useTranslations('search');
  const [value, setValue] = useState(initialValue);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (newValue.length > 3) {
      sendQuery(newValue);
    }
  };
  return <Input type={'search'} placeholder={initialValue ?? t('title')} value={value} onChange={onChangeHandler} />;
};
