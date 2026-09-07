'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface AccordionItem {
  qEn: string;
  qAr: string;
  aEn: string;
  aAr: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const { t, lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            style={{
              border: '1px solid var(--gray-200)',
              borderRadius: '12px',
              background: isOpen ? 'var(--white)' : 'rgba(255, 255, 255, 0.5)',
              overflow: 'hidden',
              transition: 'all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)',
              boxShadow: isOpen ? '0 10px 25px -5px rgba(0, 0, 0, 0.05)' : 'none',
            }}
          >
            <button
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                padding: '20px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: lang === 'ar' ? 'right' : 'left',
                outline: 'none',
              }}
            >
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  transition: 'color 0.25s ease',
                  paddingRight: lang === 'ar' ? '0' : '16px',
                  paddingLeft: lang === 'ar' ? '16px' : '0',
                }}
              >
                {t(item.qEn, item.qAr)}
              </span>
              <span
                style={{
                  fontSize: '22px',
                  lineHeight: '1',
                  color: 'var(--orange)',
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  fontWeight: 'bold',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                }}
              >
                +
              </span>
            </button>
            <div
              style={{
                maxHeight: isOpen ? '400px' : '0',
                opacity: isOpen ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.3s ease',
              }}
            >
              <p
                style={{
                  padding: '0 24px 20px 24px',
                  margin: 0,
                  fontSize: '13.5px',
                  color: 'var(--gray-600)',
                  lineHeight: '1.7',
                }}
              >
                {t(item.aEn, item.aAr)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
