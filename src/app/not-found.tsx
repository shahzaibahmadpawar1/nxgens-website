'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <main className="flex-grow flex flex-col items-center justify-center text-center" style={{ minHeight: '60vh', padding: '120px 20px' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '1rem' }}>
        404
      </h1>
      <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--gray-800)', marginBottom: '1rem' }}>
        {t('Page Not Available', 'الصفحة غير متوفرة')}
      </h2>
      <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
        {t('The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.', 'ربما تمت إزالة الصفحة التي تبحث عنها، أو تم تغيير اسمها، أو أنها غير متاحة مؤقتاً.')}
      </p>
      <Link href="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 24px', background: 'var(--orange)', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
        {t('Return to Homepage', 'العودة للصفحة الرئيسية')}
      </Link>
    </main>
  );
}
