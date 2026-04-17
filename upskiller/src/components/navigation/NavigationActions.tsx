import React from 'react';
import { MenuIcon } from '../svg';

export const NavigationActions: React.FC = () => {
  return (
    <div className="navigation-actions">
      <div className="mobile-menu-button">
        <button className="mobile-menu-button">
          <MenuIcon />
        </button>
      </div>
    </div>
  );
};