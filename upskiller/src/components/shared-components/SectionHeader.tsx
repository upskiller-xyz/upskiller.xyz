import React from 'react';
import { ContentTheme } from '@shared/types';
import SectionTitle from './SectionTitle';
import SectionSubtitle from './SectionSubtitle';

interface SectionHeaderContent {
  title: string;
  subtitle?: string;
  theme?: ContentTheme;
}

interface SectionHeaderProps {
  content: SectionHeaderContent;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  content, 
  className = '' 
}) => (
  <div className={`section-header section-header-spacing ${className}`}>
    <SectionTitle theme={content.theme}>
      {content.title}
    </SectionTitle>
    {content.subtitle && (
      <SectionSubtitle theme={content.theme}>
        {content.subtitle}
      </SectionSubtitle>
    )}
  </div>
);

export default SectionHeader;