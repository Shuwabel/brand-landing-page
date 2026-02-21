"use client";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";

const CTA = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    if (!email) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        form.reset();
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="w-full py-24 max-sm:py-16 bg-background relative z-10 flex items-center justify-center flex-col text-center gap-8 px-6 min-h-[50vh]"
    >
      <motion.p
        className="uppercase text-xs clash font-bold text-accent tracking-[4px]"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Be the First
      </motion.p>

      <motion.h2
        className="porsha font-bold text-5xl max-sm:text-4xl"
        initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Join the Waitlist
      </motion.h2>

      <motion.p
        className="clash text-sm text-foreground/60 max-w-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Be among the first to access our debut collection. Sign up for
        exclusive early access and updates.
      </motion.p>

      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="flex flex-col w-72 max-sm:w-full gap-4 clash"
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
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-secondary text-white text-sm py-3 tracking-wider uppercase transition-all duration-300 ease-out hover:bg-accent ${loading
            ? "opacity-60 cursor-not-allowed"
            : "cursor-pointer hover:tracking-widest"
            }`}
        >
          {loading ? "Joining..." : "Join Now"}
        </button>
        {message && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-accent mt-1"
          >
            {message}
          </motion.p>
        )}
      </motion.form>

    </section>
  );
};

export default CTA;
