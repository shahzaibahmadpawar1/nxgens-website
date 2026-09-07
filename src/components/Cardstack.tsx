'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface CardItem {
  icon: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

const CARDS: CardItem[] = [
  {
    icon: '🏗️',
    titleEn: 'General Construction',
    titleAr: 'البناء العام',
    descEn: 'Complete structural construction and site development — foundations, framing, masonry, paving, and full civil works.',
    descAr: 'بناء هيكلي متكامل وتطوير الموقع — الأسس والهياكل والبناء والرصف والأعمال المدنية الكاملة.',
  },
  {
    icon: '⚡',
    titleEn: 'Electrical Services',
    titleAr: 'الخدمات الكهربائية',
    descEn: 'Full electrical system design, installation, and maintenance — power distribution, lighting, backup systems, and certification.',
    descAr: 'تصميم وتركيب وصيانة كاملة للأنظمة الكهربائية — توزيع الطاقة والإضاءة وأنظمة الطوارئ.',
  },
  {
    icon: '❄️',
    titleEn: 'HVAC Services',
    titleAr: 'خدمات التكييف والتهوية',
    descEn: 'Advanced climate control — central AC, VRF systems, ventilation, ductwork, energy-efficient designs, and maintenance contracts.',
    descAr: 'تحكم متقدم في المناخ — تكييف مركزي وأنظمة VRF والتهوية والمجاري الهوائية.',
  },
  {
    icon: '🔧',
    titleEn: 'Sanitary Services',
    titleAr: 'الخدمات الصحية',
    descEn: 'Comprehensive plumbing — water supply networks, drainage, hot water systems, rainwater harvesting, and maintenance.',
    descAr: 'سباكة شاملة — شبكات إمداد المياه والصرف وأنظمة المياه الساخنة وتجميع مياه الأمطار.',
  },
  {
    icon: '🛡️',
    titleEn: 'Waterproofing',
    titleAr: 'العزل المائي',
    descEn: 'Specialized protective solutions — foundation, roof, wet area sealing, tank waterproofing, joint treatment, and protective coatings.',
    descAr: 'حلول وقائية متخصصة — عزل الأساسات والأسطح والمناطق الرطبة والخزانات.',
  },
  {
    icon: '🔥',
    titleEn: 'Fire Fighting Systems',
    titleAr: 'أنظمة الإطفاء',
    descEn: 'Complete fire protection — sprinklers, alarms, hydrants, suppression systems, control panels, testing & annual maintenance contracts.',
    descAr: 'حماية كاملة من الحرائق — رشاشات وإنذارات وخراطيم وأنظمة إخماد ولوحات تحكم.',
  },
];

export const Cardstack: React.FC = () => {
  const { t } = useLanguage();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [front, setFront] = useState(0);
  const isHovered = useRef(false);
  const isFocused = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const n = CARDS.length;

  const advance = () => {
    setFront((prev) => (prev + 1) % n);
  };

  const startAutoAdvance = () => {
    if (prefersReducedMotion || isHovered.current || isFocused.current) return;
    stopAutoAdvance();
    timerRef.current = setInterval(advance, 5200);
  };

  const stopAutoAdvance = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    startAutoAdvance();
    return () => stopAutoAdvance();
  }, [prefersReducedMotion]);

  const handleMouseEnter = () => {
    isHovered.current = true;
    stopAutoAdvance();
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    startAutoAdvance();
  };

  const handleFocusIn = () => {
    isFocused.current = true;
    stopAutoAdvance();
  };

  const handleFocusOut = () => {
    isFocused.current = false;
    setTimeout(() => {
      startAutoAdvance();
    }, 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      advance();
    }
  };

  return (
    <div className="hero-cardstack-wrap">
      <div
        className="hero-cardstack"
        id="hero-cardstack"
        role="button"
        tabIndex={0}
        aria-label="Service stack. Activate to bring the next service to the front."
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocusIn}
        onBlur={handleFocusOut}
        onClick={advance}
        onKeyDown={handleKeyDown}
      >
        <div className="hero-cardstack-track">
          {CARDS.map((card, i) => {
            const depth = (i - front + n) % n;
            const isFront = depth === 0;
            return (
              <article
                key={i}
                className={`hero-cardstack-card hero-service-card ${isFront ? 'is-front' : ''}`}
                style={{ '--depth': String(depth) } as React.CSSProperties}
              >
                <div className="service-icon" aria-hidden="true">
                  {card.icon}
                </div>
                <h3>{t(card.titleEn, card.titleAr)}</h3>
                <p className="hero-service-desc">{t(card.descEn, card.descAr)}</p>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
