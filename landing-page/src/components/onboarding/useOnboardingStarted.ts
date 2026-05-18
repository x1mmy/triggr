'use client';

import { useCallback, useEffect, useState } from 'react';

const STORAGE_PREFIX = 'triggr_onboarding_started_';

export function useOnboardingStarted(flowKey: string) {
  const storageKey = `${STORAGE_PREFIX}${flowKey}`;
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setStarted(sessionStorage.getItem(storageKey) === '1');
    } catch {
      setStarted(false);
    }
    setReady(true);
  }, [storageKey]);

  const beginOnboarding = useCallback(() => {
    try {
      sessionStorage.setItem(storageKey, '1');
    } catch {
      /* private mode */
    }
    setStarted(true);
  }, [storageKey]);

  return { started, beginOnboarding, ready };
}
