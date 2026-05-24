'use client';

import { useEffect } from 'react';

const STAGGER_MS = 70;
const DEFAULT_THRESHOLD = 0.1;
const ROOT_MARGIN = '0px 0px -8% 0px';

function staggerDelay(el: HTMLElement): number {
  const group = el.closest('[data-reveal-group]');
  if (!group) {
    const parent = el.parentElement;
    const siblings = parent
      ? [...parent.querySelectorAll<HTMLElement>('.reveal')]
      : [el];
    return siblings.indexOf(el) * STAGGER_MS;
  }
  const items = [...group.querySelectorAll<HTMLElement>('.reveal')];
  return items.indexOf(el) * STAGGER_MS;
}

function applyVisible(el: HTMLElement) {
  const custom = el.dataset.revealDelay;
  const delay = custom !== undefined ? Number.parseInt(custom, 10) : staggerDelay(el);
  const safeDelay = Number.isFinite(delay) ? Math.max(0, delay) : 0;
  window.setTimeout(() => {
    el.classList.add('visible');
    el.style.willChange = 'auto';
  }, safeDelay);
}

export function useScrollReveal() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
      document.querySelectorAll('.divider-line').forEach((el) => el.classList.add('visible'));
      document.querySelectorAll('.scroll-line-fill').forEach((el) => el.classList.add('visible'));
      return;
    }

    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          applyVisible(entry.target as HTMLElement);
          revealObs.unobserve(entry.target);
        });
      },
      { threshold: DEFAULT_THRESHOLD, rootMargin: ROOT_MARGIN },
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      const node = el as HTMLElement;
      node.style.willChange = 'transform, opacity, filter';
      revealObs.observe(node);
    });

    const lineObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          lineObs.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: ROOT_MARGIN },
    );

    document.querySelectorAll('.divider-line, .scroll-line-fill').forEach((el) => lineObs.observe(el));

    return () => {
      revealObs.disconnect();
      lineObs.disconnect();
    };
  }, []);
}
