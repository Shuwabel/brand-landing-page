# Ancientika-Modern Project Guidelines

## Project Info
**Name:** Ancientika-modern
**Description:** A modern, highly interactive web application built with a focus on immersive aesthetics and smooth animations.

## Tech Stack
- **Framework:** Next.js 16.1 (App Router) with React 19
- **Styling:** Tailwind CSS v4 & Tailwind PostCSS
- **Animations:** 
  - GSAP (GreenSock Animation Platform)
  - Framer Motion
  - Lenis (for smooth scrolling)
- **Backend/Database:** Supabase & PostgreSQL (using `pg`)
- **Email:** Resend
- **Icons:** React Icons

## Directory Structure
- `/app` - Next.js App Router pages, layouts, and `/api` routes.
- `/components/common` - Shared, reusable atomic UI components (e.g., Buttons, Inputs).
- `/components/sections` - Major page sections (e.g., Hero, Philosophy, Gallery).
- `/components/utils` - Utility components and functional wrappers.
- `/lib` - Core logic, API wrappers, and client initializations (e.g., `supabase.ts`).
- `/public` - Static assets, images, and fonts.

## Important Commands
- **Start Development Server:** `npm run dev`
- **Build for Production:** `npm run build`
- **Start Production Server:** `npm run start`
- **Run Linter:** `npm run lint`

## Workflow & Best Practices
1. **Component Design:** Prioritize creating premium, dynamic designs. Utilize GSAP and Framer Motion generously for micro-interactions and scroll animations, but ensure fallbacks or simplified versions for mobile devices.
2. **Server vs. Client Components:** Default to Server Components for performance. Use the `"use client"` directive only when utilizing hooks, state, or browser APIs (like GSAP or Lenis).
3. **Database Operations:** Use the initialized Supabase client in `/lib/supabase.ts` for database interactions. 
4. **Styling:** Use Tailwind utility classes. If complex or conditional styles are needed, abstract them cleanly or use `clsx`/`tailwind-merge`.
5. **Living Document:** This `guidelines.md` file is a living document. Whenever we add new tech, change workflows, or discover new best practices, this file must be updated immediately.

## AI Agent Instructions
If you are an AI assistant working in this repository:
- **Always read this file first** to establish context.
- Follow the tech stack strictly. Do not introduce alternative libraries (like Axios instead of React `fetch`, or a different animation library) without user approval.
- Keep the `package.json` and this document synchronized.
