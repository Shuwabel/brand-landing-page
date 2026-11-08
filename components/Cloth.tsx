"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Cloth() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".js-wipe").forEach((frame) => {
          gsap.fromTo(
            frame,
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 1.3,
              ease: "power4.out",
              scrollTrigger: { trigger: frame, start: "top 82%", once: true },
            },
          );
          gsap.fromTo(
            frame.querySelector("img"),
            { scale: 1.18 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
        gsap.utils.toArray<HTMLElement>(".js-rise").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 28,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
        gsap.to(".js-drift", {
          yPercent: -14,
          ease: "none",
          scrollTrigger: { trigger: ".js-drift", start: "top bottom", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="cloth" data-chapter="2" aria-labelledby="cloth-title">
      <div className="wrap">
        <div className="cloth__grid">
          <figure className="cloth__main" style={{ margin: 0 }}>
            <div className="frame frame--tall js-wipe">
              <Image
                src="/photos/linen.jpg"
                alt="A cream linen jacket on a wooden hanger, lit by hard sunlight against a dark background"
                fill
                sizes="(min-width: 900px) 40vw, 100vw"
              />
            </div>
            <figcaption className="caption">Unlined linen jacket, washed twice before cutting.</figcaption>
          </figure>

          <div className="cloth__copy">
            <h2 id="cloth-title" className="cloth__title js-rise">
              Start with the cloth.
            </h2>
            <p className="js-rise">
              <span className="runin">Linen.</span>
              Washed before it is cut, so the first wear already feels like the tenth.
            </p>
            <p className="js-rise">
              <span className="runin">Cotton.</span>
              Dense jersey and ribbed knit with a weight you can feel through the hand.
            </p>
            <p className="js-rise">
              <span className="runin">Wool.</span>
              Light tailoring for the months that cannot decide what they are.
            </p>

            <figure className="cloth__inset js-drift" style={{ marginBottom: 0 }}>
              <div className="frame frame--tall js-wipe">
                <Image
                  src="/photos/racks.jpg"
                  alt="Two clothing rails in a bright room holding neutral knits, an orange coat and cream trousers"
                  fill
                  sizes="(min-width: 900px) 24vw, 60vw"
                />
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
