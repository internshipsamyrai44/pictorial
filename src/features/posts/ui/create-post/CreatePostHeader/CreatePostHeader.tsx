import s from './CreatePostHeader.module.scss';
import { Button, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import CrossIcon from '../../../../../../public/icons/smallCross.svg';
import { useTranslations } from 'next-intl';
import { useCreatePostContext } from '@/shared/hooks/useCreatePostContext';

type PropsType = {
  stepTitle: () => string;
  handleUploadPhotos: () => void;
};

export const CreatePostHeader = (props: PropsType) => {
  const { stepTitle, handleUploadPhotos } = props;
  const { page, paginate, TOTAL_PAGES } = useCreatePostContext();
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
          <CrossIcon className={s.icon} />
        </Button>
      )}

      {page != 0 && page < TOTAL_PAGES - 1 && (
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
