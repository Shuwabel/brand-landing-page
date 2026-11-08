# Brand Landing Page

A single-page, motion-rich landing page for a minimalist menswear brand, built with Next.js, Tailwind CSS, GSAP, Framer Motion and Lenis smooth scrolling.

It needs **no API keys, no database and no environment variables**. Early-access requests open the visitor's email app, addressed to the inbox set in `lib/brand.ts`.

## Make it yours

Edit `lib/brand.ts`:

- `name`, `tagline`, `description`: used in the page title, footer and image labels
- `contactEmail`: where early-access requests are sent
- `instagram`, `tiktok`: full profile URLs (leave empty to hide the icon)

Replace `public/logo.svg` (and `app/icon.svg` for the browser tab icon) with your own logo, and swap the photos in `public/img*.jpg`.

## Tech stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- GSAP, Framer Motion, Lenis
- Vercel Analytics and Speed Insights (work automatically on Vercel, no keys)

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

Import the repository on Vercel. No environment variables are required.

## Structure

- `/app`: layout, global styles and fonts
- `/components/sections`: Hero, Origin, Philosophy, Product, Poster, CTA
- `/components/common`: header, footer, intro, menu, music player
- `/lib/brand.ts`: brand name and contact settings
- `/public`: logo, photos, video and audio
