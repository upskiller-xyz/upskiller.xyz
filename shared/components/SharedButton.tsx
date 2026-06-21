// shared/components/SharedButton.tsx
import React from "react";
import { ButtonAppearance, ButtonBehavior } from "../types/button.types";

export interface SharedButtonProps {
  children: React.ReactNode;
  appearance?: ButtonAppearance;
  behavior?: ButtonBehavior;
}

export function SharedButton({ 
  children, 
  appearance = {},
  behavior = {}
}: SharedButtonProps) {
  const { variant = 'primary', size = 'md', className = '' } = appearance;
  const { onClick, disabled = false } = behavior;
  const classes = `btn-base btn-${variant} btn-${size} ${disabled ? 'btn-disabled' : 'btn-enabled'} ${className}`;
  
  
  return (
    <button 
      className={classes} 
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={variant === 'contact' ? { 
        backgroundColor: disabled ? 'var(--color-secondary)' : 'var(--color-accent)'
      } : undefined}
    >
      {children}
    </button>
  );
}
