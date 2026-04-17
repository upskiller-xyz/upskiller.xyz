import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfoCard } from '../sections-components/info-card/InfoCard';
import { InfoCardButton } from '../sections-components/info-card/InfoCardButton';
import Section from '../shared-components/Section';
import SectionHeader from '../shared-components/SectionHeader';
import { ResearchArticle } from '../../../../shared/types/research.types';
import { fetchJsonWithFallback } from '../../utils/fetchWithFallback';
import AssetPathManager from '../../utils/AssetPathManager';

const FEATURED_COUNT = 2;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const ResearchSection: React.FC = () => {
  const [articles, setArticles] = useState<ResearchArticle[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const data = await fetchJsonWithFallback(
          AssetPathManager.getDynamicData('research.json'),
          '/dynamic/research.json'
        );
        setArticles(data.articles.slice(0, FEATURED_COUNT));
      } catch (error) {
        console.error('Error loading research:', error);
      }
    };

    fetchResearch();
  }, []);

  const handleViewAll = () => {
    navigate('/research');
  };

  return (
    <Section id="research" theme="secondary">
      <div className="section-content">
        <SectionHeader
          content={{
            title: "Research",
            subtitle: "Open tools from active research. Free to use, built to last.",
            theme: 'dark'
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {articles.map((article) => (
            <InfoCard
              key={article.id}
              content={{
                title: article.title,
                subtitle: `${article.category} · ${formatDate(article.date)}`,
                icon: <img src={article.image} alt={article.title} loading="lazy" />,
              }}
              config={{
                className: 'transition-all duration-300 cursor-pointer',
                onClick: () => navigate(`/research#${article.slug}`),
              }}
            />
          ))}
        </div>

        <div className="research-view-all">
          <InfoCardButton
            text="View all research"
            onClick={handleViewAll}
          />
        </div>
      </div>
    </Section>
  );
};

export default ResearchSection;
