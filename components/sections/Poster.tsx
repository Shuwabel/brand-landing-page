"use client";
import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const Poster = () => {
  const wrapperRef = useRef(null);

  const images = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img5.jpg",
    "/img6.jpg",
    "/img7.jpg",
    "/img8.jpg",
    "/img9.jpg",
    "/img10.jpg",
    "/img11.jpg",
    "/img14.jpg",
    "/img15.jpg",
  ];

  useGSAP(
    () => {
      const imgs = gsap.utils.toArray<HTMLDivElement>(".fly-image");

      // Initial cleanup/set on client-side to prevent hydration mismatch
      gsap.set(imgs, {
        yPercent: 0,
        y: "20vh", // Start slightly below
        opacity: 0,
        scale: 0.9,
      });

      gsap.to(imgs, {
        y: () => gsap.utils.random(-85, -105) + "vh", // Target the top of the viewport
        xPercent: () => gsap.utils.random(-100, 100),
        scale: () => gsap.utils.random(0.8, 1.25),
        opacity: 1,
        zIndex: () => Math.floor(gsap.utils.random(1, 20)),
        rotation: () => gsap.utils.random(-20, 20),
        ease: "power2.out",
        stagger: {
          each: 0.04,
          from: "random",
        },
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=1800",
          scrub: 1,
          pin: true,
        },
      });
    },
    { scope: wrapperRef }
  );

  return (
    <section className="relative overflow-hidden">
      <div
        ref={wrapperRef}
        className="wrapper h-screen w-full flex flex-col items-center bg-secondary text-white gap-6 text-center py-16 justify-center relative"
      >
        <motion.p
          className="uppercase text-xs clash font-bold text-accent tracking-[4px] z-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Gallery
        </motion.p>
        <motion.h2
          className="porsha text-4xl max-sm:text-2xl cursor-default z-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          ancientika
        </motion.h2>

        <div className="absolute top-20 right-0 p-12 text-black text-right flex flex-col items-end gap-1">
          <div className="relative w-24 h-24 max-sm:w-16 max-sm:h-16">
            <Image
              src="/ANCIENTIKA%20MAIN%20LOGO.png"
              alt="ancientika"
              fill
              className="object-contain"
            />
          </div>
          <p className="clash text-xs uppercase tracking-[0.2em] opacity-50">
            Edition 01
          </p>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {images.map((src, i) => (
            <div
              key={i}
              className="fly-image absolute w-52 h-72 max-sm:w-36 max-sm:h-48"
              style={{
                left: `${(i * 12 + 5) % 85}%`,
                top: "100%",
              }}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover shadow-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Poster;
