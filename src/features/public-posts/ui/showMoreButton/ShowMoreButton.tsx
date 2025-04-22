import { useState } from 'react';
import s from './ShowMoreButton.module.scss';
import { useTranslations } from 'next-intl';

export type Props = {
  maxLength: number;
  text: string;
};

export const ShowMoreButton = ({ maxLength, text }: Props) => {
  const [isTrimmed, setIsTrimmed] = useState(true);
  const t = useTranslations('PublicPosts');

  const toggleReadMore = () => {
    setIsTrimmed(!isTrimmed);
  };

  if (text.length <= maxLength) {
    return <>{text}</>;
  }

  const trimmedText = `${text.slice(0, maxLength)}...`;
  const textToShow = isTrimmed ? trimmedText : text;
  const buttonText = isTrimmed ? t('ShowMore') : t('Hide');

  return (
    <>
      {textToShow}
      <button className={s.button} onClick={toggleReadMore}>
        {buttonText}
      </button>
    </>
  );
};
