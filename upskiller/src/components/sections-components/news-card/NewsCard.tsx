import React, { useState, useEffect } from 'react';
import { LoadingState } from '../../loading/LoadingState';
import { ErrorState } from '../../loading/ErrorState';
import { NewsCardContent } from './NewsCardContent';
import { fetchJsonWithFallback } from '../../../utils/fetchWithFallback';
import AssetPathManager from '../../../utils/AssetPathManager';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  url: string;
}

interface NewsCardProps {
  title?: string;
  description?: string;
  className?: string;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  title = "News",
  description = "Stay updated with our latest announcements and company developments",
  className = ''
}) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data: NewsItem[] = await fetchJsonWithFallback(
          AssetPathManager.getDynamicData('news.json'),
          '/dynamic/news.json'
        );
        setNewsItems(data);
        setLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        console.error('News fetch error:', errorMessage);
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <LoadingState
        message="Loading news..."
        className={className}
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        error={error}
        className={className}
      />
    );
  }

  return (
    <div
      className={`news-card transition-all duration-300 ${className}`}
    >
      <NewsCardContent
        title={title}
        description={description}
        newsItems={newsItems}
        formatDate={formatDate}
      />
    </div>
  );
};
