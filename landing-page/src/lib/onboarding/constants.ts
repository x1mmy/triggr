export const LEAD_SOURCE_OPTIONS = [
  { value: 'website', label: 'Website contact form' },
  { value: 'social_dm', label: 'Facebook / Instagram DM' },
  { value: 'gbp', label: 'Google Business Profile' },
  { value: 'phone', label: 'Phone calls' },
  { value: 'word_of_mouth', label: 'Word of mouth' },
  { value: 'other', label: 'Other' },
] as const;

export const ENQUIRIES_PER_WEEK = [
  { value: 'lt5', label: 'Less than 5' },
  { value: '5-15', label: '5–15' },
  { value: '15-30', label: '15–30' },
  { value: '30plus', label: '30+' },
] as const;

export const RESPONSE_TIME = [
  { value: 'within_hour', label: 'Within the hour' },
  { value: 'same_day', label: 'Same day' },
  { value: 'next_day', label: 'Next day' },
  { value: 'longer', label: 'Longer than that' },
] as const;

export const WEBSITE_MAIN_JOB = [
  { value: 'calls', label: 'Get more phone calls / enquiries' },
  { value: 'portfolio', label: 'Show off past work' },
  { value: 'explain', label: 'Explain what I offer' },
  { value: 'all', label: 'All of the above' },
] as const;

export const PAGE_OPTIONS = [
  { value: 'home', label: 'Home' },
  { value: 'about', label: 'About' },
  { value: 'services', label: 'Services' },
  { value: 'gallery', label: 'Gallery / Portfolio' },
  { value: 'testimonials', label: 'Testimonials' },
  { value: 'contact', label: 'Contact' },
  { value: 'other', label: 'Other (specify below)' },
] as const;

export const PHOTOS_READY = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'some', label: 'Some' },
] as const;

export const COPY_READY = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'some', label: 'Some' },
] as const;

export const DOMAIN_STATUS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'not_sure', label: 'Not sure' },
] as const;

export const MAX_FILE_BYTES = 10 * 1024 * 1024;

export const ALLOWED_LOGO_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'];
export const ALLOWED_PHOTO_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
export const ALLOWED_DOC_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];
