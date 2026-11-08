"use client";
import { brand } from "@/lib/brand";
import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    phase: "Phase 1",
    title: "The Sourcing",
    desc: "Premium fabrics sourced from trusted mills — cotton, linen, and blends chosen for their feel and longevity.",
    side: "left",
  },
  {
    phase: "Phase 2",
    title: "The Pattern",
    desc: "Hand-drafted silhouettes that honor the body's natural form and movement.",
    side: "right",
  },
  {
    phase: "Phase 3",
    title: "The Construction",
    desc: "Precision tailoring with meticulous stitching for clean lines and lasting durability.",
    side: "left",
  },
  {
    phase: "Phase 4",
    title: "The Finishing",
    desc: "Every piece is carefully finished with attention to detail — from seams to labels, nothing is overlooked.",
    side: "right",
  },
];

const Origin = () => {
  const timeline = useRef(null);
  const bgRef = useRef(null);

  useGSAP(
    () => {
      // Parallax effect for background
      gsap.to(bgRef.current, {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: timeline.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      const items = gsap.utils.toArray<HTMLElement>(".timeline-item");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: timeline.current,
          start: "top center",
          end: "bottom center",
          scrub: 0.6,
        },
      });

      tl.to(".timeline-line", {
        height: "100%",
        ease: "power1.inOut",
      });

      items.forEach((item) => {
        const dot = item.querySelector<HTMLElement>(".dot");
        const content = item.querySelector<HTMLElement>(".content");

        if (!dot || !content) return;

        tl.to(dot, { scale: 1, duration: 0.2 }).to(content, {
          opacity: 1,
          y: 0,
          duration: 0.3,
        });
      });
    },
    { scope: timeline }
  );

  return (
    <section className="relative w-full min-h-[150vh] max-sm:min-h-fit bg-secondary flex items-center flex-col justify-start gap-16 text-white py-20 px-8 cursor-default overflow-hidden">
      {/* Background Parallax Image */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div ref={bgRef} className="relative w-full h-[120%] -top-[10%]">
          <Image
            src="/img4.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full max-w-4xl h-[500px] max-sm:h-64 relative overflow-hidden rounded-sm shadow-2xl z-10"
      >
        <Image
          src="/img4.jpg"
          alt={`${brand.name} craft`}
          className="object-cover object-top hover:scale-105 transition-transform duration-1000"
          fill
          sizes="(max-width: 1024px) 100vw, 896px"
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Title */}
      <div className="flex flex-col items-center justify-center gap-3 text-center max-sm:items-start max-sm:text-left z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="uppercase text-xs clash font-bold text-accent tracking-[4px]"
        >
          The Craft
        </motion.p>
        <motion.h2
          className="text-6xl max-sm:text-4xl porsha"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          The Origin Scroll
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="clash text-base text-white/70 max-w-lg"
        >
          A garment is a story of hands and history.{" "}
          <span className="block mt-2 font-light italic">
            Witness the evolution of an Okay Brand piece.
          </span>
        </motion.p>
      </div>

      {/* Timeline */}
      <section
        className="relative mx-auto max-w-5xl w-full px-6 py-20"
        ref={timeline}
      >
        {/* Center line bg */}
        <div className="absolute left-1/2 max-sm:left-4 top-0 h-full w-px -translate-x-1/2 bg-white/10 origin-top" />
        <div className="timeline-line absolute left-1/2 max-sm:left-4 top-0 h-0 w-px -translate-x-1/2 bg-accent origin-top" />

        {phases.map((phase, i) => (
          <div
            key={i}
            className="timeline-item relative mb-28 max-sm:mb-20 grid grid-cols-2 max-sm:grid-cols-1 items-start"
          >
            {phase.side === "left" ? (
              <>
                <div className="content opacity-0 translate-y-6 pr-16 max-sm:pl-10 text-right max-sm:text-left">
                  <p className="clash text-accent font-bold text-xs tracking-widest uppercase">
                    {phase.phase}
                  </p>
                  <h3 className="text-xl font-bold fontmelo mt-1">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-white/50 clash mt-2 max-w-xs ml-auto max-sm:ml-0">
                    {phase.desc}
                  </p>
                </div>
                <div className="relative max-sm:hidden">
                  <span className="dot absolute left-0 top-4 h-3 w-3 -translate-x-1/2 scale-0 rounded-full bg-accent" />
                </div>
              </>
            ) : (
              <>
                <div className="relative max-sm:hidden">
                  <span className="dot absolute right-0 top-4 h-3 w-3 translate-x-1/2 scale-0 rounded-full bg-accent" />
                </div>
                <div className="content opacity-0 translate-y-6 pl-16 max-sm:pl-10">
                  <p className="clash text-accent font-bold text-xs tracking-widest uppercase">
                    {phase.phase}
                  </p>
                  <h3 className="text-xl font-bold fontmelo mt-1">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-white/50 clash mt-2 max-w-xs">
                    {phase.desc}
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </section>
    </section>
  );
};

export default Origin;
