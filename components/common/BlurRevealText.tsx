"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type BlurRevealTextProps = {
  children: React.ReactNode;
};

import { useGSAP } from "@gsap/react";

export default function BlurRevealText({ children }: BlurRevealTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    const split = new SplitText(textRef.current, { type: "chars" });
    const char = split.chars;

    gsap.fromTo(
      char,
      {
        opacity: 0,
        filter: "blur(10px)",
        y: 20,
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        stagger: 0.06,
        duration: 0.6,
        ease: "power3.out",
      }
    );
  }, { scope: textRef });

  return (
    <div ref={textRef} className="overflow-hidden" role="group">
      {children}
    </div>
  );
}
