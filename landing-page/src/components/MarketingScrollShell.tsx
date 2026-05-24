'use client';

import type { ReactNode } from 'react';
import { ScrollProgress } from '@/components/ScrollProgress';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type MarketingScrollShellProps = {
  children: ReactNode;
  withBeams?: boolean;
};

export function MarketingScrollShell({ children, withBeams = true }: MarketingScrollShellProps) {
  useScrollReveal();

  return (
    <>
      <ScrollProgress />
      {withBeams && (
        <>
          <div className="light-beam" aria-hidden="true" />
          <div className="light-beam light-beam-2" aria-hidden="true" />
        </>
      )}
      {children}
    </>
  );
}
