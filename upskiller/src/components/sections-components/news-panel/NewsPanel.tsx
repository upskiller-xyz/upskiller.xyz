import React, { useState, useEffect } from 'react';
import { NewsPanelWrapper } from './NewsPanelWrapper';
import { NewsPanelHeading } from './NewsPanelHeading';
import { NewsItemsList } from './NewsItemsList';
import { NewsLoading } from '../loading/NewsLoading';
import { NewsError } from '../loading/NewsError';
import { fetchJsonWithFallback } from '../../../utils/fetchWithFallback';
import AssetPathManager from '../../../utils/AssetPathManager';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  url: string;
}

interface NewsPanelProps {
  title?: string;
  description?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const NewsPanel: React.FC<NewsPanelProps> = ({
  title = "News",
  description = "Stay updated with our latest announcements and company developments",
  className = '',
  style = {}
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
        setNewsItems(data.slice(0, 4));
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const finalStyle = { backgroundColor: 'var(--color-secondary)', ...style };

  if (loading) {
    return <NewsLoading className={className} style={finalStyle} />;
  }

  if (error) {
    return <NewsError error={error} className={className} style={finalStyle} />;
  }

  return (
    <NewsPanelWrapper className={className} style={finalStyle}>
      <NewsPanelHeading title={title} description={description} />
      <NewsItemsList items={newsItems} />
    </NewsPanelWrapper>
  );
};
