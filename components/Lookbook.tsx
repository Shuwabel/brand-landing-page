"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { looks } from "@/lib/content";
import { useLook } from "@/lib/look-context";
import { scrollToY } from "@/lib/scroll";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * The peak. The section pins and the scroll turns the pages of the lookbook.
 * Signature move: whichever look you stop on regrades the rest of the page
 * and rides along into your early-access request.
 */
export default function Lookbook() {
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [spot, setSpot] = useState<number | null>(null);
  const { setFavourite } = useLook();
  const visited = useRef(false);

  const select = (next: number) => {
    setActive((current) => {
      if (current !== next) setPrevious(current);
      return next;
    });
    setSpot(null);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = root.current;
        if (!el) return;
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * looks.length * 0.85)}`,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            visited.current = true;
            const next = Math.min(looks.length - 1, Math.floor(self.progress * looks.length));
            select(next);
          },
        });
        trigger.current = st;
        return () => {
          st.kill();
          trigger.current = null;
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const look = looks[active];

  // Share the active look with the rest of the page (accent + early-access request).
  useEffect(() => {
    if (!visited.current) return;
    setFavourite(look.id);
    document.documentElement.style.setProperty("--live", look.accent);
  }, [look, setFavourite]);

  const pick = (index: number) => {
    visited.current = true;
    const st = trigger.current;
    if (st) {
      const span = st.end - st.start;
      scrollToY(st.start + ((index + 0.5) / looks.length) * span);
    } else {
      select(index);
    }
  };

  return (
    <section
      ref={root}
      className="looks night"
      data-chapter="4"
      data-ground="night"
      aria-labelledby="looks-title"
      style={{ ["--lk-accent" as string]: look.accent }}
    >
      {looks.map((l, i) => (
        <div
          key={l.id}
          className={`looks__bg${i === active ? " is-active" : ""}`}
          style={{ background: l.ground }}
          aria-hidden="true"
        />
      ))}

      <div className="wrap" style={{ width: "100%" }}>
        <div className="looks__grid">
          <div>
            <h2 id="looks-title" className="looks__title">
              Pick a look.
            </h2>
            <ul className="looks__index">
              {looks.map((l, i) => (
                <li key={l.id}>
                  <button
                    type="button"
                    className="looks__pick"
                    aria-pressed={i === active}
                    onClick={() => pick(i)}
                    style={{ ["--dot" as string]: l.accent }}
                  >
                    <span className="dot" aria-hidden="true" />
                    {l.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="looks__stage">
            {looks.map((l, i) => (
              <div
                key={l.id}
                className={`looks__photo${i === active ? " is-active" : i === previous ? " was-active" : ""}`}
              >
                <Image
                  src={l.image}
                  alt={l.alt}
                  fill
                  loading="eager"
                  sizes="(min-width: 900px) 520px, 90vw"
                  style={{ objectPosition: l.position }}
                />
              </div>
            ))}
            {look.spots.map((s, i) => (
              <button
                key={`${look.id}-${i}`}
                type="button"
                className="spot"
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
                aria-expanded={spot === i}
                aria-label={`${s.name}: show details`}
                onClick={() => setSpot(spot === i ? null : i)}
              />
            ))}
          </div>

          <div className="looks__note" aria-live="polite">
            <h3 className="looks__name">{look.name}</h3>
            <p className="looks__fabric">{look.fabric}</p>
            {spot !== null && look.spots[spot] ? (
              <p className="looks__spot">
                <strong>{look.spots[spot].name}</strong>
                {look.spots[spot].note}
              </p>
            ) : (
              <p className="looks__spot">
                <strong>Details</strong>
                Tap a dot on the photo to see the piece.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
