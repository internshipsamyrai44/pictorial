import { useLocale } from 'next-intl';
import { format } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';

export const useFormattedDate = () => {
  const locale = useLocale();
  const locales = { ru, en: enUS };

  const formatDate = (date: string | Date) => {
    return format(new Date(date), 'LLLL d, yyyy', {
      locale: locales[locale as keyof typeof locales]
    });
  };

  return formatDate;
};
