# Brand Landing Page Guidelines

Single-page landing page for a minimalist menswear brand.

- **Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, GSAP, Framer Motion, Lenis.
- **No backend:** there is no database, email service or rate limiter. Do not add API keys or required environment variables.
- **Branding:** the brand name, tagline and contact email live in `lib/brand.ts`. Use `brand.name` instead of hardcoding the name.
- **Structure:** `/app` (layout, fonts, styles), `/components/sections`, `/components/common`, `/lib`, `/public`.
- **Checks:** run `npm run lint` and `npm run build` before committing.
