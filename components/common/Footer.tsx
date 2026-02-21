"use client";
import React, { useEffect, useRef, useState } from "react";
import { footerLinks } from "@/components/utils/constants/index";
import Link from "next/link";
import {
  PiInstagramLogoBold,
  PiTiktokLogoBold,
} from "react-icons/pi";

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    if (!footerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setFooterHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(footerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <>
      {/* Invisible spacer to allow scrolling down enough to reveal the footer */}
      <div style={{ height: footerHeight }} className="w-full" />

      {/* The actual footer that stays fixed at the bottom behind the content */}
      <section
        ref={footerRef}
        id="contact"
        className="w-full text-black flex flex-col font-sans p-8 gap-8 justify-between fixed bottom-0 left-0 -z-10 bg-background border-t border-neutral-100"
      >
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 pt-8">
          {/* Links */}
          <div className="flex flex-col gap-4">
            {footerLinks.map((footer, id) => (
              <div key={id} className="space-y-3">
                <h2 className="text-lg clash font-bold tracking-wider uppercase">
                  {footer.heading}
                </h2>
                <ul className="space-y-2 text-neutral-800 text-sm clash">
                  {footer.link.map((link, index) => (
                    <li
                      key={index}
                      className="transition-colors duration-300"
                    >
                      {link.name === "Contact Us" ? (
                        <div className="flex items-center gap-3">
                          <span className="text-neutral-800">Contact us on</span>
                          <div className="flex gap-3 text-lg">
                            <a
                              href="https://instagram.com/ancientika"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Visit our Instagram"
                              className="hover:text-accent transition-colors duration-300"
                            >
                              <PiInstagramLogoBold />
                            </a>
                            <a
                              href="https://tiktok.com/@ancientika"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Visit our TikTok"
                              className="hover:text-accent transition-colors duration-300"
                            >
                              <PiTiktokLogoBold />
                            </a>
                          </div>
                        </div>
                      ) : (
                        <Link href={link.href} className="hover:text-accent transition-colors duration-300 cursor-pointer">
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* About Blurb */}
          <div className="max-w-md">
            <h2 className="uppercase tracking-wider clash font-bold mb-3">
              About
            </h2>
            <p className="text-sm text-neutral-700 clash leading-relaxed">
              Where contemporary minimalism meets modern elegance. Designed with
              intention, built to last beyond seasons.
            </p>
          </div>
        </div>

        <div className="w-full flex items-center justify-end max-sm:justify-center">
          <p className="text-[10px] text-neutral-500 clash tracking-widest uppercase">
            &copy; {new Date().getFullYear()} <span className="porsha text-xs normal-case tracking-normal text-neutral-700">ancientika</span>. All rights reserved.
          </p>
        </div>

        {/* Logo */}
        <div className="w-full text-center flex items-center justify-center overflow-hidden py-4">
          <h1 className="text-[25vw] max-sm:text-[20vw] leading-[0.8] porsha select-none opacity-[0.03] pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            ancientika
          </h1>
          <h1 className="text-[150px] max-sm:text-[60px] leading-tight porsha relative z-10">
            ancientika
          </h1>
        </div>
      </section>
    </>
  );
};

export default Footer;
