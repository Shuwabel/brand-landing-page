"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { brand } from "@/lib/brand";
import { jumpTo } from "@/lib/scroll";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero__line", {
          yPercent: 112,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.1,
        });
        gsap.from(".hero__fade", {
          opacity: 0,
          y: 16,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.45,
        });
        gsap.fromTo(
          ".hero__img",
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero__photo",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      id="top"
      ref={root}
      className="hero"
      data-chapter="0"
      aria-labelledby="hero-title"
    >
      <div className="wrap">
        <div className="hero__grid">
          <div>
            <p className="label hero__fade" style={{ marginBottom: "var(--s5)" }}>
              {brand.name} / {brand.edition}
            </p>
            <h1 id="hero-title" className="hero__title">
              <span className="mask">
                <span className="hero__line" style={{ display: "block" }}>
                  Quietly
                </span>
              </span>
              <span className="mask">
                <span className="hero__line" style={{ display: "block" }}>
                  <em>very</em> good.
                </span>
              </span>
            </h1>
            <div className="hero__meta">
              <p className="hero__lede hero__fade">
                Menswear from honest cloth and clean cuts. The first edit opens soon.
              </p>
              <a
                className="btn hero__fade"
                href="#access"
                onClick={(e) => {
                  e.preventDefault();
                  jumpTo("access");
                }}
              >
                Request early access
              </a>
            </div>
          </div>

          <figure style={{ margin: 0 }} className="hero__fade">
            <div className="hero__photo">
              <Image
                className="hero__img"
                src="/photos/cover.jpg"
                alt="Two men standing in a dry field under a clear blue sky, one in a ribbed knit tee and tan trousers, the other in a black shirt"
                fill
                priority
                sizes="(min-width: 900px) 40vw, 100vw"
                style={{ transform: "scale(1.14)" }}
              />
            </div>
            <figcaption className="caption">
              On the cover: ribbed cotton tee, pleated wool trouser.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
