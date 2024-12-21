'use client';

import { ContentSection } from '@/shared/ui/content-section/ContentSection';
import Image from 'next/image';
import notFound from '@/public/images/404.png';
import s from './NotFoundContent.module.scss';

export const NotFoundContent = () => {
  const content = (
    <div className={s['image-container']}>
      <Image src={notFound} alt={'404 not found'} height={288} width={677} />
    </div>
  );
  return <ContentSection title={'Sorry! Page not found!'} content={content} />;
};
