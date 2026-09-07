'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const WORDS = {
  en: ['Infrastructure', 'Fabrication', 'Excellence', 'Precision', 'Capabilities'],
  ar: ['البنية التحتية', 'التصنيع', 'التميز', 'الدقة', 'القدرات'],
};

export const Typewriter: React.FC = () => {
  const { lang, isReady } = useLanguage();
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typewriter effect logic
  useEffect(() => {
    if (!isReady) return;

    const words = WORDS[lang] || WORDS.en;
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const tick = () => {
      const currentWord = words[wordIndex % words.length];

      if (!isDeleting) {
        setDisplayText(currentWord.slice(0, charIndex + 1));
        charIndex++;

        if (charIndex === currentWord.length) {
          isDeleting = true;
          timeoutId = setTimeout(tick, 1000);
        } else {
          timeoutId = setTimeout(tick, 100);
        }
      } else {
        setDisplayText(currentWord.slice(0, charIndex - 1));
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          timeoutId = setTimeout(tick, 1000);
        } else {
          timeoutId = setTimeout(tick, 60);
        }
      }
    };

    timeoutId = setTimeout(tick, 100);

    return () => clearTimeout(timeoutId);
  }, [lang, isReady]);

  return (
    <span className="light hero-typewriter-wrap" aria-live="polite">
      <span id="hero-typewriter-text">{displayText}</span>
      <span
        className="hero-typewriter-cursor"
        aria-hidden="true"
        style={{ opacity: cursorVisible ? 1 : 0 }}
      ></span>
    </span>
  );
};
