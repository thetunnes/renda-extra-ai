'use client';
import { useEffect } from 'react';
import experience from '@/config/experience.json';
/** Enter only visible content; server HTML and failures always retain readable sections. */
export default function SectionMotion() {
  useEffect(() => {
    if (!experience.motion.enabled || !experience.motion.entrance) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (document.documentElement.dataset.motion !== 'off' && !preference.matches)
            entry.target.classList.add('is-entering');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 },
    );
    const elements = document.querySelectorAll(
      '.section-heading, .platform-card, .guide-card, .steps > li, .editorial > div, .transparency > div, .faq > div, .quiz-intro, .quiz-form',
    );
    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      elements.forEach((element) => element.classList.remove('is-entering'));
    };
  }, []);
  return null;
}
