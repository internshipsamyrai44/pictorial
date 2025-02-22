import s from './CreatePostHeader.module.scss';
import { Button, Typography } from '@internshipsamyrai44-ui-kit/components-lib';

type PropsType = {
  page: number;
  stepTitle: () => string;
  totalPages: number;
  // eslint-disable-next-line no-unused-vars
  handlePaginate: (action: 'next' | 'prev' | 'close') => void;
};

export const CreatePostHeader = (props: PropsType) => {
  const { stepTitle, page, handlePaginate, totalPages } = props;

  const paginate = (action: 'next' | 'prev' | 'close') => {
    switch (action) {
      case 'next': {
        if (page < totalPages - 1) {
          handlePaginate('next');
        }
        break;
      }

      case 'prev': {
        if (page > 0) {
          handlePaginate('prev');
        }
        break;
      }

      case 'close': {
        handlePaginate('close');
        break;
      }
    }
  };

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
        <Button
          variant={'ghost'}
          className={s.btn}
          aria-label={'Close window'}
          onClick={() => handlePaginate('close')}
        ></Button>
      )}

      {page != 0 && page < totalPages - 1 && (
        <Button variant={'ghost'} onClick={() => paginate('next')}>
          {'Next'}
        </Button>
      )}

      {page === 3 && (
        <Button variant={'ghost'} onClick={() => alert('Publish')}>
          {'Publish'}
        </Button>
      )}
    </div>
  );
};
