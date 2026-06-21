import React, { useState, useEffect } from 'react';
import SocialLinkGrid from './SocialLinkGrid';
import { DataFetchService } from '../../services/DataFetchService';
import { DataFile } from '../../constants/data-files.enums';

interface SocialLinkData {
  name: string;
  url: string;
  icon: string;
}

const FollowUs: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLinkData[]>([]);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const data = await DataFetchService.fetchData<{ socialLinks: SocialLinkData[] }>(DataFile.SOCIAL_LINKS);
        setSocialLinks(data.socialLinks);
      } catch (error) {
        console.error('Error loading social links:', error);
      }
    };

    fetchSocialLinks();
  }, []);

  return (
    <div className="follow-us-section">
      <SocialLinkGrid socialLinks={socialLinks} />
    </div>
  );
};

export default FollowUs;