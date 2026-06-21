import React from 'react';

interface TeamStoryParagraphProps {
  children: React.ReactNode;
}

const TeamStoryParagraph: React.FC<TeamStoryParagraphProps> = ({ children }) => {
  return (
    <p className="team-paragraph">
      {children}
    </p>
  );
};

export default TeamStoryParagraph;