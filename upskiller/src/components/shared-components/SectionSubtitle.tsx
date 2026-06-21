import React from 'react';
import { ContentTheme } from '@shared/types';

interface SectionSubtitleProps {
  children: React.ReactNode;
  theme?: ContentTheme;
  className?: string;
}

const SectionSubtitle: React.FC<SectionSubtitleProps> = ({
  children,
  theme = ContentTheme.Dark,
  className = ''
}) => (
  <p className={`section-subtitle section-subtitle-${theme} ${className}`}>
    {children}
  </p>
);

export default SectionSubtitle;