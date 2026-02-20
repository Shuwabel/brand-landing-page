"use client";

import { useState, useEffect } from "react";
// Remove framer-motion import for page wrapper if not needed for opacity anymore
// But we might want AnimatePresence for Intro exit if we wanted to fade it out, 
// but Intro handles its own exit animation via GSAP clips.

import useLenis from "@/components/utils/hooks/useLenis";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Hero from "@/components/sections/Hero";
import Poster from "@/components/sections/Poster";
import Philosophy from "@/components/sections/Philosophy";
import Origin from "@/components/sections/Origin";
import Product from "@/components/sections/Product";
import Intro from "@/components/common/Intro";
import IntroSm from "@/components/common/IntroSm";
import CTA from "@/components/sections/CTA";
import MusicPlayer from "@/components/common/MusicPlayer";

export default function Home() {
  useLenis();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // We can't use simple useState(true) because re-hydration might cause mismatch if we rely on window size, 
  // but Intro/IntroSm are separated by CSS classes (max-sm:hidden), so rendering both conditional on state is fine.
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {/* Intro Overlay - Renders on top because of fixed z-[5000] */}
      {showIntro && (
        <>
          <div className="max-sm:hidden">
            <Intro onComplete={() => setShowIntro(false)} />
          </div>
          <div className="block sm:hidden">
            <IntroSm onComplete={() => setShowIntro(false)} />
          </div>
        </>
      )}

      {/* Main Website - Always rendered underneath */}
      {/* Moved Header out of motion wrapper previously, now removing motion wrapper entirely for main content 
          because the Intro 'wipe' is the reveal animation. */}

      <div className="w-full">
        {/* Main Content Wrapper */}
        <div className="relative w-full z-10 bg-background min-h-screen">
          <Header />
          <main className="relative">
            <Hero />
            <Poster />
            <Philosophy />
            <Origin />
            <Product />
            <CTA />
            <MusicPlayer />
          </main>
        </div>

        <Footer />
      </div>
    </>
  );
}
