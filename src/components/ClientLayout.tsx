'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { RecaptchaProvider } from '@/context/RecaptchaContext';

export const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isComingSoon = pathname === '/coming-soon';

  return (
    <RecaptchaProvider>
      {!isComingSoon && <Navbar />}
      {children}
      {!isComingSoon && <Footer />}
      {!isComingSoon && <WhatsAppFloat />}
    </RecaptchaProvider>
  );
};
