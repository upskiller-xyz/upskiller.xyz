import React from 'react';
import { NewsItem } from './NewsItem';

interface NewsItemData {
  id: number;
  title: string;
  description: string;
  date: string;
  url: string;
}

interface NewsItemsListProps {
  items: NewsItemData[];
}

export const NewsItemsList: React.FC<NewsItemsListProps> = ({
  items
}) => (
  <div className="space-y-8">
    {items.map((item) => (
      <NewsItem key={item.id} {...item} />
    ))}
  </div>
);
