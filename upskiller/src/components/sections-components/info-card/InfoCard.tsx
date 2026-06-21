import React from 'react';
import { ProductContent } from '../../../../../shared/types/product.types';
import { ButtonBase } from '../../../../../shared/types/button.types';
import { InfoCardTitle } from './InfoCardTitle';
import { InfoCardSubtitle } from './InfoCardSubtitle';
import { InfoCardTitleText } from './InfoCardTitleText';
import { InfoCardDescription } from './InfoCardDescription';
import { InfoCardItemsPanel } from './InfoCardItemsPanel';
import { InfoCardContent } from './InfoCardContent';
import { InfoCardImage } from './InfoCardImage';
import { InfoCardButton } from './InfoCardButton';

interface InfoCardContentData extends Partial<ProductContent> {
  title?: string;
  name?: string;
  solution?: string;
  descriptionLabel?: string;
  icon?: React.ReactNode;
  items?: string[];
  itemsLabel?: string;
}

interface InfoCardConfig {
  className?: string;
  onClick?: () => void;
}

interface InfoCardProps {
  content: InfoCardContentData;
  button?: ButtonBase;
  config?: InfoCardConfig;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  content,
  button,
  config = {}
}) => {
  const {
    title,
    name,
    subtitle,
    solution,
    description,
    descriptionLabel,
    icon,
    items,
    itemsLabel = "Key Features:",
    features
  } = content;
  
  
  const displayTitle = title || name || '';
  const displayItems = items || features || [];

  const {
    text: buttonText,
    disabled: buttonDisabled = false,
    show: showButton = true,
    onClick: onButtonClick
  } = button || {};

  const {
    className = '',
    onClick
  } = config;

  return (
    <div 
      className={`info-card ${className}`}
      onClick={onClick}
    >
      {/* Image (optional) */}
      {icon && (
        <InfoCardImage>
          {icon}
        </InfoCardImage>
      )}
      
      {/* Title */}
      <InfoCardTitle title={displayTitle} />
      {subtitle && <InfoCardSubtitle subtitle={subtitle} />}
      
      {/* Content */}
      <InfoCardContent>
        {/* Solution element */}
        {solution && (
          <InfoCardTitleText title="Solution" text={solution} />
        )}
        
        {/* Description element */}
        {description && (
          <InfoCardDescription 
            description={description}
            label={descriptionLabel}
          />
        )}
        
        {/* Key Features element */}
        {displayItems && displayItems.length > 0 && (
          <InfoCardItemsPanel items={displayItems} label={itemsLabel} />
        )}
      </InfoCardContent>
      
      {/* Button (optional) */}
      {showButton && buttonText && (
        <InfoCardButton
          text={buttonText}
          disabled={buttonDisabled}
          onClick={onButtonClick}
        />
      )}
    </div>
  );
};
