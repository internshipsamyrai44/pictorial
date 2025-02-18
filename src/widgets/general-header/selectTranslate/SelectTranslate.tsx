import { setUserLocale } from '@/i18n/locale';
import s from '@/widgets/general-header/GeneralHeader.module.scss';
import { FlagRussiaIcon, FlagUnitedKingdomIcon, Select, SelectItem } from '@internshipsamyrai44-ui-kit/components-lib';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';

export const SelectTranslate = () => {
  const locale = useLocale();
  // eslint-disable-next-line no-unused-vars
  const [isPending, startTransition] = useTransition();

  const handleChange = (value: string) => {
    const locale = value as 'en' | 'ru';
    startTransition(() => {
      setUserLocale(locale);
    });
  };

  return (
    <div className={s.select}>
      <Select defaultValue={locale} onValueChange={handleChange}>
        <SelectItem value="en">
          <div className={s.selectValue}>
            <FlagUnitedKingdomIcon />
            <span>English</span>
          </div>
        </SelectItem>
        <SelectItem value="ru">
          <div className={s.selectValue}>
            <FlagRussiaIcon />
            <span>Русский</span>
          </div>
        </SelectItem>
      </Select>
    </div>
  );
};
