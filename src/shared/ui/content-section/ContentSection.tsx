import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import React from 'react';
import s from './ContentSection.module.scss';

type ContentSectionType = {
  title: string;
  typographyContent?: React.ReactNode;
  content?: React.ReactNode;
};

export const ContentSection = ({ title, typographyContent, content }: ContentSectionType) => {
  return (
    <div className={s.container}>
      <Typography as={'h1'} variant={'h1'}>
        {title}
      </Typography>
      <Typography>{typographyContent}</Typography>
      {content}
    </div>
  );
};
