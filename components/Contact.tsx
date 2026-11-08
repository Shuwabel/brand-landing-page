"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { brand } from "@/lib/brand";
import { useLook } from "@/lib/look-context";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const { favourite } = useLook();
  const [status, setStatus] = useState("");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".contact__line", {
          yPercent: 110,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".contact__title", start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();
    if (!email) return;

    // No backend or API keys: the request opens in the visitor's own email app.
    const lines = [`Please add me to the early access list: ${email}`];
    if (favourite) lines.push(`Favourite look: ${favourite.name}`);
    const subject = encodeURIComponent(`${brand.name}: early access request`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${brand.contactEmail}?subject=${subject}&body=${body}`;
    setStatus("Your email app should open with the request ready to send.");
    form.reset();
  };

  return (
    <section
      id="access"
      ref={root}
      className="contact"
      data-chapter="5"
      aria-labelledby="access-title"
    >
      <div className="wrap">
        <h2 id="access-title" className="contact__title">
          <span className="mask">
            <span className="contact__line" style={{ display: "block" }}>
              Be <em>early.</em>
            </span>
          </span>
        </h2>

        <div className="contact__grid">
          <p className="contact__lede">
            The first edit goes to a short list before it goes anywhere else. Leave your email and
            we will write back with details.
          </p>

          <form className="form" onSubmit={onSubmit}>
            <div>
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
              />
            </div>
            <p className="form__pick">
              {favourite ? `Your favourite look, ${favourite.name}, goes with the request.` : ""}
            </p>
            <div>
              <button type="submit" className="btn">
                Request early access
              </button>
            </div>
            <p className="form__status" role="status">
              {status}
            </p>
          </form>
        </div>

        <footer className="colophon">
          <p>
            &copy; {new Date().getFullYear()} {brand.name}. {brand.edition}.
          </p>
          <p>
            Photography:{" "}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">
              Unsplash
            </a>
            , used under its free licence.
          </p>
          {(brand.instagram || brand.tiktok) && (
            <p>
              {brand.instagram && (
                <a href={brand.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              )}
              {brand.instagram && brand.tiktok && " · "}
              {brand.tiktok && (
                <a href={brand.tiktok} target="_blank" rel="noopener noreferrer">
                  TikTok
                </a>
              )}
            </p>
          )}
        </footer>
      </div>
    </section>
  );
}
