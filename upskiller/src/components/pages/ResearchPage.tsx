import React, { useState, useEffect, useMemo } from 'react';
import Navigation from '../Navigation';
import PageFooter from '../shared-components/PageFooter';
import { InfoCard } from '../sections-components/info-card/InfoCard';
import { ResearchArticle, ResearchData } from '../../../../shared/types/research.types';
import { fetchJsonWithFallback } from '../../utils/fetchWithFallback';
import AssetPathManager from '../../utils/AssetPathManager';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

type SortOption = 'newest' | 'oldest';

const ResearchPage: React.FC = () => {
  const [data, setData] = useState<ResearchData | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const result = await fetchJsonWithFallback(
          AssetPathManager.getDynamicData('research.json'),
          '/dynamic/research.json'
        );
        setData(result);
      } catch (error) {
        console.error('Error loading research:', error);
      }
    };

    fetchResearch();
  }, []);

  const filteredArticles = useMemo(() => {
    if (!data) return [];

    let articles = data.articles;

    if (activeCategory !== 'All') {
      articles = articles.filter(a => a.category === activeCategory);
    }

    return articles.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [data, activeCategory, sortBy]);

  const handleArticleClick = (article: ResearchArticle) => {
    if (article.linkUrl) {
      window.open(article.linkUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const toggleSort = () => {
    setSortBy(prev => prev === 'newest' ? 'oldest' : 'newest');
  };

  if (!data) {
    return (
      <div className="research-page">
        <Navigation />
        <main className="research-page-content">
          <div className="research-page-loading">Loading...</div>
        </main>
        <PageFooter />
      </div>
    );
  }

  return (
    <div className="research-page">
      <Navigation />
      <main className="research-page-content">
        <h1 className="research-page-title">Research</h1>

        <div className="research-toolbar">
          <div className="research-categories">
            {data.categories.map((category) => (
              <button
                key={category}
                className={`research-category-tab ${
                  activeCategory === category ? 'research-category-active' : ''
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="research-toolbar-actions">
            <button className="research-sort-button" onClick={toggleSort}>
              Sort {sortBy === 'newest' ? '↓' : '↑'}
            </button>
          </div>
        </div>

        <div className="research-grid-3col">
          {filteredArticles.map((article) => (
            <InfoCard
              key={article.id}
              content={{
                title: article.title,
                subtitle: `${article.category} · ${formatDate(article.date)}`,
                icon: <img src={article.image} alt={article.title} loading="lazy" />,
              }}
              config={{
                className: 'transition-all duration-300 cursor-pointer info-card-link',
                onClick: () => handleArticleClick(article),
              }}
            />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <p className="research-empty">No articles found in this category.</p>
        )}
      </main>
      <PageFooter />
    </div>
  );
};

export default ResearchPage;
