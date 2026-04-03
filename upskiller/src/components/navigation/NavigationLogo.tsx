import React from 'react';
import { Link } from 'react-router-dom';
import AssetPathManager from '../../utils/AssetPathManager';

interface NavigationLogoProps {
  scrollToSection: (sectionId: string) => void;
}

export const NavigationLogo: React.FC<NavigationLogoProps> = () => {
  return (
    <Link to="/">
      <img
        src={AssetPathManager.getNavigationLogo()}
        alt="Upskiller"
        className="h-8 w-auto"
      />
    </Link>
  );
};