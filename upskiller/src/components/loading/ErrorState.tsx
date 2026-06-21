import React from 'react';

interface ErrorStateProps {
  error: string;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  className = ''
}) => (
  <div
    className={`news-card transition-all duration-300 bg-[var(--color-secondary)] ${className}`}
  >
    <div className="news-card-content flex items-center justify-center">
      <div className="text-dark">Error loading news: {error}</div>
    </div>
  </div>
);