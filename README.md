# Triggr

Marketing site and client onboarding for Triggr (`usetriggr.com.au`). Deployable app lives in **`landing-page/`** (this is often the only folder synced to the Git repo Vercel builds).

## Landing + onboarding app

See **[landing-page/README.md](landing-page/README.md)** for setup. Stack: **Next.js 15** (App Router), React 18, TypeScript.

Highlights:

- Marketing home and sections (`/`, `/about`, `/contact`, `/demo`, `/terms`, `/privacy`)
- Contact form → `POST /api/lead` → Telegram
- Demo SMS → `POST /api/demo-sms`
- Client onboarding → `/onboarding/automation`, `/onboarding/webdev`, `/onboarding/both` → `POST /api/submit` (Vercel Blob, Notion, Linear, Telegram)

## Local dev (from `landing-page/`)

```bash
cd landing-page
npm install
npm run dev
```

Copy `.env.example` to `.env` and fill values for integrations you want to exercise locally.
