'use client';

import s from './PostMenu.module.scss';
import EditOutline from '../../../../../../../../../public/icons/editOutline.svg';
import TrashOutline from '../../../../../../../../../public/icons/trashOutline.svg';
import { useTranslations } from 'next-intl';

/* eslint-disable no-unused-vars */
type Props = {
  setMenuIsOpen: (menuIsOpen: boolean) => void;
  onEditClickAction: () => void;
  onDeleteClickAction: () => void;
};

export default function PostMenu({ setMenuIsOpen, onEditClickAction, onDeleteClickAction }: Props) {
  const t = useTranslations('Post');

  const onEditClickHandler = () => {
    onEditClickAction();
    setMenuIsOpen(false);
  };
  const onDeleteClickHandler = () => {
    onDeleteClickAction();
    setMenuIsOpen(false);
  };

  return (
    <div className={s.menu}>
      <div className={s.menuItem} onClick={onEditClickHandler}>
        <EditOutline />
        <span>{t('EditPost')}</span>
      </div>
      <div className={s.menuItem} onClick={onDeleteClickHandler}>
        <TrashOutline />
        <span>{t('DeletePost')}</span>
      </div>
    </div>
  );
}
