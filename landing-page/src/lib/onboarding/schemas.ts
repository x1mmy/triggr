import { z } from 'zod';

const phoneDigits = z
  .string()
  .min(1)
  .transform((s) => s.replace(/\D/g, ''))
  .refine((s) => s.length >= 8 && s.length <= 15, 'Valid phone required');

export const enquiriesPerWeekEnum = z.enum(['lt5', '5-15', '15-30', '30plus']);
export const responseTimeEnum = z.enum(['within_hour', 'same_day', 'next_day', 'longer']);
export const yesNo = z.enum(['yes', 'no']);
export const domainStatusEnum = z.enum(['yes', 'no', 'not_sure']);
export const mainJobEnum = z.enum(['calls', 'portfolio', 'explain', 'all']);
export const photosReadyEnum = z.enum(['yes', 'no', 'some']);
export const copyReadyEnum = z.enum(['yes', 'no', 'some']);

export const automationSchema = z
  .object({
    formType: z.literal('automation'),
    fullName: z.string().min(1, 'Required'),
    businessName: z.string().min(1, 'Required'),
    businessType: z.string().min(1, 'Required'),
    suburb: z.string().min(1, 'Required'),
    leadSources: z.array(z.string()).min(1, 'Select at least one'),
    enquiriesPerWeek: enquiriesPerWeekEnum,
    responseTime: responseTimeEnum,
    smsPhone: phoneDigits,
    hasWebsite: yesNo,
    websiteUrl: z.string().optional().default(''),
    hasGbp: yesNo,
    usesCrm: yesNo,
    crmName: z.string().optional().default(''),
    firstMessage: z.string().optional().default(''),
  })
  .superRefine((data, ctx) => {
    if (data.hasWebsite === 'yes') {
      const u = data.websiteUrl?.trim() ?? '';
      if (!u || !z.string().url().safeParse(u).success) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['websiteUrl'], message: 'Enter a valid website URL' });
      }
    }
    if (data.usesCrm === 'yes' && !(data.crmName ?? '').trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['crmName'], message: 'Which CRM?' });
    }
  });

export const webdevSchema = z
  .object({
    formType: z.literal('webdev'),
    fullName: z.string().min(1, 'Required'),
    businessName: z.string().min(1, 'Required'),
    businessType: z.string().min(1, 'Required'),
    suburb: z.string().min(1, 'Required'),
    displayPhone: phoneDigits,
    displayEmail: z.string().email('Valid email required'),
    mainJob: mainJobEnum,
    pagesNeeded: z.array(z.string()).min(1, 'Select at least one page'),
    otherPagesFeatures: z.string().optional().default(''),
    hasLogo: yesNo,
    hasBrandColors: yesNo,
    brandColors: z.string().optional().default(''),
    inspirationSites: z.string().optional().default(''),
    photosReady: photosReadyEnum,
    copyReady: copyReadyEnum,
    copyText: z.string().optional().default(''),
    servicesList: z.string().min(1, 'List your services'),
    hasDomain: domainStatusEnum,
    domainName: z.string().optional().default(''),
    currentWebsiteUrl: z.string().optional().default(''),
  })
  .superRefine((data, ctx) => {
    if (data.hasBrandColors === 'yes' && !(data.brandColors ?? '').trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['brandColors'], message: 'Describe or add hex codes' });
    }
    if (data.hasDomain === 'yes' && !(data.domainName ?? '').trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['domainName'], message: 'What domain?' });
    }
    const cur = data.currentWebsiteUrl?.trim() ?? '';
    if (cur && !z.string().url().safeParse(cur).success) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['currentWebsiteUrl'], message: 'Invalid URL' });
    }
  });

export const bothSchema = z
  .object({
    formType: z.literal('both'),
    fullName: z.string().min(1, 'Required'),
    businessName: z.string().min(1, 'Required'),
    businessType: z.string().min(1, 'Required'),
    suburb: z.string().min(1, 'Required'),
    mainJob: mainJobEnum,
    pagesNeeded: z.array(z.string()).min(1, 'Select at least one page'),
    otherPagesFeatures: z.string().optional().default(''),
    hasLogo: yesNo,
    hasBrandColors: yesNo,
    brandColors: z.string().optional().default(''),
    inspirationSites: z.string().optional().default(''),
    photosReady: photosReadyEnum,
    copyReady: copyReadyEnum,
    copyText: z.string().optional().default(''),
    servicesList: z.string().min(1, 'List your services'),
    hasDomain: domainStatusEnum,
    domainName: z.string().optional().default(''),
    currentWebsiteUrl: z.string().optional().default(''),
    leadSources: z.array(z.string()).min(1, 'Select at least one'),
    enquiriesPerWeek: enquiriesPerWeekEnum,
    responseTime: responseTimeEnum,
    smsPhone: phoneDigits,
    usesCrm: yesNo,
    crmName: z.string().optional().default(''),
    firstMessage: z.string().optional().default(''),
  })
  .superRefine((data, ctx) => {
    if (data.hasBrandColors === 'yes' && !(data.brandColors ?? '').trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['brandColors'], message: 'Describe or add hex codes' });
    }
    if (data.hasDomain === 'yes' && !(data.domainName ?? '').trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['domainName'], message: 'What domain?' });
    }
    const cur = data.currentWebsiteUrl?.trim() ?? '';
    if (cur && !z.string().url().safeParse(cur).success) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['currentWebsiteUrl'], message: 'Invalid URL' });
    }
    if (data.usesCrm === 'yes' && !(data.crmName ?? '').trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['crmName'], message: 'Which CRM?' });
    }
  });

export const onboardingSchema = z.union([automationSchema, webdevSchema, bothSchema]);

export type OnboardingPayload = z.infer<typeof onboardingSchema>;
