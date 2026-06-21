import React from 'react';
import { ContentTheme } from '@shared/types';

interface ContentTitleProps {
  title: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  theme?: ContentTheme;
}

const ContentTitle: React.FC<ContentTitleProps> = ({
  title,
  level = 3,
  className = '',
  theme = ContentTheme.Dark
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const baseClasses = 'font-bold';

  const themeClasses: Record<ContentTheme, string> = {
    [ContentTheme.Light]: 'text-light',
    [ContentTheme.Dark]: 'text-dark',
    [ContentTheme.Contact]: 'contact-us-title'
  };
  
  const sizeClasses = {
    1: 'text-4xl',
    2: 'text-3xl', 
    3: 'text-2xl',
    4: 'text-xl',
    5: 'text-lg',
    6: 'text-base'
  };

  const finalClasses = `${baseClasses} ${themeClasses[theme]} ${sizeClasses[level]} ${className}`;

  return <Tag className={`${finalClasses} automate-font`}>{title}</Tag>;
};

export default ContentTitle;