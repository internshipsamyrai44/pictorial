import { Input } from '@internshipsamyrai44-ui-kit/components-lib';
import { useTranslations } from 'next-intl';
import { ChangeEvent, useState } from 'react';

type Props = {
  // eslint-disable-next-line no-unused-vars
  sendQuery: (name: string) => void;
};

export const SearchInput = ({ sendQuery }: Props) => {
  const t = useTranslations('search');
  const [value, setValue] = useState('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (newValue.length > 3) {
      sendQuery(newValue);
    }
  };
  console.log(value);
  return <Input type={'search'} placeholder={t('title')} value={value} onChange={onChangeHandler} />;
};
