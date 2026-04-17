import React from 'react';
import { useReveal } from '../../hooks/useReveal';

interface RevealProps {
  children: React.ReactNode;
  index?: number;
  delayStep?: number;
  className?: string;
}

const Reveal: React.FC<RevealProps> = ({
  children,
  index = 0,
  delayStep = 120,
  className = '',
}) => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={{ transitionDelay: `${index * delayStep}ms` }}
    >
      {children}
    </div>
  );
};

export default Reveal;
