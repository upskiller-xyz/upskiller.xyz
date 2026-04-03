import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SectionId } from '../../constants/enums';

interface NavigationLinksProps {
  isScrolled: boolean;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export const NavigationLinks: React.FC<NavigationLinksProps> = ({
  isScrolled,
  activeSection,
  scrollToSection
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navItems = new Map([
    [SectionId.TEAM, 'Team'],
    [SectionId.PRODUCTS, 'Products'],
    [SectionId.RESEARCH, 'Research'],
    [SectionId.RESOURCES, 'Resources']
  ]);

  const handleClick = (sectionId: string) => {
    if (sectionId === SectionId.RESEARCH) {
      if (isHomePage) {
        scrollToSection(sectionId);
      } else {
        navigate('/research');
      }
    } else if (isHomePage) {
      scrollToSection(sectionId);
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <div className={`navigation-links ${
       'bg-transparent'
    }`}>
      {Array.from(navItems.entries()).map(([sectionId, label]) => (
        <button
          key={sectionId}
          onClick={() => handleClick(sectionId)}
          className={`transition-colors duration-200 cursor-pointer navigation-link-text ${
            activeSection === sectionId
              ? 'font-medium'
              : 'hover:opacity-80'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};