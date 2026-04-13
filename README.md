# ancientika

**ancientika** is where contemporary minimalism meets modern elegance. This repository contains the immersive waitlist experience for the upcoming ancientika menswear brand, designed with a focus on sophisticated restraint and timeless style.

## 🪞 The Vision

ancientika is more than a clothing brand; it is a movement toward intentional design. Our digital presence reflects this philosophy through:
- **Quiet Confidence:** A minimalist interface that lets the brand narrative breathe.
- **Refined Detail:** Every animation and interaction is tuned for a premium feel.
- **Modern Sophistication:** A blend of sleek, contemporary design elements with classic refinement.

## 🚀 Key Features

- **Immersive Introduction:** A dual-layer GSAP reveal sequence that wipes the screen to reveal the main content.
- **Fluid Motion:** Integrated **Lenis** smooth scrolling for a natural, high-end browsing experience.
- **Micro-interactions:** Blur-reveal text and parallax image effects powered by **GSAP** and **Framer Motion**.
- **Waitlist Integration:** A seamless, rate-limited subscription form connected to **Supabase** and **Resend**.
- **Performance Optimized:** Built with the latest Next.js 16.1 App Router and React 19 for industry-leading speed and SEO.

## 🛠️ Tech Stack

- **Core:** Next.js 15.1 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4 (PostCSS)
- **Animations:** GSAP (GreenSock), Framer Motion
- **Scroll:** Lenis
- **Backend:** Supabase (Database & Auth), PostgreSQL
- **Email:** Resend
- **Insights:** Vercel Analytics & Speed Insights

## ⚙️ Getting Started

### Prerequisites

- **Node.js:** 20.x or higher
- **Supabase Account:** For database operations.
- **Resend API Key:** For waitlist confirmation emails.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shuwabel/ancientika-modern.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root and add your configuration (see `.env.example` if available):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   RESEND_API_KEY=your_resend_api_key
   FROM_EMAIL=your_sending_email
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Launch Development Server:**
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `/app` - Next.js App Router (Pages, API routes, Layouts)
- `/components/sections` - Core page components (Hero, Philosophy, Product, etc.)
- `/components/common` - Reusable UI elements and Global components (Header, Footer, Intro)
- `/lib` - Core utility logic and third-party initializations (Supabase, Resend)
- `/public` - Static assets, typography, and images.

---

*Crafted by [Shuwabel](https://github.com/Shuwabel)*

