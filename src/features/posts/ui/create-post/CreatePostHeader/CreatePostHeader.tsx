import s from './CreatePostHeader.module.scss';
import { Button, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import CrossIcon from '../../../../../../public/icons/smallCross.svg';
import { useTranslations } from 'next-intl';

type PropsType = {
  page: number;
  stepTitle: () => string;
  totalPages: number;
  // eslint-disable-next-line no-unused-vars
  paginate: (action: 'next' | 'prev' | 'close') => void;
  handleUploadPhotos: () => void;
};

export const CreatePostHeader = (props: PropsType) => {
  const { stepTitle, page, paginate, totalPages, handleUploadPhotos } = props;
  const t = useTranslations('Post');

  return (
    <div className={s.header}>
      {page != 0 && (
        <Button
          variant={'ghost'}
          onClick={() => paginate('prev')}
          className={s.back}
          aria-label={'Previous step'}
        ></Button>
      )}
      <Typography variant={'h2'}>{stepTitle()}</Typography>
      {page === 0 && (
        <Button className={s.btn} aria-label={'Close window'} onClick={() => paginate('close')}>
          <CrossIcon clasName={s.icon} />
        </Button>
      )}

      {page != 0 && page < totalPages - 1 && (
        <Button variant={'ghost'} onClick={() => paginate('next')}>
          {t('CreatePost.Next')}
        </Button>
      )}

      {page === 3 && (
        <Button variant={'ghost'} onClick={handleUploadPhotos}>
          {t('CreatePost.Publish')}
        </Button>
      )}
    </div>
  );
};
