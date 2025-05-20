import { useLocale } from 'next-intl';
import { ru, enUS } from 'date-fns/locale';
import { formatDistanceToNow } from 'date-fns';

export const useFormattedDateDistanceToNow = () => {
  const locale = useLocale();
  const locales = { ru, en: enUS };

  const formatDateDistanceToNow = (date: string | Date) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: locales[locale as keyof typeof locales]
    });
  };

  return formatDateDistanceToNow;
};
