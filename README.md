# Brand Landing Page

An editorial, scroll-driven landing page for a menswear brand. Built with Next.js, GSAP ScrollTrigger and Lenis.

It needs **no API keys, no database and no environment variables**. Early-access requests open the visitor's email app, addressed to the inbox set in `lib/brand.ts`.

## The page

Six chapters, each behaving differently so the scroll keeps surprising:

1. **Cover**: a title page with a kinetic headline and a parallax photo.
2. **Manifesto**: a full stop on a dark ground; the sentence lights up word by word.
3. **The cloth**: an asymmetric spread with wipe reveals and a drifting inset.
4. **The studio**: a collection walked sideways (pinned on desktop, native swipe on phones), every piece labelled with name, fabric and fit.
5. **The looks**: the peak. The section pins and the scroll turns the pages of a lookbook. Whichever look you stop on regrades the page and is attached to your early-access request.
6. **Early access**: the one action.

Reduced-motion visitors get the same content with no pinning, no smooth scrolling and no animated entrances.

## Make it yours

- `lib/brand.ts`: brand name, edition, contact email, social links (leave a URL empty to hide it).
- `lib/content.ts`: the looks, hotspots and studio labels. The garment names and fabric notes are placeholder copy.
- `public/logo.svg` and `app/icon.svg`: replace with your logo.
- `public/photos/`: the photos are free-licence images from [Unsplash](https://unsplash.com). Swap in your own shoot before using this for a real brand.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

Import the repository on Vercel. No environment variables are required.

## Structure

- `/app`: layout, fonts and global styles
- `/components`: one component per chapter, plus the folio rail and smooth scroll
- `/lib`: brand settings, page content, scroll helpers and the shared look state
- `/public`: logo and photos
