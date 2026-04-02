import React from 'react';

interface NewsCardHeaderProps {
  title: string;
  description: string;
}

export const NewsCardHeader: React.FC<NewsCardHeaderProps> = ({
  title,
  description
}) => (
  <div className="flex flex-col gap-6">
    <h3 className="info-card-title font-bold text-dark text-3xl">
      {title}
    </h3>
    <p className="info-card-subtitle text-dark leading-relaxed">
      {description}
    </p>
  </div>
);