'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { COMPANY_PROFILE_FILENAME, COMPANY_PROFILE_HREF } from '@/lib/companyProfile';

type Variant = 'hero' | 'cta' | 'contact';

interface CompanyProfileActionsProps {
  variant?: Variant;
  className?: string;
  style?: React.CSSProperties;
}

export const CompanyProfileActions: React.FC<CompanyProfileActionsProps> = ({
  variant = 'hero',
  className,
  style,
}) => {
  const { t } = useLanguage();

  const downloadLabel = t('Download Company Profile', 'تحميل ملف الشركة');

  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 28px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'var(--transition)',
    cursor: 'pointer',
  };

  let downloadStyle: React.CSSProperties;

  if (variant === 'cta') {
    downloadStyle = {
      ...base,
      background: 'white',
      color: 'var(--orange)',
      border: '2px solid white',
      fontWeight: 700,
    };
  } else {
    // hero / contact — dark navy backgrounds
    downloadStyle = {
      ...base,
      background: 'var(--orange)',
      color: 'white',
      border: 'none',
    };
  }

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        ...style,
      }}
    >
      <a
        href={COMPANY_PROFILE_HREF}
        download={COMPANY_PROFILE_FILENAME}
        style={downloadStyle}
        onMouseOver={(e) => {
          if (variant === 'cta') {
            e.currentTarget.style.background = 'rgba(255,255,255,0.92)';
          } else {
            e.currentTarget.style.background = 'var(--orange-light)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }
        }}
        onMouseOut={(e) => {
          if (variant === 'cta') {
            e.currentTarget.style.background = 'white';
          } else {
            e.currentTarget.style.background = 'var(--orange)';
            e.currentTarget.style.transform = 'none';
          }
        }}
      >
        {downloadLabel}
      </a>
    </div>
  );
};
