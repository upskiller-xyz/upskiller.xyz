import React from 'react';
import { SectionTheme } from '@shared/types';

interface SectionProps {
  id: string;
  theme: SectionTheme;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, theme, children }) => (
  <section id={id} className={`section-container section-${theme}`}>
    <div className="section-content">
      {children}
    </div>
  </section>
);

export default Section;