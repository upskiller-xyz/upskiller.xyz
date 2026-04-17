// src/components/sections/TeamSection.tsx
import React, { useState, useEffect } from 'react';
import Section from '../shared-components/Section';
import SectionHeader from '../shared-components/SectionHeader';
import Reveal from '../shared-components/Reveal';
import TeamContentArea from '../sections-components/team/TeamContentArea';
import TeamTabs from '../sections-components/team/TeamTabs';
import { TeamMember, TeamTab } from '@shared/types';
import { fetchJsonWithFallback } from '../../utils/fetchWithFallback';
import AssetPathManager from '../../utils/AssetPathManager';

const TeamSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('team');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [originalTab, setOriginalTab] = useState('team');

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const data = await fetchJsonWithFallback(
          AssetPathManager.getDynamicData('team.json'),
          '/dynamic/team.json'
        );
        setTeamMembers(data.teamMembers);
      } catch (error) {
        console.error('Error loading team data:', error);
      }
    };

    fetchTeamData();
  }, []);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setOriginalTab(tabId);
  };

  const handleMemberHover = (memberId: string | null) => {
    if (memberId) {
      // Switch to the hovered member's tab
      setActiveTab(memberId);
    } else {
      // Return to the originally selected tab
      setActiveTab(originalTab);
    }
  };

  const tabs: TeamTab[] = teamMembers.map(member => ({
    id: member.id,
    label: member.name
  }));

  const currentMember = teamMembers.find(member => member.id === activeTab);

  return (
    <Section id="team" theme="secondary">
      <SectionHeader
        content={{
          title: "Team",
          theme: 'dark'
        }}
      />

      <Reveal>
        <TeamContentArea
          currentMember={currentMember}
          onMemberHover={handleMemberHover}
        />

        <TeamTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </Reveal>
    </Section>
  );
};

export default TeamSection;
