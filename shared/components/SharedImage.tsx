import React from 'react';

interface SharedImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

export const SharedImage: React.FC<SharedImageProps> = ({
  src,
  alt,
  className = '',
  onClick
}) => {
  const Component = onClick ? 'button' : 'div';
  
  return (
    <Component
      onClick={onClick}
      className={onClick ? 'transition-opacity duration-200 hover:opacity-80 cursor-pointer' : ''}
    >
      <img
        src={src}
        alt={alt}
        className={className}
      />
    </Component>
  );
};