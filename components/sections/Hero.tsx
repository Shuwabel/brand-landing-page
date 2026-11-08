"use client";
import { brand } from "@/lib/brand";
import React, { useRef, useState } from "react";
import Image from "next/image";
import BlurRevealText from "../common/BlurRevealText";
import { motion } from "framer-motion";

const Hero = () => {
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    if (!email) return;

    // No backend or API keys: open the visitor's email app addressed to the brand inbox.
    const subject = encodeURIComponent("Early access request");
    const body = encodeURIComponent(`Please add me to the early access list: ${email}`);
    window.location.href = `mailto:${brand.contactEmail}?subject=${subject}&body=${body}`;
    setMessage("Opening your email app to send your request.");
    e.currentTarget.reset();
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden text-black">
      <div className="flex items-stretch w-full min-h-screen max-sm:flex-col">
        {/* Image Side */}
        <div className="w-1/2 max-sm:w-full max-sm:h-[70vh] relative overflow-hidden">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <Image
              src="/img3.jpg"
              alt={`${brand.name} editorial`}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              priority
              loading="eager"
              className="object-top object-cover"
            />
          </motion.div>
          {/* Gradient overlay on mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60 sm:hidden" />
        </div>

        {/* Content Side */}
        <div className="w-1/2 max-sm:w-full flex items-center justify-center p-12 max-sm:p-8 bg-primary flex-col relative gap-6">
          {/* Tagline */}
          <div className="text-center">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="block text-lg clash tracking-wider text-foreground/60 mb-2"
            >
              your presence
            </motion.span>

            <BlurRevealText>
              <span className="block porsha font-black text-[20vw] sm:text-[10vw] lg:text-[7vw] xl:text-8xl uppercase cursor-default leading-none">
                refined.
              </span>
            </BlurRevealText>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            className="max-w-sm clash text-sm text-center text-foreground/70 leading-relaxed"
          >
            Contemporary minimal wear designed with intention. Pieces that move
            with you, reflect your rhythm, and embody quiet confidence.
          </motion.p>

          {/* Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.9 }}
            className="flex flex-col w-72 max-sm:w-full gap-5 clash"
          >
            <input
              type="email"
              name="email"
              required
              aria-label="Email Address"
              autoComplete="email"
              placeholder="Enter your email"
              className="border-b border-foreground/20 bg-transparent outline-none px-1 py-2 text-sm placeholder:text-foreground/30 focus:border-accent transition-colors duration-300"
            />
            <div className="w-full flex items-center justify-center flex-col gap-3">
              <button
                type="submit"
                className={`w-full bg-secondary text-white text-sm py-3 tracking-wider uppercase transition-all duration-300 ease-out hover:bg-accent cursor-pointer hover:tracking-widest`}
              >
                Request Early Access
              </button>
              {message && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-accent"
                >
                  {message}
                </motion.p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
