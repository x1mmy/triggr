/** Google Ads conversion: Submit lead form (1) — fires on /thank-you page load */
export const GOOGLE_ADS_LEAD_CONVERSION = 'AW-18163960237/d33vCJ_T9q0cEK2ToNVD';

/** Appended after successful contact form submit */
export const THANK_YOU_PATH = '/thank-you?submitted=1';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}
