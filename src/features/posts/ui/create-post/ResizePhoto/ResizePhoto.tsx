import { useState } from 'react';
import s from './ResizePhoto.module.scss';
import { useTranslations } from 'next-intl';
import FileIcon from '../../../../../../public/icons/PicIcon.svg';
import SquareIcon from '../../../../../../public/icons/squareIcon.svg';
import VerticalIcon from '../../../../../../public/icons/verticalIcon.svg';
import Horizontal from '../../../../../../public/icons/horizontalIcon.svg';
import { useCreatePostContext } from '@/shared/hooks/useCreatePostContext';

type PropsType = {
  // eslint-disable-next-line no-unused-vars
  setAspectRatio: (aspectRatio: AspectRatioType) => void;
};

export type AspectRatioType = 'original' | 'square' | 'horizontal' | 'vertical';

export const ResizePhoto = (props: PropsType) => {
  const { userPhotos, currentPhotoId } = useCreatePostContext();
  const { setAspectRatio } = props;
  const t = useTranslations('Post');

  const [selectedFormat, setSelectedFormat] = useState<AspectRatioType>('square');

  const handleFormatClick = (format: AspectRatioType) => {
    setSelectedFormat(format);
    setAspectRatio(format);
    setAspectRatioHandler(format);
  };

  const setAspectRatioHandler = (format: AspectRatioType) => {
    userPhotos.forEach((photo) => {
      if (photo.id === currentPhotoId) {
        photo.aspectRatio = format;
      }
    });
  };

  return (
    <div className={s.wrapper}>
      <div className={s.item} onClick={() => handleFormatClick('original')}>
        <span className={`${s.label} ${selectedFormat === 'original' ? s.active : ''}`}>
          {t('CreatePost.Original')}
        </span>
        <div className={s.svg}>
          <FileIcon
            className={`${s.icon} ${s.original} ${selectedFormat === 'original' ? s.active : ''}`}
            width={24}
            height={24}
          />
        </div>
      </div>
      <div className={s.item} onClick={() => handleFormatClick('square')}>
        <span className={`${s.label} ${selectedFormat === 'square' ? s.active : ''}`}>1:1</span>
        <div className={s.svg}>
          <SquareIcon className={`${s.icon} ${s.square} ${selectedFormat === 'square' ? s.active : ''}`} />
        </div>
      </div>
      <div className={s.item} onClick={() => handleFormatClick('vertical')}>
        <span className={`${s.label} ${selectedFormat === 'vertical' ? s.active : ''}`}>4:5</span>
        <div className={s.svg}>
          <VerticalIcon className={`${s.icon} ${s.vertical} ${selectedFormat === 'vertical' ? s.active : ''}`} />
        </div>
      </div>
      <div className={s.item} onClick={() => handleFormatClick('horizontal')}>
        <span className={`${s.label} ${selectedFormat === 'horizontal' ? s.active : ''}`}>16:9</span>
        <div className={s.svg}>
          <Horizontal className={`${s.icon} ${s.horizontal} ${selectedFormat === 'horizontal' ? s.active : ''}`} />
        </div>
      </div>
    </div>
  );
};
