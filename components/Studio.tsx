"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { frames } from "@/lib/content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** A collection walked sideways. Desktop pins and travels; phones swipe a native rail. */
export default function Studio() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const rail = root.current?.querySelector<HTMLElement>(".rail");
        const track = root.current?.querySelector<HTMLElement>(".rail__track");
        if (!rail || !track) return;
        rail.classList.add("is-pinned");
        rail.scrollLeft = 0;

        const distance = () => Math.max(0, track.scrollWidth - rail.clientWidth);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: rail,
            start: "center center",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        return () => rail.classList.remove("is-pinned");
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="studio" data-chapter="3" aria-labelledby="studio-title">
      <div className="wrap">
        <div className="studio__head">
          <h2 id="studio-title" className="studio__title">
            Worn in the street, hung in the studio.
          </h2>
          <p className="caption" style={{ marginTop: 0 }}>
            Every piece carries the same label: name, fabric, fit.
          </p>
        </div>
      </div>

      <div className="rail" tabIndex={0} role="group" aria-label="Collection, scroll sideways">
        <div className="rail__track">
          {frames.map((f) => (
            <figure className="rail__item" key={f.image} style={{ margin: 0 }}>
              <div className="frame">
                <Image src={f.image} alt={f.alt} fill sizes="(min-width: 900px) 26vw, 78vw" />
              </div>
              <figcaption>
                <ul className="label-schema">
                  <li>{f.name}</li>
                  <li>{f.fabric}</li>
                  <li>{f.fit}</li>
                </ul>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
