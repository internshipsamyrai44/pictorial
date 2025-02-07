import { useState } from 'react';

import s from './ShowMoreButton.module.scss';

export type Props = {
  maxLength: number;
  text: string;
};

export const ShowMoreButton = ({ maxLength, text }: Props) => {
  const [isTrimmed, setIsTrimmed] = useState(true);
  const toggleReadMore = () => {
    setIsTrimmed(!isTrimmed);
  };

  if (text.length <= maxLength) {
    return <>{text}</>;
  }

  const trimmedText = `${text.slice(0, maxLength)}...`;
  const textToShow = isTrimmed ? trimmedText : text;
  const buttonText = isTrimmed ? 'Show more' : 'Hide';

  return (
    <>
      {textToShow}
      <button className={s.button} onClick={toggleReadMore}>
        {buttonText}
      </button>
    </>
  );
};
