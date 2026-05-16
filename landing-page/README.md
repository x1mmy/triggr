# Triggr site (Next.js)

Triggr marketing site and onboarding flows. Configure environment variables from [`.env.example`](.env.example).

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run start` — run production build locally

## Routes

| Path | Purpose |
|------|---------|
| `/` | Marketing home |
| `/about`, `/contact`, `/demo`, `/terms`, `/privacy` | Content pages |
| `/onboarding/automation` | Automation-only onboarding |
| `/onboarding/webdev` | Web dev–only onboarding |
| `/onboarding/both` | Both services |
| `/api/lead` | Contact form (Telegram) |
| `/api/demo-sms` | Demo SMS webhook |
| `/api/submit` | Onboarding multipart submit (Blob + Notion + Linear + Telegram) |

Optional greeting: add query `?name=…` on onboarding URLs.

## Vercel

- **Root Directory**: repository root (when this folder is the whole Git repo, leave Vercel “Root” empty / `.`).
- **`vercel.json`**: empty object — App Router serves all paths; old SPA rewrites are not needed.
- **Notion**: set `NOTION_API_KEY`, `NOTION_CLIENTS_DATABASE_ID`. Submissions set **Client Name** (title), **Notes** (rich text), **Business Name** (text), **Form Submitted** (date = submit time), **Phone** (`smsPhone` / `displayPhone` + E.164-style formatting), **Service** (select: `Automation` | `Web Dev` | `Both`), **Status** (default **Onboarding**; uses Notion’s native `status` property unless you set `NOTION_STATUS_AS_SELECT=true` for a select-type column). Override property names with `NOTION_*_PROPERTY` vars in [`.env.example`](.env.example).
- **Linear**: `LINEAR_API_KEY` and `LINEAR_TEAM_ID` are required. **`LINEAR_TEAM_ID`** may be the team **key** (e.g. `TRGR`) or team **UUID**. **`LINEAR_PROJECT_ID`** may be the **slug** from the project URL (`client-work-…`) or project **UUID**; issues still appear on the team **Issues** board. Optional **Todo** column: set `LINEAR_WORKFLOW_STATE_TODO_ID` to that state’s **UUID**. Optional `LINEAR_ASSIGNEE_ID` (**UUID**).

Integration failures after a successful Notion save are reported to Telegram (see server logs and error messages from the APIs).
