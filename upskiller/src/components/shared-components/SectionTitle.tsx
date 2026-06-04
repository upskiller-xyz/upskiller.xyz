import React from 'react';
import { ContentTheme } from '@shared/types';

interface SectionTitleProps {
  children: React.ReactNode;
  theme?: ContentTheme;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  theme = ContentTheme.Dark,
  className = ''
}) => (
  <h2 className={`section-title section-title-${theme} automate-font ${className}`}>
    {children}
  </h2>
);

export default SectionTitle;