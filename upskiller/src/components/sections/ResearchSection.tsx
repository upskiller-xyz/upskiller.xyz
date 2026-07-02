import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfoCard } from '../sections-components/info-card/InfoCard';
import { InfoCardButton } from '../sections-components/info-card/InfoCardButton';
import Section from '../shared-components/Section';
import SectionHeader from '../shared-components/SectionHeader';
import Reveal from '../shared-components/Reveal';
import { ResearchArticle, SectionTheme, ContentTheme } from '@shared/types';
import { fetchJsonWithFallback } from '../../utils/fetchWithFallback';
import AssetPathManager from '../../utils/AssetPathManager';
import { useSectionHeader } from '../../hooks/useSectionHeader';

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
  const header = useSectionHeader('research');

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
    <Section id="research" theme={SectionTheme.Secondary}>
      <div className="section-content">
        <SectionHeader
          content={{
            title: header?.title ?? '',
            subtitle: header?.subtitle,
            theme: ContentTheme.Dark
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <Reveal key={article.id} index={index}>
              <InfoCard
                content={{
                  title: article.title,
                  subtitle: `${article.category} · ${formatDate(article.date)}`,
                  icon: <img src={article.image} alt={article.title} loading="lazy" />,
                }}
                config={{
                  className: `transition-all duration-300 cursor-pointer${article.linkUrl ? ' info-card-link' : ''}`,
                  onClick: () => {
                    if (article.linkUrl) {
                      window.open(article.linkUrl, '_blank', 'noopener,noreferrer');
                    } else {
                      navigate(`/research#${article.slug}`);
                    }
                  },
                }}
              />
            </Reveal>
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
