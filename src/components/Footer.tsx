'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export const Footer: React.FC = () => {
  const { t, lang } = useLanguage();

  return (
    <footer>
      <div className="container">
        {/* Footer CTA */}
        <div className="footer-cta-block" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '32px', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'white', fontFamily: "'Barlow Condensed', sans-serif", margin: 0 }}>
              {t('Start Your Project Today', 'ابدأ مشروعك اليوم')}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginTop: '6px', margin: 0 }}>
              {t('Get in touch with our engineering team for a professional assessment and quote.', 'تواصل مع فريقنا الهندسي للحصول على تقييم وعرض سعر احترافي.')}
            </p>
          </div>
          <Link href="/contact" style={{ padding: '12px 28px', background: 'var(--orange)', color: 'white', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', transition: 'background 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.background = '#d55313'} onMouseOut={(e) => e.currentTarget.style.background = 'var(--orange)'}>
            {t('Get in Touch', 'تواصل معنا')}
          </Link>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo" style={{ marginBottom: '16px' }}>
              <img src="/logo.png" alt="NexGen Build logo" height="44" />
            </div>
            <p>
              {t(
                "Integrated construction and industrial fabrication solutions for Saudi Arabia's critical infrastructure.",
                'حلول متكاملة للبناء والتصنيع الصناعي للبنية التحتية الحيوية في المملكة العربية السعودية.'
              )}
            </p>
            <div className="footer-contact-info">
              <a href="mailto:contact@Nxgens.com">📧 contact@Nxgens.com</a>
              <a href="https://wa.me/966555123456" target="_blank" rel="noopener noreferrer">💬 +966-555-123-456</a>
              <a>📍 <span>{t('Dammam, Saudi Arabia (Jubail facilities)', 'الدمام، المملكة العربية السعودية (مرافقنا أيضاً في الجبيل)')}</span></a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4>{t('Quick Links', 'روابط سريعة')}</h4>
            <div className="footer-links">
              <Link href="/">{t('Home', 'الرئيسية')}</Link>
              <Link href="/about">{t('About Us', 'عن الشركة')}</Link>
              <Link href="/services">{t('Services', 'الخدمات')}</Link>
              <Link href="/workshop">{t('Workshop', 'الورشة')}</Link>
              <Link href="/fabrication-shop">{t('Fabrication Shop', 'ورشة التصنيع')}</Link>
              <Link href="/contact">{t('Contact', 'تواصل معنا')}</Link>
            </div>
          </div>
          
          <div className="footer-col">
            <h4>{t('Construction', 'البناء')}</h4>
            <div className="footer-links">
              <a href="/services#general">{t('General Construction', 'البناء العام')}</a>
              <a href="/services#electrical">{t('Electrical', 'كهرباء')}</a>
              <a href="/services#sanitary">{t('Sanitary', 'صحي')}</a>
              <a href="/services#hvac">{t('HVAC', 'تكييف وتهوية')}</a>
              <a href="/services#waterproofing">{t('Waterproofing', 'عزل مائي')}</a>
              <a href="/services#fire">{t('Fire Fighting', 'إطفاء حريق')}</a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4>{t('Industrial', 'صناعي')}</h4>
            <div className="footer-links">
              <a href="/workshop#laser-cutting">{t('CNC Laser Cutting', 'قطع ليزر')}</a>
              <a href="/workshop#machining">{t('CNC Machining', 'خراطة')}</a>
              <a href="/fabrication-shop">{t('Metal Fabrication', 'تصنيع معدني')}</a>
              <a href="/workshop#welding">{t('Welding', 'لحام')}</a>
              <a href="/workshop#maintenance">{t('Repair Services', 'خدمات الإصلاح')}</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
            <p style={{ margin: 0, fontSize: '15px', color: 'rgba(255,255,255,0.75)' }}>
              © 2026 <span>NexGen Build Company</span>. <span>{t('All rights reserved.', 'جميع الحقوق محفوظة.')}</span>
            </p>
            <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.45)', margin: '6px 0 0 0' }}>
              {t(
                'Saudi Aramco Vendor #10119021 | Saudi Energy Approved Supplier',
                'مورد أرامكو السعودية #10119021 | مورد معتمد لدى الطاقة السعودية'
              )}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
              {t('Developed by', 'تم التطوير بواسطة')}
            </span>
            <a href="https://nocastra.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <img 
                src="/nocastraLogo.png" 
                alt="Nocastra Logo" 
                style={{ 
                  height: '32px', 
                  width: 'auto', 
                  display: 'block',
                  filter: 'brightness(0) invert(1)',
                  opacity: 0.85,
                  transition: 'opacity 0.2s ease'
                }} 
                onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '0.85'}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
