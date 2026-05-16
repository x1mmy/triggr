'use client';

import { useCallback, useState } from 'react';

type SubmitResult = { ok: boolean; json?: unknown; status: number };

export type SubmitPhase = 'upload' | 'processing';

export function useMultipartSubmit(): {
  progress: number;
  phase: SubmitPhase;
  error: string;
  submitting: boolean;
  submitFormData: (fd: FormData) => Promise<SubmitResult>;
  setError: (s: string) => void;
} {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<SubmitPhase>('upload');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submitFormData = useCallback((fd: FormData) => {
    setError('');
    setProgress(0);
    setPhase('upload');
    setSubmitting(true);
    return new Promise<SubmitResult>((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', (ev) => {
        if (ev.lengthComputable) {
          setProgress(Math.round((ev.loaded / ev.total) * 100));
        }
      });
      xhr.upload.addEventListener('load', () => {
        setPhase('processing');
        setProgress(100);
      });
      xhr.addEventListener('load', () => {
        let json: unknown;
        try {
          json = JSON.parse(xhr.responseText || '{}');
        } catch {
          json = undefined;
        }
        resolve({ ok: xhr.status >= 200 && xhr.status < 300, json, status: xhr.status });
      });
      xhr.addEventListener('error', () => {
        setError('Network error. Please try again.');
        resolve({ ok: false, status: 0 });
      });
      xhr.open('POST', '/api/submit');
      xhr.send(fd);
    }).finally(() => {
      setSubmitting(false);
    });
  }, []);

  return { progress, phase, error, submitting, submitFormData, setError };
}
