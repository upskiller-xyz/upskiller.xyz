// src/components/sections/ResourcesSection.tsx
import React, { useState, useEffect } from 'react';
import { InfoCard } from '../sections-components/info-card/InfoCard';
import { NewsCard } from '../sections-components/news-card/NewsCard'
import Section from '../shared-components/Section';
import SectionHeader from '../shared-components/SectionHeader';
import Reveal from '../shared-components/Reveal';
import ContactUs from '../sections-components/ContactUs';
import FollowUs from '../sections-components/FollowUs';
import { Product } from '@shared/types';
import { fetchJsonWithFallback } from '../../utils/fetchWithFallback';
import AssetPathManager from '../../utils/AssetPathManager';

const ResourcesSection: React.FC = () => {
  const [resources, setResources] = useState<Product[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await fetchJsonWithFallback(
          AssetPathManager.getDynamicData('resources.json'),
          '/dynamic/resources.json'
        );
        setResources(data.resources);
      } catch (error) {
        console.error('Error loading resources:', error);
      }
    };

    fetchResources();
  }, []);

  const getResourceIcon = (resourceName: string) => {
    // if (resourceName === 'Articles') {
    //   return <ArticlesIcon />;
    // }
    return null;
  };

  return (
    <Section id="resources" theme="primary">
      <div className="section-content">
        <SectionHeader
          content={{
            title: "Resources",
            theme: 'light'
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="flex flex-col gap-8">
        {resources.map((resource, index) => {
          const displayConfig = {
            descriptionLabel: "",
            itemsLabel: "What you'll find:",
            // icon: getResourceIcon(resource.content.name)
          };

          const buttonConfig = {
            text: resource.config.buttonText,
            show: true,
            onClick: () => window.open(resource.config.linkUrl, '_blank')
          };

          const cardConfig = {
            className: `transition-all duration-300 resource-${resource.config.id}`,
            style: (resource.config.id === 'articles' ? { '--resource-id': 'articles' } : {}) as React.CSSProperties
          };

          return (
            <Reveal key={resource.config.id} index={index}>
              <InfoCard
                content={{
                  ...resource.content,
                  title: resource.content.name,
                  items: resource.content.features,
                  ...displayConfig
                }}
                button={buttonConfig}
                config={cardConfig}
              />
            </Reveal>
          );
        })}
        </div>
        <Reveal index={1}>
          <NewsCard className="transition-all duration-300" />
        </Reveal>
        </div>

        <ContactUs />
        <FollowUs />
      </div>
    </Section>
  );
};

export default ResourcesSection;