import React, { useState, useEffect } from 'react';
import TeamStoryParagraph from '../../shared-subcomponents/TeamStoryParagraph';
import TeamStoryLink from '../../shared-subcomponents/TeamStoryLink';
import { LoadingStory } from '../../loading';
import { DataFetchService } from '../../../services/DataFetchService';
import { DataFile } from '../../../constants/data-files.enums';
import { TeamStoryData, TeamStoryType, TeamStoryParagraph as StoryParagraph } from '../../../constants/team-story.enums';

const TeamStoryContent: React.FC = () => {
  const [storyData, setStoryData] = useState<TeamStoryData | null>(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const data = await DataFetchService.fetchData<TeamStoryData>(DataFile.TEAM_STORY);
        setStoryData(data);
      } catch (error) {
        console.error('Error loading team story:', error);
      }
    };

    fetchStory();
  }, []);

  const renderParagraph = (para: StoryParagraph, idx: number) => {
    if (para.type === TeamStoryType.TEXT) {
      return (
        <TeamStoryParagraph key={idx}>
          {para.content}
        </TeamStoryParagraph>
      );
    }

    if (para.type === TeamStoryType.MIXED) {
      return (
        <TeamStoryParagraph key={idx}>
          {para.content}
          {para.links?.map((link, linkIdx) => (
            <TeamStoryLink key={linkIdx} href={link.href}>
              {link.text}
            </TeamStoryLink>
          ))}
          {para.continuation}
          {para.moreLinks?.map((link, linkIdx) => (
            <TeamStoryLink key={`more-${linkIdx}`} href={link.href}>
              {link.text}
            </TeamStoryLink>
          ))}
          {para.continuation2}
          {para.finalLinks?.map((link, linkIdx) => (
            <TeamStoryLink key={`final-${linkIdx}`} href={link.href}>
              {link.text}
            </TeamStoryLink>
          ))}
          {para.end}
        </TeamStoryParagraph>
      );
    }

    return null;
  };

  if (!storyData) {
    return <LoadingStory />;
  }

  return (
    <>
      {storyData.story.map((para, idx) => renderParagraph(para, idx))}
    </>
  );
};

export default TeamStoryContent;