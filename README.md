# Triggr Landing Page

A fast React + TypeScript marketing site for Triggr, focused on lead conversion for trade businesses.

## What's included

- High-converting landing page sections (hero, problem, process, services, pricing, CTA)
- Contact modal form with server-side Telegram delivery
- Legal pages:
  - `/terms`
  - `/about`
- Custom Triggr SVG favicon
- Vercel rewrite config for direct route access

## Tech stack

- React 18 + TypeScript
- Vite
- Vercel (static frontend + serverless API function)

## Local development

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Telegram lead notifications

The contact form submits to `/api/lead`, which sends a formatted message to your Telegram bot.

### Environment variables

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

Required values:

- `TELEGRAM_BOT_TOKEN` - your Telegram Bot API token
- `TELEGRAM_CHAT_ID` - target chat/user/channel ID to receive leads

For production on Vercel, set both values in project Environment Variables.

## Deployment notes

- `vercel.json` rewrites `/terms` and `/about` to `index.html` so direct links work.
- API route `/api/lead` remains server-side and does not expose your bot token to the browser.
