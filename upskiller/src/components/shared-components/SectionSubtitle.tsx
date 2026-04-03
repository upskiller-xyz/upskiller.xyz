import React from 'react';

interface SectionSubtitleProps {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
  className?: string;
}

const SectionSubtitle: React.FC<SectionSubtitleProps> = ({
  children,
  theme = 'dark',
  className = ''
}) => (
  <p className={`section-subtitle section-subtitle-${theme} ${className}`}>
    {children}
  </p>
);

export default SectionSubtitle;