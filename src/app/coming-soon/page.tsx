'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import './coming-soon.css';

export default function ComingSoonPage() {
  const { t, lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  // Form states
  const [email, setEmail] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error' | ''>('');

  // Timer states
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const targetDateRef = useRef<number | null>(null);

  // Initialize and run countdown timer
  useEffect(() => {
    // 1. Determine target date (20 days from visitor's initial check)
    const twentyDays = 20 * 24 * 60 * 60 * 1000;
    let savedTarget = null;
    try {
      savedTarget = localStorage.getItem('nx-target-date');
    } catch (e) {
      console.error(e);
    }

    let target = savedTarget ? parseInt(savedTarget, 10) : null;
    const now = new Date().getTime();

    if (!target || isNaN(target) || target < now || target - now > twentyDays) {
      target = now + twentyDays;
      try {
        localStorage.setItem('nx-target-date', String(target));
      } catch (e) {
        console.error(e);
      }
    }
    targetDateRef.current = target;

    // 2. Timer tick loop
    const updateCountdown = () => {
      if (!targetDateRef.current) return;
      const currentTime = new Date().getTime();
      let distance = targetDateRef.current - currentTime;

      // Reset target if it expired
      if (distance < 0) {
        const newTarget = currentTime + twentyDays;
        targetDateRef.current = newTarget;
        try {
          localStorage.setItem('nx-target-date', String(newTarget));
        } catch (e) {
          console.error(e);
        }
        distance = twentyDays;
      }

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0'),
      });
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatusType('');
    setStatusMsg('');

    // Simulate database registration response after 600ms
    setTimeout(() => {
      setStatusMsg(
        lang === 'ar'
          ? 'تم التسجيل بنجاح! سنقوم بإعلامك فور الإطلاق.'
          : 'Thank you! We will keep you updated on our launch.'
      );
      setStatusType('success');
      setEmail('');

      // Clear status message after 5 seconds
      setTimeout(() => {
        setStatusType('');
        setStatusMsg('');
      }, 5000);
    }, 600);
  };

  const isDark = theme === 'dark';

  return (
    <div className="coming-soon-wrapper">
      {/* BACKGROUND ANIMATION GLOWS */}
      <div className="bg-glows" aria-hidden="true">
        <div className="glow-blob glow-1"></div>
        <div className="glow-blob glow-2"></div>
      </div>

      {/* TOP HEADER */}
      <header className="coming-soon-header">
        <Link href="/" className="logo-container" aria-label="NexGen Home">
          <img src="/logo.png" alt="NexGen Build logo" className="logo-img" />
        </Link>
        <div className="actions-bar">
          {/* Theme Switcher */}
          <button
            type="button"
            className="theme-toggle"
            id="theme-btn"
            aria-label="Toggle Theme"
            title="Toggle Theme"
            onClick={toggleTheme}
          >
            <svg
              className="icon-sun"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg
              className="icon-moon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>

          {/* Language Toggle */}
          <div className="lang-switcher">
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
        </div>
      </header>

      {/* MAIN CARD SECTION */}
      <main className="coming-soon-main">
        <div className="glass-card">
          {/* Aramco Badge */}
          <div className="badge">
            <div className="badge-dot"></div>
            <span>{t('Saudi Aramco Registered Supplier', 'مورد معتمد لأرامكو السعودية')}</span>
          </div>

          {/* Heading */}
          <h1 className="progress-bar-wrap">
            <div className="progress-bar-inner">
              <div className="progress-text-base">
                <span>{t('COMING SOON', 'قريباً جداً')}</span>
              </div>
              <div className="progress-fill">
                <div className="progress-text-fill">
                  <span>{t('COMING SOON', 'قريباً جداً')}</span>
                </div>
              </div>
            </div>
          </h1>

          {/* Description */}
          <p className="description">
            {t(
              'Our website is currently under engineering. NexGen Build Company provides premium general construction, electrical, HVAC, plumbing, and structural waterproofing solutions. We will be launching soon.',
              'موقعنا الإلكتروني قيد التطوير الهندسي حالياً. تقدم شركة نكس جين للمقاولات حلولاً متميزة للبناء العام والكهرباء والتكييف والسباكة والعزل الإنشائي. سنكون جاهزين للإطلاق قريباً.'
            )}
          </p>

          {/* COUNTDOWN TIMER */}
          <div className="countdown-container" id="countdown">
            <div className="countdown-item">
              <span className="time-val" id="days">
                {timeLeft.days}
              </span>
              <span className="time-label">{t('Days', 'أيام')}</span>
            </div>
            <div className="countdown-item">
              <span className="time-val" id="hours">
                {timeLeft.hours}
              </span>
              <span className="time-label">{t('Hours', 'ساعات')}</span>
            </div>
            <div className="countdown-item">
              <span className="time-val" id="minutes">
                {timeLeft.minutes}
              </span>
              <span className="time-label">{t('Minutes', 'دقائق')}</span>
            </div>
            <div className="countdown-item">
              <span className="time-val" id="seconds">
                {timeLeft.seconds}
              </span>
              <span className="time-label">{t('Seconds', 'ثواني')}</span>
            </div>
          </div>

          {/* NOTIFY FORM */}
          <div className="form-container">
            <form className="notify-form" id="notify-form" onSubmit={handleFormSubmit}>
              <input
                type="email"
                className="email-input"
                id="email-field"
                name="email"
                placeholder={t('Enter your email address', 'أدخل عنوان بريدك الإلكتروني')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="submit-btn" id="submit-btn">
                <span>{t('Notify Me', 'أبلغني عند الإطلاق')}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </form>
            <div className={`form-status ${statusType}`} id="form-status">
              {statusMsg}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="coming-soon-footer">
        <a href="https://nocastra.com" target="_blank" rel="noopener" className="nocastra-link">
          <span>{t('Developed by', 'تطوير بواسطة')}</span>
          <div className="nocastra-badge">
            <img src="/nocastraLogo.png" alt="Nocastra Logo" />
          </div>
        </a>
      </footer>
    </div>
  );
}
