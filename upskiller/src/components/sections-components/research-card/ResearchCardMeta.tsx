import React from 'react';

interface ResearchCardMetaProps {
  category: string;
  date: string;
}

export const ResearchCardMeta: React.FC<ResearchCardMetaProps> = ({ category, date }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="research-card-meta">
      <span className="research-card-category">{category}</span>
      <span className="research-card-date">{formattedDate}</span>
    </div>
  );
};
