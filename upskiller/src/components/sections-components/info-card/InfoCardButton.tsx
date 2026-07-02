import React from 'react';
import { SharedButton } from '@shared/components';

interface InfoCardButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const InfoCardButton: React.FC<InfoCardButtonProps> = ({
  text,
  disabled = false,
  onClick
}) => (
  <div className={`info-card-button-area info-card-button-wrapper ${disabled ? 'disabled' : ''}`}>
    <SharedButton
      appearance={{ variant: "product", className: "w-full", size: "md" }}
      behavior={{ onClick, disabled }}
    >
      {text}
    </SharedButton>
  </div>
);