# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

**Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Zod validation

**Single-page bilingual landing site** for a Georgian permit consulting firm. All content is a single landing page rendered at `/en` and `/ka`.

### i18n Pattern

- Middleware (`middleware.ts`) detects locale from `Accept-Language` header and redirects to `/{locale}/`
- Root `/` redirects to `/en`
- Dynamic route `app/[lang]/` loads the correct dictionary
- Dictionaries live in `dictionaries/en.json` and `dictionaries/ka.json` — loaded via dynamic import in `dictionaries/getDictionary.ts`
- All UI text comes from the `Dictionary` type (`lib/types.ts`). Components receive `dict` as a prop from the server page component.
- **When adding/modifying content, always update both `en.json` and `ka.json`.**

### Data Flow

Server components (`app/[lang]/layout.tsx`, `app/[lang]/page.tsx`) fetch the dictionary and pass it down. Client components (`"use client"`) are used only for interactivity: `Header` (mobile menu, scroll), `LeadCaptureForm` (form state), `LanguageToggle` (routing), `FAQ`/`Accordion` (expand/collapse).

### Form Submission

`LeadCaptureForm` uses React 19 `useActionState` → server action `app/[lang]/actions.ts` → Zod validation (`lib/schemas.ts`) → POST to n8n webhook (`N8N_WEBHOOK_URL` env var). Includes honeypot spam prevention. Georgian phone format: `+995 XXX XX XX XX`.

### Styling

Tailwind v4 with custom theme in `app/globals.css`. Key colors: `navy` (#1B2A4A), `teal` (#2E8B8B). Fonts: Inter + Noto Sans Georgian. Use semantic classes like `text-navy`, `bg-teal`.

### SEO

Layout generates Open Graph tags, language alternates, and JSON-LD structured data (LocalBusiness + FAQPage schemas) via `lib/structuredData.ts`. Brand constants in `lib/constants.ts`.

### External Images

`next.config.ts` has `remotePatterns` for `images.unsplash.com`. Add new domains there if using other external image sources.
