'use client';

import { ContentSection } from '@/shared/ui/content-section/ContentSection';
import Image from 'next/image';
import notFound from '../../../../public/images/404.png';
import s from './NotFoundContent.module.scss';
import { useTranslations } from 'next-intl';

export const NotFoundContent = () => {
  const t = useTranslations('Errors');

  const content = (
    <div className={s['image-container']}>
      <Image src={notFound} alt={'404 not found'} height={288} width={677} placeholder={'blur'} />
    </div>
  );
  return <ContentSection title={t('404')} content={content} />;
};
