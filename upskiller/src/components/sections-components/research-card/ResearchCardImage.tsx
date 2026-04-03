import React from 'react';

interface ResearchCardImageProps {
  src: string;
  alt: string;
}

export const ResearchCardImage: React.FC<ResearchCardImageProps> = ({ src, alt }) => (
  <div className="research-card-image">
    <img src={src} alt={alt} loading="lazy" />
  </div>
);
