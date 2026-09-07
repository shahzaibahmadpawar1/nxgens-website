'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { lang, setLang, t, isReady } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', labelEn: 'Home', labelAr: 'الرئيسية' },
    { href: '/about', labelEn: 'About Us', labelAr: 'عن الشركة' },
    { href: '/services', labelEn: 'Services', labelAr: 'الخدمات' },
    { href: '/workshop', labelEn: 'Workshop', labelAr: 'الورشة' },
    { href: '/fabrication-shop', labelEn: 'Fabrication Shop', labelAr: 'ورشة التصنيع' },
    { href: '/contact', labelEn: 'Contact', labelAr: 'تواصل معنا' },
  ];

  const getActiveCls = (href: string) => {
    if (href === '/') {
      return pathname === '/' ? 'active' : '';
    }
    return pathname.startsWith(href) ? 'active' : '';
  };

  const isDark = theme === 'dark';

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <Link className="logo" href="/">
            {/* Standard image tag to preserve EXACT sizing behavior from globals.css */}
            <img src="/logo.png" alt="NexGen Build logo" height="44" style={{ display: 'block', height: '44px', width: 'auto' }} />
          </Link>

          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={getActiveCls(link.href)}>
                  {t(link.labelEn, link.labelAr)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-right">
            <button
              type="button"
              className="theme-toggle"
              id="btn-theme"
              aria-pressed={isDark ? 'true' : 'false'}
              aria-label={t(
                isDark ? 'Switch to light mode' : 'Switch to dark mode',
                isDark ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'
              )}
              title="Theme"
              onClick={toggleTheme}
            >
              <svg className="icon-sun" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="12" cy="12" r="5" fill="currentColor" />
                <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <svg className="icon-moon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
              </svg>
            </button>

            <div className="lang-toggle">
              <button
                type="button"
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                id="btn-en"
                onClick={() => setLang('en')}
              >
                EN
              </button>
              <button
                type="button"
                className={`lang-btn ${lang === 'ar' ? 'active' : ''}`}
                id="btn-ar"
                onClick={() => setLang('ar')}
              >
                AR
              </button>
            </div>

            <Link className="btn-quote" href="/contact">
              {t('Get a Quote', 'طلب عرض سعر')}
            </Link>

            <div className={`hamburger ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(!mobileOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} id="mobileMenu">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className={getActiveCls(link.href)}>
            {t(link.labelEn, link.labelAr)}
          </Link>
        ))}

        <div className="mobile-lang">
          <button
            type="button"
            className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
            id="m-btn-en"
            onClick={() => setLang('en')}
          >
            EN
          </button>
          <button
            type="button"
            className={`lang-btn ${lang === 'ar' ? 'active' : ''}`}
            id="m-btn-ar"
            onClick={() => setLang('ar')}
          >
            AR
          </button>
        </div>

        <div className="mobile-theme">
          <span>{t('Theme', 'المظهر')}</span>
          <button
            type="button"
            className="theme-toggle"
            id="m-btn-theme"
            aria-pressed={isDark ? 'true' : 'false'}
            aria-label={t(
              isDark ? 'Switch to light mode' : 'Switch to dark mode',
              isDark ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'
            )}
            title="Theme"
            onClick={toggleTheme}
          >
            <svg className="icon-sun" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="12" cy="12" r="5" fill="currentColor" />
              <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <svg className="icon-moon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
