'use client';
import { useTranslations } from 'next-intl';
import s from './AddComentForm.module.scss';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import { useForm } from 'react-hook-form';

type Props = {
  // eslint-disable-next-line no-unused-vars
  onClick: (value: string) => void;
  isAnswer?: boolean;
};

export default function AddComentForm({ onClick, isAnswer }: Props) {
  const t = useTranslations('Post');

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
    reset
  } = useForm<{
    comment: string;
  }>({
    mode: 'onChange'
  });

  const onSubmit = (data: { comment: string }) => {
    onClick(data.comment);
    reset();
  };

  const commentValue = watch('comment') || '';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={!isAnswer ? s.addComent : s.addAnswer}>
      <input
        {...register('comment', {
          minLength: {
            value: 1,
            message: t('Comment.MinLength')
          },
          maxLength: {
            value: 300,
            message: t('Comment.MaxLength')
          }
        })}
        className={s.input}
        placeholder={t('AddComment')}
      />
      <Button type="submit" variant="ghost" disabled={!isValid || !commentValue.trim()}>
        {t('CreatePost.Publish')}
      </Button>
    </form>
  );
}
