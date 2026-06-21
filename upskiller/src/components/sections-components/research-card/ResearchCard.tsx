import React from 'react';
import { ResearchArticle } from '../../../../../shared/types/research.types';
import { ResearchCardImage } from './ResearchCardImage';
import { ResearchCardMeta } from './ResearchCardMeta';

interface ResearchCardProps {
  article: ResearchArticle;
  onClick?: (article: ResearchArticle) => void;
}

export const ResearchCard: React.FC<ResearchCardProps> = ({ article, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(article);
    }
  };

  return (
    <article
      className="research-card"
      onClick={handleClick}
    >
      <ResearchCardImage src={article.image} alt={article.title} />
      <div className="research-card-body">
        <h3 className="research-card-title">{article.title}</h3>
        <ResearchCardMeta category={article.category} date={article.date} />
      </div>
    </article>
  );
};
