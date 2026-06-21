import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollBehavior } from '../constants/enums';

const ScrollToHash: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: ScrollBehavior.SMOOTH });
    });
  }, [hash]);

  return null;
};

export default ScrollToHash;
