import { PublishedPostResponse } from '@/features/posts/model/postsApi.types';
import s from './EditPostContent.module.scss';
import { Author } from './author/Author';
import { Button, Textarea } from '@internshipsamyrai44-ui-kit/components-lib';
import { ChangeEvent, useState } from 'react';
import { useUpdatePostMutation } from '@/features/posts/api/postsApi';
import { useTranslations } from 'next-intl';
type Props = {
  post: PublishedPostResponse;
  closeModal?: () => void;
};

const DESCRIPTION_MAX_LENGHT = 500;

export const EditPostContent = ({ closeModal, post }: Props) => {
  const t = useTranslations('Post');
  const [description, setDescription] = useState('');

  const [saveChanges, { isLoading }] = useUpdatePostMutation();

  const handleChangeTextarea = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    const text = ev.currentTarget.value;
    if (text.length <= DESCRIPTION_MAX_LENGHT) setDescription(text);
  };

  const handleSaveChanges = () => {
    saveChanges({ postId: post.id, description })
      .unwrap()
      .then(() => closeModal?.());
  };

  return (
    <div className={s.content}>
      <Author post={post} />
      <div className={s.textarea}>
        <span className={s.title}>{t('Edit.AddPublicationDescriptions')}</span>
        <Textarea value={description} onChange={handleChangeTextarea} className={s.textarea} />
        <span className={s.counter}>
          {description.length}/{DESCRIPTION_MAX_LENGHT}
        </span>
      </div>
      <Button className={s.saveBtn} onClick={handleSaveChanges} disabled={!description || isLoading}>
        {t('Edit.SaveChanges')}
      </Button>
    </div>
  );
};
