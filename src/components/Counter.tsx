'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface CounterProps {
  from?: number;
  to: number;
  mode?: 'linear' | 'loader';
  duration?: number; // in seconds
  pad?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  finishSymbol?: string;
}

function loaderEaseLC(t: number) {
  if (t < 0.25) return 3.2 * t * t;
  if (t < 0.65) {
    const a = (t - 0.25) / 0.4;
    return 0.2 + a * 0.5;
  }
  if (t < 0.88) {
    const b = (t - 0.65) / 0.23;
    return 0.7 + Math.pow(b, 1.5) * 0.18;
  }
  const f = (t - 0.88) / 0.12;
  return 0.88 + Math.pow(f, 4) * 0.12;
}

function clampLC(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function formatCounterValue(v: number, pad: number, decimals: number) {
  if (decimals > 0) {
    const s = v.toFixed(decimals);
    return s.replace(/\.?0+$/, '') || '0';
  }
  const n = Math.round(v);
  if (pad > 0) return String(n).padStart(pad, '0');
  return String(n);
}

export const Counter: React.FC<CounterProps> = ({
  from = 0,
  to,
  mode = 'loader',
  duration,
  pad = 0,
  decimals = 0,
  prefix = '',
  suffix = '',
  finishSymbol = '',
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [displayVal, setDisplayVal] = useState(formatCounterValue(from, pad, decimals));
  const containerRef = useRef<HTMLSpanElement>(null);
  const animStarted = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const animDuration = (duration || (mode === 'loader' ? 2.2 : 1.1)) * 1000;

    const runAnimation = () => {
      if (prefersReducedMotion) {
        setDisplayVal(finishSymbol || formatCounterValue(to, pad, decimals));
        return;
      }

      const startTime = performance.now();

      const frame = (now: number) => {
        const elapsed = now - startTime;
        const progress = clampLC(elapsed / animDuration, 0, 1);
        const eased = mode === 'loader' ? loaderEaseLC(progress) : progress;
        const currentVal = from + (to - from) * eased;

        setDisplayVal(formatCounterValue(currentVal, pad, decimals));

        if (progress < 1) {
          requestAnimationFrame(frame);
        } else {
          setDisplayVal(finishSymbol || formatCounterValue(to, pad, decimals));
        }
      };

      requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || animStarted.current) return;
          animStarted.current = true;
          io.unobserve(el);
          runAnimation();
        });
      },
      { threshold: 0.08 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
    };
  }, [from, to, mode, duration, pad, decimals, finishSymbol, prefersReducedMotion]);

  return (
    <span ref={containerRef} className="loader-counter">
      {finishSymbol && animStarted.current && displayVal === finishSymbol ? (
        displayVal
      ) : (
        `${prefix}${displayVal}${suffix}`
      )}
    </span>
  );
};
