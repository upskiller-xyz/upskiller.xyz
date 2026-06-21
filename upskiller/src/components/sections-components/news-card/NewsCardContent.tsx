import React from 'react';
import { NewsCardHeader } from './NewsCardHeader';
import { NewsItemList } from './NewsItemList';

interface NewsItemData {
  id: number;
  title: string;
  description: string;
  date: string;
  url: string;
}

interface NewsCardContentProps {
  title: string;
  description: string;
  newsItems: NewsItemData[];
  formatDate: (dateString: string) => string;
}

export const NewsCardContent: React.FC<NewsCardContentProps> = ({
  title,
  description,
  newsItems,
  formatDate
}) => (
  <div className="news-card-content">
    <NewsCardHeader
      title={title}
      description={description}
    />

    <div className="news-card-scroll">
      <NewsItemList
        items={newsItems}
        formatDate={formatDate}
      />
    </div>
  </div>
);
