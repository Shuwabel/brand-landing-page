"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const WORDS =
  "Fewer pieces. Better cloth. Cuts that let the person wearing them do the talking.".split(" ");

/** A full stop between chapters: the sentence lights up word by word as you scroll. */
export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = root.current;
        if (!el) return;
        el.classList.add("is-scrolly");
        gsap.fromTo(
          ".manifesto__text span",
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.12,
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          },
        );
        ScrollTrigger.refresh();
        return () => el.classList.remove("is-scrolly");
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="manifesto night"
      data-chapter="1"
      data-ground="night"
      aria-label="Manifesto"
    >
      <div className="manifesto__stage">
        <div className="wrap">
          <p className="manifesto__text">
            {WORDS.map((word, i) => (
              <span key={i}>{word}</span>
            ))}
          </p>
          <p className="manifesto__by label">Okay Brand makes the basics worth keeping.</p>
        </div>
      </div>
    </section>
  );
}
