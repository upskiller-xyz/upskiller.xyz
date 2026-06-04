import React, { useState, useEffect } from 'react';
import Section from '../shared-components/Section';
import SectionHeader from '../shared-components/SectionHeader';
import PartnersGrid from '../sections-components/partners/PartnersGrid';
import { Partner, SectionTheme, ContentTheme } from '@shared/types';
import { fetchJsonWithFallback } from '../../utils/fetchWithFallback';
import AssetPathManager from '../../utils/AssetPathManager';

const SupportSection: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const data = await fetchJsonWithFallback(
          AssetPathManager.getDynamicData('partners.json'),
          '/dynamic/partners.json'
        );
        setPartners(data.partners);
      } catch (error) {
        console.error('Error loading partners:', error);
      }
    };

    fetchPartners();
  }, []);
  return (
    <Section id="support" theme={SectionTheme.Support}>
      <SectionHeader
        content={{
          title: "Trusted by",
          theme: ContentTheme.Dark
        }}
      />
      
      <PartnersGrid partners={partners} />
    </Section>
  );
};

export default SupportSection;