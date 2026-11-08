"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brand } from "@/lib/brand";
import { chapters } from "@/lib/content";
import { jumpTo } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

const CTA_LABEL = "Request early access";

/** The margin folio: wordmark, the chapter you are in, and the one action. */
export default function Folio() {
  const [chapter, setChapter] = useState(0);
  const [night, setNight] = useState(false);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    document.querySelectorAll<HTMLElement>("[data-chapter]").forEach((el) => {
      const index = Number(el.dataset.chapter);
      const isNight = el.dataset.ground === "night";
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => {
            if (self.isActive) {
              setChapter(index);
              setNight(isNight);
            }
          },
        }),
      );
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  const go = (e: React.MouseEvent) => {
    e.preventDefault();
    jumpTo("access");
  };

  return (
    <>
      <header className="folio folio--bar">
        <a className="folio__mark" href="#top" aria-label={`${brand.name}, back to top`}>
          <Image src="/logo.svg" alt="" width={28} height={28} />
          <span>{brand.name}</span>
        </a>
        <a className="folio__cta" href="#access" onClick={go}>
          {CTA_LABEL}
        </a>
      </header>

      <aside className={`folio folio--side${night ? " is-night" : ""}`} aria-label="Page chapters">
        <a href="#top" aria-label={`${brand.name}, back to top`}>
          <Image src="/logo.svg" alt="" width={32} height={32} />
        </a>
        <p className="folio__vertical" aria-live="polite">
          {String(chapter + 1).padStart(2, "0")} {chapters[chapter]}
        </p>
        <a className="folio__vertical" href="#access" onClick={go}>
          {CTA_LABEL}
        </a>
      </aside>
    </>
  );
}
