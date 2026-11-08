# Brand Landing Page Guidelines

Single-page editorial landing page for a menswear brand.

- **Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS (reset only; styles live in `app/globals.css`), GSAP ScrollTrigger, Lenis.
- **No backend:** there is no database, email service or rate limiter. Do not add API keys or required environment variables.
- **Branding and copy:** the brand name and contact email live in `lib/brand.ts`; looks and studio labels in `lib/content.ts`. Use `brand.name` instead of hardcoding the name.
- **Motion:** use `transform`, `opacity` and `clip-path` only. Every animation sits inside `gsap.matchMedia()` with a `prefers-reduced-motion: no-preference` condition, and the page must still read correctly without it.
- **Photos:** free-licence Unsplash images in `public/photos`. Check the licence before adding any other source.
- **Checks:** run `npm run lint` and `npm run build` before committing, and look at the page at desktop and phone width.
