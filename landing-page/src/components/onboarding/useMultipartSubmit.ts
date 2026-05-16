'use client';

import { useCallback, useState } from 'react';

type SubmitResult = { ok: boolean; json?: unknown; status: number };

export function useMultipartSubmit(): {
  progress: number;
  error: string;
  submitting: boolean;
  submitFormData: (fd: FormData) => Promise<SubmitResult>;
  setError: (s: string) => void;
} {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submitFormData = useCallback((fd: FormData) => {
    setError('');
    setProgress(0);
    setSubmitting(true);
    return new Promise<SubmitResult>((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', (ev) => {
        if (ev.lengthComputable) {
          setProgress(Math.round((ev.loaded / ev.total) * 100));
        }
      });
      xhr.addEventListener('load', () => {
        setSubmitting(false);
        let json: unknown;
        try {
          json = JSON.parse(xhr.responseText || '{}');
        } catch {
          json = undefined;
        }
        resolve({ ok: xhr.status >= 200 && xhr.status < 300, json, status: xhr.status });
      });
      xhr.addEventListener('error', () => {
        setSubmitting(false);
        setError('Network error. Please try again.');
        resolve({ ok: false, status: 0 });
      });
      xhr.open('POST', '/api/submit');
      xhr.send(fd);
    });
  }, []);

  return { progress, error, submitting, submitFormData, setError };
}
