import React, { useState, useEffect } from 'react';
import { ContactMethod } from '@shared/types';
import { DataFetchService } from '../../services/DataFetchService';
import { DataFile } from '../../constants/data-files.enums';
import ContactGrid from './ContactGrid';

const ContactUsContent: React.FC = () => {
  const [contactMethods, setContactMethods] = useState<ContactMethod[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await DataFetchService.fetchData<{ contactMethods: ContactMethod[] }>(DataFile.CONTACTS);
        setContactMethods(data.contactMethods);
      } catch (error) {
        console.error('Error loading contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="contact-us-content">
      {/* <ContentTitle title="Contact Us" theme="contact" /> */}
      <ContactGrid contactMethods={contactMethods} />
    </div>
  );
};

export default ContactUsContent;