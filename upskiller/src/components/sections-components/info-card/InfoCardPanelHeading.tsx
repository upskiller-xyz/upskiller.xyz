import React from 'react';

interface InfoCardPanelHeadingProps {
  label: string;
}

export const InfoCardPanelHeading: React.FC<InfoCardPanelHeadingProps> = ({
  label
}) => (
  <h4 className="info-card-panel-heading font-bold text-dark">
    {label}
  </h4>
);
