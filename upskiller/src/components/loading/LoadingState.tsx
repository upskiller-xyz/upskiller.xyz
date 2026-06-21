import React from 'react';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  className = ''
}) => (
  <div
    className={`news-card transition-all duration-300 bg-[var(--color-secondary)] ${className}`}
  >
    <div className="news-card-content flex items-center justify-center">
      <div className="text-dark">{message}</div>
    </div>
  </div>
);