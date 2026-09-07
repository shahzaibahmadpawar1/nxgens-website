'use client';

import React, { createContext, useContext, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface RecaptchaContextType {
  executeRecaptcha: () => Promise<string | null | undefined>;
}

const RecaptchaContext = createContext<RecaptchaContextType | undefined>(undefined);

export const RecaptchaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const executeRecaptcha = async () => {
    if (recaptchaRef.current) {
      const token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();
      return token;
    }
    return null;
  };

  return (
    <RecaptchaContext.Provider value={{ executeRecaptcha }}>
      {children}
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        badge="bottomright"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LfHKKktAAAAAOXOrtFliuRoBDnsndkgx3tWCsY1'}
      />
    </RecaptchaContext.Provider>
  );
};

export const useRecaptcha = () => {
  const context = useContext(RecaptchaContext);
  if (context === undefined) {
    throw new Error('useRecaptcha must be used within a RecaptchaProvider');
  }
  return context;
};
