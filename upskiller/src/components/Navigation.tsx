// src/components/Navigation.tsx
import React, { useState, useEffect } from 'react';
import { EventType, ScrollBehavior, SectionId } from '../constants/enums';
import { NavigationLogo } from './navigation/NavigationLogo';
import { NavigationLinks } from './navigation/NavigationLinks';
import { NavigationActions } from './navigation/NavigationActions';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position using Map pattern
      const sectionsMap = new Map([
        [SectionId.HOME, 'home'],
        [SectionId.TEAM, 'team'],
        [SectionId.PRODUCTS, 'products'],
        [SectionId.RESOURCES, 'resources'],
        [SectionId.RESEARCH, 'research']
      ]);
      
      const scrollPosition = window.scrollY + 100;
      
      sectionsMap.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    window.addEventListener(EventType.SCROLL, handleScroll);
    return () => window.removeEventListener(EventType.SCROLL, handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: ScrollBehavior.SMOOTH });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-12 flex items-center">
      <div className="nav-container max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <NavigationLogo scrollToSection={scrollToSection} />
          <NavigationLinks 
            isScrolled={isScrolled}
            activeSection={activeSection}
            scrollToSection={scrollToSection}
          />
          <NavigationActions scrollToSection={scrollToSection} />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;