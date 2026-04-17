import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AssetPathManager from '../../utils/AssetPathManager';
import { ScrollBehavior } from '../../constants/enums';

export const NavigationLogo: React.FC = () => {
  const location = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: ScrollBehavior.SMOOTH });
    }
  };

  return (
    <Link to="/" onClick={handleClick}>
      <img
        src={AssetPathManager.getNavigationLogo()}
        alt="Upskiller"
        className="h-8 w-auto"
      />
    </Link>
  );
};